import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",

  networks: {
    moonbase: {
      url: process.env.ALCHEMY_URL ?? "https://rpc.api.moonbase.moonbeam.network",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1287,
    },
  },

  // ---- Verification (optional but handy for hackathon) ----
  etherscan: {
    apiKey: {
      // Moonscan uses the same key format as Etherscan
      moonbase: process.env.MOONSCAN_API_KEY ?? "",
    },
    customChains: [
      {
        network: "moonbase",
        chainId: 1287,
        urls: {
          apiURL: "https://api-moonbase.moonscan.io/api",
          browserURL: "https://moonbase.moonscan.io",
        },
      },
    ],
  },

  sourcify: {
    enabled: true,
  },
};

export default config;

//deployment into polkavm

// if (typeof WebSocket === 'undefined') {
//     global.WebSocket = require('ws');
// }


// require('@nomicfoundation/hardhat-toolbox')
// require('@parity/hardhat-polkadot')
// require('dotenv').config()

// // If using hardhat vars, uncomment the line below
// // const { vars } = require("hardhat/config");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//     solidity: '0.8.26',

//     // Compiler configuration for PolkaVM
//     resolc: {
//         compilerSource: 'npm',
//         settings: {
//             optimizer: {
//                 enabled: true,
//                 parameters: 'z',
//                 fallbackOz: true,
//                 runs: 200,
//             },
//             viaIR: true,
//             standardJson: true,
//         },
//     },

//     networks: {
//         // Local node deployment with PolkaVM
//         localNode: {
//             polkavm: true,
//             url: 'http://127.0.0.1:8545',
//         },

//         // Polkadot Hub TestNet
//         polkadotHubTestnet: {
//             polkavm: true,
//             url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
//             accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
//             // accounts: [vars.get("PRIVATE_KEY")]
//         },
//     },
// }