// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol"; // tbd

contract OrganicWasteGems is ERC20, Ownable {
    constructor() ERC20("OrganicWasteGems", "OWG") Ownable(msg.sender) {}

    // constants

    uint256 public constant TOKENS_PER_10KG = 1 * 10 ** 9; // 1 OWG per 10kg
    uint256 public constant CO2_PER_KG = 400; //grams of CO2e per kg

    // state variables
    uint256 public totalFarmers;
    uint256 public globalWasteKg;
    uint256 public globalCO2Saved; //grams
    uint256 public totalCarbonCreditsSold; //tons
    uint256 public minPricePerTon = 1000; // Minimum KES per ton
    uint256 public minPaymentPerTon = 0.0001 ether;


    // special types

    struct FarmerData {
        bool isRegistered;
        uint256 totalWasteKg;
        uint256 totalCO2Saved;
        uint256 totalProductKg;
        uint256 totalWorkersPaid;
        uint256 totalPayoutKES;
    }

    struct WasteCollection {
        uint256 kgCollected;
        uint256 timestamp;
        uint256 workersInvolved;
        uint256 workersPaymentKES;
        string wasteType;
    }

    struct WorkerPayment {
        address worker; // address can be zero if cash payment
        uint256 amountKES;
        uint256 timestamp;
    }

    // mapping
    // Farmer tracking
    mapping(address => FarmerData) public farmers;
    mapping(address => WasteCollection[]) public wasteHistory;
    mapping(address => WorkerPayment[]) public workerPayments;

    //carbon credit tracking
    mapping(address => uint256) public carbonCreditsEarned;
    mapping(address => uint256) public carbonCreditsClaimed;
    mapping(address => bool) public verifiedFarmers;

    //corporate buyer tracking
    mapping(address => uint256) public corporateCreditsPurchased;

    //events
    event FarmerRegistered(
        address indexed farmer,
        address worker,
        uint256 amountKES,
        uint256 timestamp
    );
    event WasteProcessed(
        address indexed farmer,
        uint256 kg,
        uint256 tokensMinted,
        uint256 CO2Saved,
        uint256 workersInvolved,
        uint256 workerPayment,
        uint256 timestamp
    );
    event WorkerPaid(
        address indexed farmer,
        address worker,
        uint256 amountKES,
        uint256 timestamp
    );
    event ProductClaimed(
        address indexed farmer,
        uint256 productKg,
        uint256 tokensminted,
        uint256 timestamp
    );
    event CarbonCreditIssued(
        address indexed farmer,
        uint256 co2Grams,
        uint256 timestamp
    );
    event CarbonCreditSold(
        address indexed farmer,
        address indexed buyer,
        uint256 tonsVo2,
        uint256 priceKES,
        uint256 timestamp
    );
    event FarmerVerified(address indexed farmer, uint256 timestamp);

    function decimals() public view virtual override returns (uint8) {
        return 9;
    }

    //farmer functions
    function register() external {
        require(!farmers[msg.sender].isRegistered, "Already registered");
        farmers[msg.sender].isRegistered = true;
        totalFarmers++;
    }

    //set minimum price per ton
    function setMinPricePerTon(uint256 _minPrice) external onlyOwner {
        minPricePerTon = _minPrice;
    }

    function verifyFarmer(address _farmer) external onlyOwner {
        require(farmers[_farmer].isRegistered, "Farmer not registered");
        verifiedFarmers[_farmer] = true;
        emit FarmerVerified(_farmer, block.timestamp);
    }

    function revokeVerification(address _farmer) external onlyOwner {
        verifiedFarmers[_farmer] = false;
    }

    //farm processing
    function processWaste(
        uint256 collectedWasteKg,
        string calldata _wasteType,
        uint256 _workersInvolved,
        uint256 _workersPaymentKES
    ) external {
        require(farmers[msg.sender].isRegistered, "Not registered");
        require(collectedWasteKg >= 10, "Minimum 10kg");

        //rewards
        uint256 tokens = (collectedWasteKg / 10) * TOKENS_PER_10KG;
        uint256 co2 = collectedWasteKg * CO2_PER_KG;

        //updating farmer stats
        farmers[msg.sender].totalWasteKg += collectedWasteKg;
        farmers[msg.sender].totalWorkersPaid += _workersInvolved;
        farmers[msg.sender].totalPayoutKES += _workersPaymentKES;
        farmers[msg.sender].totalCO2Saved += co2;

        // tracking carbon credits (the ones available for sale)
        carbonCreditsEarned[msg.sender] += co2;

        //updating global stats
        globalWasteKg += collectedWasteKg;
        globalCO2Saved += co2;

        // storing collection record
        wasteHistory[msg.sender].push(
            WasteCollection({
                kgCollected: collectedWasteKg,
                timestamp: block.timestamp,
                workersInvolved: _workersInvolved,
                workersPaymentKES: _workersPaymentKES,
                wasteType: _wasteType
            })
        );

        //Mint Tokens
        _mint(msg.sender, tokens);

        emit WasteProcessed(
            msg.sender,
            collectedWasteKg,
            tokens,
            co2,
            _workersInvolved,
            _workersPaymentKES,
            block.timestamp
        );
        emit CarbonCreditIssued(msg.sender, co2, block.timestamp);
    }

    function claimProductTokens(uint256 _productKg) external {
        require(_productKg > 0, "Amount must be greater than zero");

        uint256 tokens = (_productKg / 10) * TOKENS_PER_10KG;
        farmers[msg.sender].totalProductKg += _productKg;
        _mint(msg.sender, tokens);

        emit ProductClaimed(msg.sender, _productKg, tokens, block.timestamp);
    }

    //future to add mpesa intergration for easier payment strategy for local farmmers 

    function buyCarbonCredits(
        address _farmer,
        uint256 _tonsCO2,
        uint256 _priceKES
    ) external payable {
        require(_tonsCO2 > 0, "Must purchase at least some credits");
        require(_priceKES >= minPricePerTon, "Price below minimum");
        require(farmers[_farmer].isRegistered, "Farmer not registered");
        
        uint256 co2Grams = _tonsCO2 * 1000000;
        uint256 availableCredits = carbonCreditsEarned[_farmer] -
            carbonCreditsClaimed[_farmer];

        require(
            availableCredits >= co2Grams,
            "Insufficient carbon credits available"
        );
        
        // Calculate minimum payment required
        uint256 minPayment = _tonsCO2 * minPaymentPerTon;
        require(msg.value >= minPayment, "Insufficient payment");

        // Mark credits as sold
        carbonCreditsClaimed[_farmer] += co2Grams;
        corporateCreditsPurchased[msg.sender] += _tonsCO2;
        totalCarbonCreditsSold += _tonsCO2;

        // Transfer payment to farmer
        (bool success, ) = payable(_farmer).call{value: msg.value}("");
        require(success, "Payment transfer failed");

        emit CarbonCreditSold(
            _farmer,
            msg.sender,
            _tonsCO2,
            _priceKES,
            block.timestamp
        );
    }

    function getAvailableCarbonCredits(
        address _farmer
    )
        external
        view
        returns (
            uint256 availableTons,
            uint256 totalEarnedTons,
            uint256 soldTons
        )
    {
        uint256 earnedGrams = carbonCreditsEarned[_farmer]; // total carbon credits issued (grams)
        uint256 claimedGrams = carbonCreditsClaimed[_farmer]; // carbon credits already sold (grams)

        // Convert grams → tons (1 ton = 1,000,000 grams)
        availableTons = (earnedGrams - claimedGrams) / 1_000_000;
        totalEarnedTons = earnedGrams / 1_000_000;
        soldTons = claimedGrams / 1_000_000;
    }

    //view functions

    function getImpact(
        address farmer
    )
        external
        view
        returns (
            uint256 wasteKg,
            uint256 productKg,
            uint256 co2Grams,
            uint256 co2Kg,
            uint256 tokens,
            uint256 workersPaid,
            uint256 totalPayoutKES // Added
        )
    {
        FarmerData memory data = farmers[farmer];
        return (
            data.totalWasteKg,
            data.totalProductKg,
            data.totalCO2Saved,
            data.totalCO2Saved / 1000,
            balanceOf(farmer),
            data.totalWorkersPaid,
            data.totalPayoutKES
        );
    }

    function getGlobalStats()
        external
        view
        returns (
            uint256 farmersCount,
            uint wasteKg,
            uint256 co2SavedKg,
            uint256 tokensCirculating,
            uint256 carbonCreditsSoldTons
        )
    {
        return (
            totalFarmers,
            globalWasteKg,
            globalCO2Saved / 1000,
            totalSupply() - balanceOf(owner()),
            totalCarbonCreditsSold
        );
    }

    

    function getWasteHistory(
        address farmer
    ) external view returns (WasteCollection[] memory) {
        return wasteHistory[farmer];
    }

    function getWorkerPayments(
        address farmer
    ) external view returns (WorkerPayment[] memory) {
        return workerPayments[farmer];
    }

    function getCorporatePurchases(address _buyer) 
        external 
        view 
        returns (uint256) 
    {
        return corporateCreditsPurchased[_buyer];
    }

    
}

