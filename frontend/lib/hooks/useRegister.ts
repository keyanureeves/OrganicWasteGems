import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi'
import { CONTRACT_ABI, getContractAddress } from '@/lib/contracts/abi'

export function useRegister() {
  const { address, chainId } = useAccount()
  const contractAddress = getContractAddress(chainId)

  // Check if user is registered
  const { data: farmerData, isLoading, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'farmers',
    args: address ? [address] : undefined,
  })
  
  // farmerData comes back as a tuple-like array from the contract; assert a safer type instead of `any`
  type FarmerTuple = [boolean, ...unknown[]]
  const isRegistered = farmerData ? (farmerData as unknown as FarmerTuple)[0] : false

  // Write contract for registration
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Register function
  const register = async () => {
    if (!address) {
      throw new Error('Wallet not connected')
    }
    
    console.log('Registering with contract:', contractAddress)
    console.log('Chain ID:', chainId)
    
    try {
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'register',
        args: [],
      })
    } catch (err) {
      console.error('Registration error:', err)
      throw err
    }
  }

  return {
    isRegistered,
    isLoading,
    register,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    refetch,
  }
}