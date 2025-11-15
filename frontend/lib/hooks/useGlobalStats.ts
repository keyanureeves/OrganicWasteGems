import { useOWGContract } from './useContract'
import type { GlobalStats } from '@/types/contract'

type GlobalStatsData = [bigint, bigint, bigint, bigint, bigint]

export function useGlobalStats() {
  const { useContractRead } = useOWGContract()

  // Get global statistics
  const { data, isLoading, error, refetch } = useContractRead('getGlobalStats', [])

  const globalStats: GlobalStats | null = data
    ? {
        farmersCount: (data as GlobalStatsData)[0],
        wasteKg: (data as GlobalStatsData)[1],
        co2SavedKg: (data as GlobalStatsData)[2],
        tokensCirculating: (data as GlobalStatsData)[3],
        carbonCreditsSoldTons: (data as GlobalStatsData)[4],
      }
    : null

  return {
    globalStats,
    isLoading,
    error,
    refetch,
  }
}