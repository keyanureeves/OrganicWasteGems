import { useOWGContract } from './useContract'
import { toBigInt } from '../utils/contract'
import type { ProcessWasteInput } from '@/types/contract'

export function useProcessWaste() {
  const { writeToContract, isPending, isConfirming, isConfirmed, writeError } = useOWGContract()

  const processWaste = async (input: ProcessWasteInput) => {
    const { collectedWasteKg, wasteType, workersInvolved, workersPaymentKES } = input

    // Validation
    if (collectedWasteKg < 10) {
      throw new Error('Minimum 10kg required')
    }

    // Convert to BigInt
    const kgBigInt = toBigInt(collectedWasteKg)
    const workersBigInt = toBigInt(workersInvolved)
    const paymentBigInt = toBigInt(workersPaymentKES)

    return writeToContract('processWaste', [
      kgBigInt,
      wasteType,
      workersBigInt,
      paymentBigInt,
    ])
  }

  return {
    processWaste,
    isPending,
    isConfirming,
    isConfirmed,
    error: writeError,
  }
}