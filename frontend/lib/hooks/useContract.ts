import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAddress, CONTRACT_ABI  } from '@/lib/contracts/abi'

export function useOWGContract() {
  const { chainId } = useAccount()

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Helper function to write to contract
  const writeToContract = async (functionName: string, args: unknown[]) => {
    return writeContract({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName,
      args,
    })
  }

  // Helper function to read from contract
  const useContractRead = (functionName: string, args?: unknown[]) => {
    return useReadContract({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName,
      args,
    })
  }

  return {
    contractAddress,
    writeToContract,
    useContractRead,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
  }
}