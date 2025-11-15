import { useAccount } from 'wagmi'
import { useOWGContract } from './useContract'
import type { FarmerImpact } from '@/types/contract'

export function useFarmerData() {
  const { address } = useAccount()
  const { useContractRead } = useOWGContract()

  // Get farmer impact data
  const { data, isLoading, error, refetch } = useContractRead('getImpact', address ? [address] : undefined)

  const farmerImpact: FarmerImpact | null = data
    ? {
        wasteKg: (data as unknown as bigint[])[0],
        productKg: (data as unknown as bigint[])[1],
        co2Grams: (data as unknown as bigint[])[2],
        co2Kg: (data as unknown as bigint[])[3],
        tokens: (data as unknown as bigint[])[4],
        workersPaid: (data as unknown as bigint[])[5],
        totalPayoutKES: (data as unknown as bigint[])[6],
      }
    : null

  return {
    farmerImpact,
    isLoading,
    error,
    refetch,
  }
}