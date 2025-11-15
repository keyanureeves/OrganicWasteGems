import { useOWGContract } from './useContract'
import { toBigInt } from '../utils/contract'
import type { ClaimTokensInput } from '@/types/contract'

export function useClaimTokens() {
  const { writeToContract, isPending, isConfirming, isConfirmed, writeError } = useOWGContract()

  const claimProductTokens = async (input: ClaimTokensInput) => {
    const { productKg } = input

    // Validation
    if (productKg <= 0) {
      throw new Error('Product amount must be greater than 0')
    }

    // Convert to BigInt
    const kgBigInt = toBigInt(productKg)

    return writeToContract('claimProductTokens', [kgBigInt])
  }

  return {
    claimProductTokens,
    isPending,
    isConfirming,
    isConfirmed,
    error: writeError,
  }
}