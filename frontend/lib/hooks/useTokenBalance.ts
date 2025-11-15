import { useAccount } from 'wagmi'
import { useOWGContract } from './useContract'
import { formatTokenBalance } from '../utils/contract'

export function useTokenBalance() {
  const { address } = useAccount()
  const { useContractRead } = useOWGContract()

  // Get token balance
  const { data, isLoading, error, refetch } = useContractRead('balanceOf', address ? [address] : undefined)

  const balance = data ? (data as bigint) : BigInt(0)
  const formattedBalance = formatTokenBalance(balance)

  return {
    balance,
    formattedBalance,
    isLoading,
    error,
    refetch,
  }
}