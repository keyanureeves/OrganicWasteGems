'use client'

import { http, createStorage, cookieStorage } from 'wagmi'
import { moonbaseAlpha, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { contractAddress } from './contracts/abi'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your_project_id_here'

export const config = getDefaultConfig({
  appName: 'Organic Waste Gems',
  projectId,
  chains: [moonbaseAlpha, sepolia] as const,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [moonbaseAlpha.id]: http(),
    [sepolia.id]: http(),
  },
})

// Contract ABI and Address
export { CONTRACT_ABI, contractAddress } from './contracts/abi'
// Helper function to get contract address (simplified since we have one chain)
export function getContractAddress(): string {
  return contractAddress
}


// Chain configurations
export const SUPPORTED_CHAINS = [moonbaseAlpha]
export const DEFAULT_CHAIN = moonbaseAlpha