'use client'

import { http, createStorage, cookieStorage, createConfig } from 'wagmi'
import { moonbaseAlpha, sepolia, } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { contractAddress } from './contracts/abi'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your_project_id_here'

const passetHub = {
  id: 420420422,
  name: 'polkadot-hub-testnet',
  network: 'polkadot-hub-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'PAS',
    symbol: 'PAS',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet-passet-hub-eth-rpc.polkadot.io'],
    },
  },
} as const;

export const config = getDefaultConfig({
  appName: 'Organic Waste Gems',
  projectId,
  chains: [moonbaseAlpha,passetHub] as const,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [moonbaseAlpha.id]: http(),
    // [sepolia.id]: http(),
    [passetHub.id]: http()
  },
})

// Contract ABI and Address
export { CONTRACT_ABI, contractAddress } from './contracts/abi'
// Helper function to get contract address (simplified since we have one chain)
export function getContractAddress(): string {
  return contractAddress
}


// Chain configurations
export const SUPPORTED_CHAINS = [moonbaseAlpha,passetHub] as const;
export const DEFAULT_CHAIN = moonbaseAlpha


