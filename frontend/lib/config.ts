'use client'  // client-side storage for fast initial data //ensures it runs on the client side// wallet connect and metamask cant run on the server 

import { http, createStorage, cookieStorage } from 'wagmi' //we use cookieStorage to store Wagmi data in browser cookies.// http creates JSON RPC connections to chains.
import { sepolia, bscTestnet, blastSepolia } from 'wagmi/chains' //Predefined test networks.
import { getDefaultConfig } from '@rainbow-me/rainbowkit' //Chain → TypeScript type for supported chains. //getDefaultConfig → RainbowKit helper to create a full wagmi configuration with minimal boilerplate.

const projectId = '00518fe2c3e7f802a90ab750249ffe6b' // 👉 replace with your WalletConnect project ID //Required so users can connect via WalletConnect (mobile wallets, etc.).

// const supportedChains = [sepolia, bscTestnet, blastSepolia] //Defines which chains your dApp supports.

export const config = getDefaultConfig({
  appName: 'WalletConnection',
  projectId,
  chains: [sepolia, bscTestnet, blastSepolia] as const,  // Add 'as const' to preserve literal types //Direct usage of chain objects ensures type compatibility with RainbowKit's expectations
  ssr: true, //
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {  //The explicit transports configuration is clearer and type-safe
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
    [blastSepolia.id]: http(),
  },
})

 