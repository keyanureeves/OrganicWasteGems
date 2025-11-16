import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useOWGContract } from './useContract'
import { toBigInt } from '../utils/contract'
import { parseEther } from 'viem'
import type { CarbonCredits, BuyCarbonCreditsInput } from '@/types/contract'
import { CONTRACT_ABI, contractAddress } from '@/lib/contracts/abi'

interface CarbonCreditsData extends Array<bigint> {
  0: bigint
  1: bigint
  2: bigint
}

export function useCarbonCredits(farmerAddress?: string) {
  const { address, chainId } = useAccount()
  const { useContractRead } = useOWGContract()
  // Use imported contractAddress directly

  // Separate write contract hook for payable function
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

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

  // Buy carbon credits with payment
  const buyCarbonCredits = async (input: BuyCarbonCreditsInput) => {
    const { farmerAddress, tonsCO2, priceKES } = input

    // Validation
    if (tonsCO2 <= 0) {
      throw new Error('Tons must be greater than 0')
    }

    if (!farmerAddress || farmerAddress.length !== 42) {
      throw new Error('Invalid farmer address')
    }

    // Convert to BigInt
    const tonsBigInt = toBigInt(tonsCO2)
    const priceBigInt = toBigInt(priceKES)

    // Calculate payment value in native token (DEV for Moonbase)
    // Using 0.0001 DEV per ton as minimum payment
    // Adjust this rate based on your economic model
    const paymentPerTon = 0.0001 // 0.0001 DEV per ton
    const paymentValue = parseEther((tonsCO2 * paymentPerTon).toString())

    // Call the payable function with value
    return writeContract({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'buyCarbonCredits',
      args: [farmerAddress, tonsBigInt, priceBigInt],
      value: paymentValue, // Send payment with transaction
    })
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
    hash, // Transaction hash for tracking
  }
}