import { useAccount } from 'wagmi'
import { useOWGContract } from './useContract'
import { toBigInt } from '../utils/contract'
import type { CarbonCredits, BuyCarbonCreditsInput } from '@/types/contract'

interface CarbonCreditsData extends Array<bigint> {
  0: bigint
  1: bigint
  2: bigint
}

export function useCarbonCredits(farmerAddress?: string) {
  const { address } = useAccount()
  const { useContractRead, writeToContract, isPending, isConfirming, isConfirmed, writeError } = useOWGContract()

  // Get carbon credits for a specific farmer
  const targetAddress = farmerAddress || address
  
  const { data, isLoading, error, refetch } = useContractRead(
    'getAvailableCarbonCredits',
    targetAddress ? [targetAddress] : undefined
  )

  const carbonCredits: CarbonCredits | null = data
    ? {
        availableTons: (data as CarbonCreditsData)[0],
        totalEarnedTons: (data as CarbonCreditsData)[1],
        soldTons: (data as CarbonCreditsData)[2],
      }
    : null

  // Buy carbon credits
  const buyCarbonCredits = async (input: BuyCarbonCreditsInput) => {
    const { farmerAddress, tonsCO2, priceKES } = input

    // Validation
    if (tonsCO2 <= 0) {
      throw new Error('Tons must be greater than 0')
    }

    // Convert to BigInt
    const tonsBigInt = toBigInt(tonsCO2)
    const priceBigInt = toBigInt(priceKES)

    // Calculate payment in wei (this needs to be adjusted based on your payment logic)
    const paymentValue = BigInt(priceKES) * BigInt(10 ** 18) // Convert KES to wei equivalent

    return writeToContract('buyCarbonCredits', [farmerAddress, tonsBigInt, priceBigInt])
    // Note: You'll need to add { value: paymentValue } for payable functions
  }

  return {
    carbonCredits,
    isLoading,
    error,
    refetch,
    buyCarbonCredits,
    isPending,
    isConfirming,
    isConfirmed,
    buyError: writeError,
  }
}