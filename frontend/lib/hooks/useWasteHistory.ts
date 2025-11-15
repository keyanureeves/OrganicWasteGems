import { useAccount } from 'wagmi'
import { useOWGContract } from './useContract'
import type { WasteCollection } from '@/types/contract'

interface WasteHistoryRaw {
  kgCollected: unknown
  timestamp: unknown
  workersInvolved: unknown
  workersPaymentKES: unknown
  wasteType: unknown
}

export function useWasteHistory() {
  const { address } = useAccount()
  const { useContractRead } = useOWGContract()

  // Get waste collection history
  const { data, isLoading, error, refetch } = useContractRead(
    'getWasteHistory',
    address ? [address] : undefined
  )

  const wasteHistory: WasteCollection[] = data
    ? (data as WasteHistoryRaw[]).map((item: WasteHistoryRaw) => ({
        kgCollected: item.kgCollected as bigint,
        timestamp: item.timestamp as bigint,
        workersInvolved: item.workersInvolved as bigint,
        workersPaymentKES: item.workersPaymentKES as bigint,
        wasteType: item.wasteType as string,
      }))
    : []

  return {
    wasteHistory,
    isLoading,
    error,
    refetch,
  }
}