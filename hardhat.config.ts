require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require('@parity/hardhat-polkadot')


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // sepolia: {
    //   url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
    //   accounts: [process.env.PRIVATE_KEY],
    //   chainId: 11155111,
    // },
    moonbaseAlpha: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1287,
    },

    // Local node deployment with PolkaVM
    localNode: {
      polkavm: true,
      url: 'http://127.0.0.1:8545',
    },

    // Polkadot Hub TestNet
    polkadotHubTestnet: {
      polkavm: true,
      url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      // accounts: [vars.get("PRIVATE_KEY")]
    },
  },
  etherscan: {
    apiKey: {
      // sepolia: process.env.ETHERSCAN_API_KEY,
      // moonbaseAlpha: process.env.MOONSCAN_API_KEY,
    },
    customChains: [
      {
        network: "moonbaseAlpha",
        chainId: 1287,
        urls: {
          apiURL: "https://api-moonbase.moonscan.io/api",
          browserURL: "https://moonbase.moonscan.io"
        }
      }
    ]
  },
  sourcify: {
    enabled: true
  },

  // Compiler configuration for PolkaVM
  resolc: {
    compilerSource: 'npm',
    settings: {
      optimizer: {
        enabled: true,
        parameters: 'z',
        fallbackOz: true,
        runs: 200,
      },
      standardJson: true,
    },
  },
};