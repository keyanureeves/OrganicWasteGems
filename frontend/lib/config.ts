// 'use client'  // client-side storage for fast initial data //ensures it runs on the client side// wallet connect and metamask cant run on the server 

// import { http, createStorage, cookieStorage } from 'wagmi' //we use cookieStorage to store Wagmi data in browser cookies.// http creates JSON RPC connections to chains.
// import { sepolia, bscTestnet, blastSepolia } from 'wagmi/chains' //Predefined test networks.
// import { getDefaultConfig } from '@rainbow-me/rainbowkit' //Chain → TypeScript type for supported chains. //getDefaultConfig → RainbowKit helper to create a full wagmi configuration with minimal boilerplate.

// const projectId = '00518fe2c3e7f802a90ab750249ffe6b' // 👉 replace with your WalletConnect project ID //Required so users can connect via WalletConnect (mobile wallets, etc.).

// // const supportedChains = [sepolia, bscTestnet, blastSepolia] //Defines which chains your dApp supports.

// export const config = getDefaultConfig({
//   appName: 'WalletConnection',
//   projectId,
//   chains: [sepolia, bscTestnet, blastSepolia] as const,  // Add 'as const' to preserve literal types //Direct usage of chain objects ensures type compatibility with RainbowKit's expectations
//   ssr: true, //
//   storage: createStorage({
//     storage: cookieStorage,
//   }),
//   transports: {  //The explicit transports configuration is clearer and type-safe
//     [sepolia.id]: http(),
//     [bscTestnet.id]: http(),
//     [blastSepolia.id]: http(),
//   },
// })




 'use client'  // Ensures it runs on the client side — wallet connect & metamask can't run on server

import { http, createStorage, cookieStorage } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = '00518fe2c3e7f802a90ab750249ffe6b' // Replace with your WalletConnect project ID

// Moonbase Alpha — Moonbeam's Polkadot testnet (EVM compatible)
const moonbaseAlpha = {
  id: 1287,
  name: 'Moonbase Alpha',
  network: 'moonbase-alpha',
  nativeCurrency: { name: 'DEV', symbol: 'DEV', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.api.moonbase.moonbeam.network'] },
    public: { http: ['https://rpc.api.moonbase.moonbeam.network'] },
  },
  blockExplorers: {
    default: { name: 'Moonscan', url: 'https://moonbase.moonscan.io' },
  },
  testnet: true,
} as const

export const config = getDefaultConfig({
  appName: 'WalletConnection',
  projectId,
  chains: [sepolia, moonbaseAlpha] as const,  // Only Sepolia + Moonbase Alpha
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [sepolia.id]: http(),
    [moonbaseAlpha.id]: http(),
  },
})