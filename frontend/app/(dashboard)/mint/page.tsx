"use client"

import { useState } from "react"
import { Coins, Loader2, CheckCircle, AlertCircle, Package } from "lucide-react"
import { useAccount } from "wagmi"
import { useClaimTokens, useRegister, useFarmerData } from "@/lib/hooks"
import type { ClaimTokensInput } from "@/types/contract"
import { formatNumber } from "@/lib/utils/contract"

export default function MintTokensPage() {
  const { address, isConnected } = useAccount()
  const { isRegistered } = useRegister()
  const { farmerImpact } = useFarmerData()
  const { claimProductTokens, isPending, isConfirming, isConfirmed, error } = useClaimTokens()

  const [formData, setFormData] = useState<ClaimTokensInput>({
    productKg: 0,
  })

  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate tokens to receive
  const tokensToReceive = Math.floor(formData.productKg / 10)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await claimProductTokens(formData)
      setShowSuccess(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ productKg: 0 })
        setShowSuccess(false)
      }, 5000)
    } catch (err) {
      console.error("Error claiming tokens:", err)
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
            Please connect your wallet to claim tokens
          </p>
        </div>
      </div>
    )
  }

  // Not registered
  if (!isRegistered) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Registration Required</h2>
          <p className="text-muted-foreground">
            You need to register as a farmer first
          </p>
          <a
            href="/dashboard"
            className="inline-block px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }

  // Success state
  if (showSuccess && isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="neomorph-card p-8 rounded-3xl bg-card border border-border max-w-md">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Tokens Claimed!</h2>
              <p className="text-muted-foreground mb-4">
                Your product tokens have been successfully minted
              </p>
              <div className="space-y-2 text-left bg-secondary/20 p-4 rounded-lg">
                <p className="text-sm">
                  <span className="text-muted-foreground">Product:</span>{" "}
                  <span className="font-bold text-foreground">{formData.productKg} kg</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Tokens Minted:</span>{" "}
                  <span className="font-bold text-accent">{tokensToReceive} OWG</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
            >
              Claim More Tokens
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Mint Tokens</h1>
        <p className="text-muted-foreground">
          Claim tokens for your produced organic products
        </p>
      </div>

      {/* Current Stats */}
      <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Waste Processed</p>
            <p className="text-2xl font-bold text-foreground">
              {farmerImpact ? formatNumber(farmerImpact.wasteKg) : "0"} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Product Claimed</p>
            <p className="text-2xl font-bold text-accent">
              {farmerImpact ? formatNumber(farmerImpact.productKg) : "0"} kg
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">What is Product Claiming?</h3>
            <p className="text-sm text-muted-foreground">
              After composting or processing your organic waste, you can claim tokens for the final product.
              For every 10kg of product (compost, fertilizer, etc.), you will receive 1 OWG token.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="neomorph-card p-8 rounded-3xl bg-card border border-border space-y-6">
        {/* Product Amount */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Product Amount (kg) *
          </label>
          <input
            type="number"
            min="1"
            step="1"
            required
            value={formData.productKg || ""}
            onChange={(e) => setFormData({ productKg: Number(e.target.value) })}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent neomorph-inset"
            placeholder="Enter product weight in kg"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Weight of your produced compost, fertilizer, or other organic product
          </p>
        </div>

        {/* Tokens Preview */}
        {formData.productKg > 0 && (
          <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent" />
              Tokens to Receive
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Product</p>
                <p className="text-2xl font-bold text-foreground">{formData.productKg} kg</p>
              </div>
              <div className="text-4xl text-muted-foreground">→</div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tokens</p>
                <p className="text-2xl font-bold text-accent">{tokensToReceive} OWG</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              1 OWG = 10 kg of product
            </p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              {error.message}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || isConfirming || formData.productKg <= 0}
          className="w-full px-6 py-4 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {isPending ? "Confirm in Wallet..." : "Minting Tokens..."}
            </>
          ) : (
            <>
              <Coins className="w-5 h-5" />
              Claim {tokensToReceive} OWG Tokens
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          * Transaction will be recorded on the blockchain
        </p>
      </form>
    </div>
  )
}