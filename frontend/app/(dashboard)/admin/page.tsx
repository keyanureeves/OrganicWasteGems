"use client"

import { useState } from "react"
import { Shield, CheckCircle, XCircle, Loader2, AlertCircle, Search, UserCheck } from "lucide-react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi"
import { CONTRACT_ABI, contractAddress } from "@/lib/contracts/abi"

export default function AdminPage() {
  const { address, isConnected } = useAccount()
  const [farmerToVerify, setFarmerToVerify] = useState("")
  const [farmerToRevoke, setFarmerToRevoke] = useState("")
  const [checkAddress, setCheckAddress] = useState("")
  
  // Check if current user is owner
  const { data: ownerAddress } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'owner',
  })

  // Verify farmer
  const { 
    writeContract: verifyFarmer, 
    data: verifyHash, 
    isPending: isVerifying,
    error: verifyError 
  } = useWriteContract()
  
  const { isLoading: isConfirmingVerify, isSuccess: isVerified } = useWaitForTransactionReceipt({ 
    hash: verifyHash 
  })

  // Revoke verification
  const { 
    writeContract: revokeFarmer, 
    data: revokeHash, 
    isPending: isRevoking,
    error: revokeError 
  } = useWriteContract()
  
  const { isLoading: isConfirmingRevoke, isSuccess: isRevoked } = useWaitForTransactionReceipt({ 
    hash: revokeHash 
  })

  // Check if farmer is verified
  const { data: isVerifiedFarmer, refetch: refetchVerification } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'verifiedFarmers',
    args: checkAddress ? [checkAddress as `0x${string}`] : undefined,
  })

  // Check if farmer is registered
  const { data: farmerData } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'farmers',
    args: checkAddress ? [checkAddress as `0x${string}`] : undefined,
  })

  const isOwner = address && ownerAddress && address.toLowerCase() === (ownerAddress as string).toLowerCase()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!farmerToVerify) return
    
    verifyFarmer({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'verifyFarmer',
      args: [farmerToVerify as `0x${string}`],
    })
  }

  const handleRevoke = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!farmerToRevoke) return
    
    revokeFarmer({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'revokeVerification',
      args: [farmerToRevoke as `0x${string}`],
    })
  }

  const handleCheck = () => {
    if (checkAddress) {
      refetchVerification()
    }
  }

  // Not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to access admin functions
          </p>
        </div>
      </div>
    )
  }

  // Not owner
  if (!isOwner) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Shield className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
          <p className="text-muted-foreground">
            Only the contract owner can access this page
          </p>
          <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
            <p className="text-xs text-muted-foreground">Current User:</p>
            <p className="text-xs font-mono text-foreground break-all">{address}</p>
            <p className="text-xs text-muted-foreground mt-2">Contract Owner:</p>
            <p className="text-xs font-mono text-foreground break-all">{ownerAddress as string}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage farmer verifications and platform settings</p>
      </div>

      {/* Owner Badge */}
      <div className="neomorph-inset p-4 rounded-xl bg-green-500/10 border border-green-500/30">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-green-500" />
          <div>
            <p className="font-semibold text-foreground">Contract Owner</p>
            <p className="text-sm font-mono text-muted-foreground">{address}</p>
          </div>
        </div>
      </div>

      {/* Check Verification Status */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Search className="w-6 h-6 text-accent" />
          Check Farmer Status
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Farmer Wallet Address
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="0x..."
                value={checkAddress}
                onChange={(e) => setCheckAddress(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 neomorph-inset"
              />
              <button
                onClick={handleCheck}
                disabled={!checkAddress}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check
              </button>
            </div>
          </div>

          {checkAddress && (
            <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Registration Status</p>
                  <div className="flex items-center gap-2">
                    {farmerData && (Array.isArray(farmerData) ? farmerData[0] : false) ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-500">Registered</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-semibold text-red-500">Not Registered</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Verification Status</p>
                  <div className="flex items-center gap-2">
                    {isVerifiedFarmer ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-500">Verified ✓</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-yellow-500" />
                        <span className="font-semibold text-yellow-500">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Verify Farmer */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-green-500" />
          Verify Farmer
        </h3>
        
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Farmer Wallet Address *
            </label>
            <input
              type="text"
              required
              placeholder="0x..."
              value={farmerToVerify}
              onChange={(e) => setFarmerToVerify(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 neomorph-inset"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter the wallet address of the farmer to verify
            </p>
          </div>

          {isVerified && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Farmer verified successfully!
              </p>
            </div>
          )}

          {verifyError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                {verifyError.message}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying || isConfirmingVerify || !farmerToVerify}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isVerifying || isConfirmingVerify ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isVerifying ? "Confirm in Wallet..." : "Verifying..."}
              </>
            ) : (
              <>
                <UserCheck className="w-5 h-5" />
                Verify Farmer
              </>
            )}
          </button>
        </form>
      </div>

      {/* Revoke Verification */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <XCircle className="w-6 h-6 text-red-500" />
          Revoke Verification
        </h3>
        
        <form onSubmit={handleRevoke} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Farmer Wallet Address *
            </label>
            <input
              type="text"
              required
              placeholder="0x..."
              value={farmerToRevoke}
              onChange={(e) => setFarmerToRevoke(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500 neomorph-inset"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter the wallet address of the farmer to revoke verification
            </p>
          </div>

          {isRevoked && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Verification revoked successfully!
              </p>
            </div>
          )}

          {revokeError && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                {revokeError.message}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isRevoking || isConfirmingRevoke || !farmerToRevoke}
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isRevoking || isConfirmingRevoke ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isRevoking ? "Confirm in Wallet..." : "Revoking..."}
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                Revoke Verification
              </>
            )}
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
        <h4 className="font-semibold text-foreground mb-3">About Farmer Verification</h4>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Only verified farmers can sell carbon credits to corporations</p>
          <p>• Verification ensures farmers are legitimate and follow proper waste processing guidelines</p>
          <p>• You can revoke verification at any time if needed</p>
          <p>• Farmers must be registered before they can be verified</p>
        </div>
      </div>
    </div>
  )
}