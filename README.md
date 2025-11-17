# 🌱 Organic Waste Gems (OWG) - Waste-to-Earn Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black.svg)
![Polkadot](https://img.shields.io/badge/Polkadot-Moonbeam-E6007A.svg)

> **Hackathon Theme:** User-centric Apps - Real-world impact through decentralized technology

A blockchain-based incentivization platform that transforms organic waste management into a profitable, transparent, and environmentally sustainable operation. Farmers earn tokenized rewards (OWG tokens) and tradeable carbon credits for processing organic waste, creating a circular economy that benefits both the environment and local communities.

## 📋 Table of Contents

- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Smart Contract Architecture](#smart-contract-architecture)
- [Setup Instructions](#setup-instructions)
- [Usage Guide](#usage-guide)
- [Carbon Credits Marketplace](#carbon-credits-marketplace)
- [Economic Model](#economic-model)
- [Deployed Contracts](#deployed-contracts)
- [Demo](#demo)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Organic Waste Gems (OWG) is a decentralized application built on the Polkadot ecosystem (Moonbeam/Moonbase Alpha) that incentivizes organic waste processing through blockchain technology. The platform creates a transparent, verifiable system where farmers earn cryptocurrency tokens and carbon credits for processing organic waste, while corporations can purchase these carbon credits to offset their emissions.

### Why Polkadot Asset Hub and Moonbeam(MoonbaseAlpha)?

- **EVM Compatibility**: Leverage existing Solidity smart contracts while benefiting from Polkadot's scalability
- **Low Transaction Costs**: Affordable on-chain operations for farmers in developing regions
- **Interoperability**: Future cross-chain capabilities for multi-network carbon credit trading
- **Decentralization**: True Web3 principles with user sovereignty over data and assets

---

## 🚨 Problem Statement

### Global Challenges:
1. **Waste Management Crisis**: Over 2 billion tons of organic waste generated annually, with 33% improperly managed
2. **Environmental Impact**: Organic waste in landfills produces methane (25x more potent than CO₂)
3. **Lack of Incentives**: Farmers and waste processors have no economic motivation for proper waste management
4. **Carbon Credit Opacity**: Existing carbon credit systems are opaque, centralized, and inaccessible to small-scale farmers
5. **Verification Issues**: No transparent way to verify waste processing and CO₂ savings

### Local Context (Kenya/Africa):
- Limited waste management infrastructure
- High agricultural waste (coffee husks, tea waste, crop residues)
- Need for additional farmer income streams
- Growing corporate demand for carbon offsetting

---

## 💡 Solution

OWG creates a **blockchain-verified, transparent waste-to-value ecosystem** where:

1. **Farmers register** on the platform and process organic waste
2. **Smart contracts automatically mint** OWG tokens based on waste processed (1 OWG per 10kg)
3. **Carbon credits are generated** based on CO₂ saved (400g CO₂ per kg waste)
4. **Corporations purchase** verified carbon credits directly from farmers
5. **All transactions** are recorded immutably on-chain for transparency

### Real-World Impact:
- ✅ **Environmental**: Reduces methane emissions and landfill waste
- ✅ **Economic**: Creates new income streams for farmers
- ✅ **Social**: Generates employment opportunities (worker tracking included)
- ✅ **Transparency**: Blockchain verification ensures authenticity
- ✅ **Scalability**: Can expand across multiple agricultural communities

---

## ✨ Key Features

### For Farmers:
- 🌾 **Token Rewards**: Earn 1 OWG token per 10kg of waste processed
- 💰 **Carbon Credits**: Generate tradeable carbon credits (1 ton = 1,000,000g CO₂)
- 📊 **Impact Dashboard**: Real-time tracking of environmental impact
- 👥 **Worker Management**: Record and verify worker payments on-chain
- 🏆 **Product Claims**: Additional tokens for producing compost/fertilizer
- 📜 **Transaction History**: Complete audit trail of all activities

### For Corporations:
- 🌍 **Carbon Offsetting**: Purchase verified carbon credits directly from farmers
- 📈 **ESG Compliance**: Meet environmental, social, and governance goals
- 🔍 **Transparency**: Blockchain-verified impact metrics
- 💚 **Direct Impact**: Support local farmers while offsetting emissions
- 📊 **Reporting**: Easy carbon accounting and audit trails

### For Platform Admins:
- 🛡️ **Farmer Verification**: Verify legitimate farmers for carbon credit sales
- 👁️ **Monitoring**: Track platform-wide statistics and metrics
- ⚙️ **Configuration**: Set minimum prices and platform parameters

---

## 🛠 Technology Stack

### Blockchain & Smart Contracts
- **Polkadot Asset Hub Testnet**:Cross-chain asset management and interoperability
- **Solidity 0.8.20**: Smart contract development
- **OpenZeppelin**: Standard ERC20 token implementation and security
- **Hardhat**: Development environment and deployment
- **Moonbeam/Moonbase Alpha**: EVM-compatible Polkadot parachain

### Frontend
- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **RainbowKit**: Wallet connection interface
- **Wagmi v2**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum library

### Web3 Integration
- **WalletConnect**: Multi-wallet support
- **MetaMask**: Primary wallet integration
- **Wagmi**: Blockchain interactions
- **MetaMask**:Primary wallet integration

### Development Tools
- **Git/GitHub**: Version control
- **VSCode**: Development environment
- **ESLint & Prettier**: Code quality

---

## 🏗 Smart Contract Architecture

### Core Contract: `OrganicWasteGems.sol`

```solidity
contract OrganicWasteGems is ERC20, Ownable {
    // Token: OWG (9 decimals)
    // 1 OWG = 10kg of waste processed
}
```

### Key Functions:

#### Farmer Functions
- `register()`: Register as a farmer on the platform
- `processWaste(kg, wasteType, workers, payment)`: Submit waste collection and mint tokens
- `claimProductTokens(productKg)`: Claim tokens for produced compost/fertilizer

#### View Functions
- `getImpact(address)`: Get farmer's complete statistics
- `getGlobalStats()`: Platform-wide metrics
- `getAvailableCarbonCredits(address)`: Check carbon credits
- `getWasteHistory(address)`: Retrieve all waste collections

#### Carbon Credit Functions
- `buyCarbonCredits(farmer, tons, price)`: Purchase carbon credits
- `getAvailableCarbonCredits(farmer)`: Check available credits

#### Admin Functions
- `verifyFarmer(address)`: Verify farmer for carbon credit sales
- `revokeVerification(address)`: Revoke farmer verification

### Token Economics
```
TOKENS_PER_10KG = 1,000,000,000 (1 OWG with 9 decimals)
CO2_PER_KG = 400 grams (0.4kg CO₂ saved per kg waste)
```

### Data Structures
```solidity
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
```

---

## 📦 Setup Instructions

### Prerequisites

```bash
# Node.js (v18 or higher)
node --version

# npm or yarn
npm --version

# Git
git --version

# MetaMask browser extension
```

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/organic-waste-gems.git
cd organic-waste-gems
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Hardhat (if deploying contracts)
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

### 3. Environment Configuration


For contract deployment, create `.env`:

```bash
# Private key (without 0x prefix)
PRIVATE_KEY=your_wallet_private_key

# API Keys
ETHERSCAN_API_KEY=your_etherscan_key
MOONSCAN_API_KEY=your_moonscan_key

# RPC URLs
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
```

### 4. Update Contract Address

Edit `lib/contracts/abi.ts`:

```typescript
export const contractAddresses = {
  moonbaseAlpha: "0xYourDeployedAddress",
  passetHub: "0xYourDeployedAddress",
}
```

### 5. Run Development Server

- On the root folder

```bash
npx hardhat run scripts/deploy.js
```
- On the frontend folder 

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🚀 Usage Guide

### For Farmers:

#### 1. **Connect Wallet**
- Click "Connect Wallet" in the sidebar
- Select MetaMask or WalletConnect
- Ensure you're on Moonbase Alpha or Polkadot Asset Hub testnet or the networks are enabled for interactions on the wallet

#### 2. **Register**
- Navigate to Dashboard
- Click "Register as Farmer"
- Confirm transaction in MetaMask
- Wait for confirmation

#### 3. **Process Waste**
- Go to "Process Waste" page
- Fill in details:
  - Amount of waste (minimum 10kg)
  - Waste type (Food, Garden, Agricultural, etc.)
  - Number of workers involved
  - Total payment to workers (KES)
- Submit and confirm transaction
- Receive OWG tokens automatically

#### 4. **Claim Product Tokens**
- After composting, go to "Mint Tokens"
- Enter kg of compost/fertilizer produced
- Submit transaction
- Receive additional OWG tokens

#### 5. **View Carbon Credits**
- Navigate to "Carbon Credits" page
- View available credits for sale
- Share wallet address with corporations

### For Corporations:

#### 1. **Purchase Carbon Credits**
- Navigate to "Carbon Credits" page
- Switch to "Corporate Buyer" view
- Enter:
  - Farmer's wallet address
  - Tons of CO₂ to purchase
  - Price per ton (KES)
- Submit and confirm transaction
- Carbon credits transferred instantly

### For Admins:

#### 1. **Verify Farmers**
- Navigate to "Admin" page (owner only)
- Check farmer registration status
- Enter farmer address to verify
- Farmer can now sell carbon credits

---

## 🌍 Carbon Credits Marketplace

### How It Works:

1. **Generation**: Farmers earn carbon credits by processing waste
   - 1kg waste = 400g CO₂ saved
   - Credits accumulated in farmer's account

2. **Verification**: Admin verifies legitimate farmers
   - Only verified farmers can sell credits
   - Ensures quality and authenticity

3. **Trading**: Corporations purchase credits directly
   - Set custom price per ton
   - Instant blockchain settlement
   - Payment goes directly to farmer

4. **Transparency**: All transactions on-chain
   - Immutable record
   - Easy auditing
   - Real impact verification

### Pricing:
- **Market Rate**: KES 8,000 - 15,000 per ton CO₂
- **Platform Minimum**: KES 1,000 per ton (configurable)
- **Payment**: 0.0001 DEV per ton (testnet) / Adjustable for mainnet

---

## 💰 Economic Model

### Token Distribution

```
Waste Processing: 1 OWG per 10kg
Product Creation: 1 OWG per 10kg compost/fertilizer
Total Supply: Unlimited (minted as rewards)
```

### Example Economics:

**Small Farmer (Monthly)**
```
Waste Processed: 200kg
Tokens Earned: 20 OWG
CO₂ Credits: 0.08 tons
Potential Income:
  - Token value: ~$20 (if 1 OWG = $1)
  - Carbon credits: KES 8,000
  - Total: ~KES 10,000/month
```

**Medium Cooperative (Monthly)**
```
Waste Processed: 2,000kg (10 farmers)
Tokens Earned: 200 OWG
CO₂ Credits: 0.8 tons
Potential Income:
  - Token value: ~$200
  - Carbon credits: KES 80,000
  - Total: ~KES 100,000/month
```

---

## 🌐 Deployed Contracts

### Moonbase Alpha (Testnet)
```
Contract Address: 0x2a1C1677DAB875425D0a3a0DeeDd1A6F2B751860
Network: Moonbase Alpha
Chain ID: 1287
Explorer: https://moonbase.moonscan.io/address/0x2a1C1677DAB875425D0a3a0DeeDd1A6F2B751860
```

### Polkadot Asset Hub Testnet
```
Contract Address: 0xd1D6Bee21BFf794B788D1D0656ED7AD93a3C452b
Network: Polkadot Asset Hub Testnet 
Chain ID: 420420422
Explorer: 0xd1D6Bee21BFf794B788D1D0656ED7AD93a3C452b
```

### Get Testnet Tokens:
- **Moonbase DEV**: https://faucet.moonbeam.network/
- **Pasea PassetHub PAS**: https://faucet.polkadot.io/?parachain=1111

---

## 🎥 Demo

### Live Demo
[Insert your deployed URL here]

### Demo Video
[Insert video walkthrough link]

### Screenshots

**Dashboard**
![Dashboard showing farmer statistics]

**Process Waste**
![Form for submitting waste collection]

**Carbon Credits Marketplace**
![Marketplace interface for buying/selling credits]

**Admin Panel**
![Farmer verification interface]

---

## 🗺 Future Roadmap

### Phase 2 (Q1 2026)
- [ ] Mobile app (React Native)
- [ ] Multi-language support (Swahili, French)
- [ ] Integration with local payment systems (M-Pesa)
- [ ] QR code verification for waste collection

### Phase 3 (Q2 2026)
- [ ] IoT sensors for automated waste measurement
- [ ] AI/ML for waste type classification
- [ ] NFT certificates for carbon credits
- [ ] Cross-chain bridge to other Polkadot parachains

### Phase 4 (Q3 2026)
- [ ] Mainnet deployment
- [ ] Partnership with waste management companies
- [ ] Corporate dashboard for ESG reporting
- [ ] Token utility expansion (governance, staking)

### Long-term Vision
- [ ] Expand to 10+ countries across Africa
- [ ] Process 1M+ tons of organic waste annually
- [ ] Onboard 100,000+ farmers
- [ ] Create 50,000+ green jobs

---

## 🤝 Contributing

We welcome contributions! 

### Development Process:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Osbon Keya** - Full-stack Developer & Blockchain Engineer
- **Ayub Macharia** - UI/UX Designer
- **Catherine Chepkesis** - Environmentalist

---

## 🙏 Acknowledgments

- **Polkadot** for the hackathon and ecosystem support
- **Polkadot Asset Hub** for cross-chain asset management
- **Moonbeam** for EVM compatibility on Polkadot
- **OpenZeppelin** for secure smart contract libraries
- **RainbowKit** for excellent wallet connection UX
- Local farming communities for inspiration and feedback

---

## 📞 Contact

- **Project Website**: https://organic-waste-gems.vercel.app/
- **Email**: osbonkeya@gmail.com



---

## 🔗 Links

- [Documentation](https://docs.google.com/document/d/1-WL-gcIaQ9ViX5o2jqv4mjlZbv-5w-mNGE4URyDWNUU/edit?usp=sharing)
- [Smart Contract Source](https://github.com/keyanureeves/OrganicWasteGems/tree/main/contracts)
- [Frontend Source](https://github.com/keyanureeves/OrganicWasteGems/tree/main/frontend)
- [Hackathon Submission]()

---

**Built with ❤️ for a sustainable future | Powered by Polkadot & Moonbeam**