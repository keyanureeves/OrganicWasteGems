// scripts/deploy.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
    //getting the network address
  console.log("Deploying OrganicWasteGems to network:", hre.network.name);

  // Get signer 
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);
//   console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Compile & get contract factory
  const OrganicWasteGems = await hre.ethers.getContractFactory("OrganicWasteGems");

  console.log("Deploying contract...");
  const owg = await OrganicWasteGems.deploy(); // constructor has no parameters

  console.log("Waiting for deployment confirmation...");
  await owg.waitForDeployment();

  // Log deployed address
  const contractAddress = await owg.getAddress();
  console.log("OrganicWasteGems deployed to:", contractAddress);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment error:", error);
    process.exit(1);
  });
