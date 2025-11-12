require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    moonbase: {
      url: process.env.ALCHEMY_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },

  sourcify: {
  enabled: true
},
  
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};