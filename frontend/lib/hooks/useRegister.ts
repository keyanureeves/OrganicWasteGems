import { useAccount } from 'wagmi'
import { useOWGContract } from './useContract'

export function useRegister() {
  const { address } = useAccount()
  const { useContractRead, writeToContract, isPending, isConfirming, isConfirmed, writeError } = useOWGContract()

  // Check if user is registered
  const { data: farmerData, isLoading, refetch } = useContractRead('farmers', address ? [address] : undefined)
  
  const isRegistered = farmerData ? (farmerData as unknown[])[0] : false

  // Register function
  const register = async () => {
    if (!address) {
      throw new Error('Wallet not connected')
    }
    
    return writeToContract('register', [])
  }

  return {
    isRegistered,
    isLoading,
    register,
    isPending,
    isConfirming,
    isConfirmed,
    error: writeError,
    refetch,
  }
}