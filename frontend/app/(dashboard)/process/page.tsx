"use client"

import { useState } from "react"
import { Leaf, Loader2, CheckCircle, AlertCircle, Users, DollarSign } from "lucide-react"
import { useAccount } from "wagmi"
import { useProcessWaste, useRegister } from "@/lib/hooks"
import type { ProcessWasteInput } from "@/types/contract"

export default function ProcessWastePage() {
  const { address, isConnected } = useAccount()
  const { isRegistered } = useRegister()
  const { processWaste, isPending, isConfirming, isConfirmed, error } = useProcessWaste()

  const [formData, setFormData] = useState<ProcessWasteInput>({
    collectedWasteKg: 0,
    wasteType: "",
    workersInvolved: 0,
    workersPaymentKES: 0,
  })

  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate rewards
  const calculateRewards = () => {
    const tokens = Math.floor(formData.collectedWasteKg / 10)
    const co2 = formData.collectedWasteKg * 0.4 // 400g = 0.4kg per kg
    return { tokens, co2 }
  }

  const rewards = calculateRewards()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await processWaste(formData)
      setShowSuccess(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          collectedWasteKg: 0,
          wasteType: "",
          workersInvolved: 0,
          workersPaymentKES: 0,
        })
        setShowSuccess(false)
      }, 5000)
    } catch (err) {
      console.error("Error processing waste:", err)
    }
  }

  const handleInputChange = (field: keyof ProcessWasteInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to process waste
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
              <h2 className="text-2xl font-bold text-foreground mb-2">Waste Processed!</h2>
              <p className="text-muted-foreground mb-4">
                Your waste collection has been successfully recorded
              </p>
              <div className="space-y-2 text-left bg-secondary/20 p-4 rounded-lg">
                <p className="text-sm">
                  <span className="text-muted-foreground">Tokens Earned:</span>{" "}
                  <span className="font-bold text-accent">{rewards.tokens} OWG</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">CO₂ Saved:</span>{" "}
                  <span className="font-bold text-green-500">{rewards.co2} kg</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
            >
              Process More Waste
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Process Waste</h1>
        <p className="text-muted-foreground">
          Record your waste collection and earn OWG tokens
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="neomorph-card p-8 rounded-3xl bg-card border border-border space-y-6">
        {/* Waste Amount */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Waste Collected (kg) *
          </label>
          <input
            type="number"
            min="10"
            step="1"
            required
            value={formData.collectedWasteKg || ""}
            onChange={(e) => handleInputChange("collectedWasteKg", Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent neomorph-inset"
            placeholder="Enter weight in kg (minimum 10kg)"
          />
          <p className="text-xs text-muted-foreground mt-1">Minimum: 10 kg</p>
        </div>

        {/* Waste Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Waste Type *
          </label>
          <select
            required
            value={formData.wasteType}
            onChange={(e) => handleInputChange("wasteType", e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent neomorph-inset"
          >
            <option value="">Select waste type</option>
            <option value="Food Waste">Food Waste</option>
            <option value="Garden Waste">Garden Waste</option>
            <option value="Agricultural Waste">Agricultural Waste</option>
            <option value="Mixed Organic">Mixed Organic</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Workers Involved */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Workers Involved
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={formData.workersInvolved || ""}
            onChange={(e) => handleInputChange("workersInvolved", Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent neomorph-inset"
            placeholder="Number of workers"
          />
        </div>

        {/* Worker Payment */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Total Payment (KES)
          </label>
          <input
            type="number"
            min="0"
            step="1"
            value={formData.workersPaymentKES || ""}
            onChange={(e) => handleInputChange("workersPaymentKES", Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent neomorph-inset"
            placeholder="Total paid to workers"
          />
        </div>

        {/* Rewards Preview */}
        {formData.collectedWasteKg >= 10 && (
          <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-accent" />
              Estimated Rewards
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tokens</p>
                <p className="text-2xl font-bold text-accent">{rewards.tokens} OWG</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">CO₂ Saved</p>
                <p className="text-2xl font-bold text-green-500">{rewards.co2} kg</p>
              </div>
            </div>
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
          disabled={isPending || isConfirming || formData.collectedWasteKg < 10 || !formData.wasteType}
          className="w-full px-6 py-4 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending || isConfirming ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {isPending ? "Confirm in Wallet..." : "Processing..."}
            </>
          ) : (
            <>
              <Leaf className="w-5 h-5" />
              Process Waste Collection
            </>
          )}
        </button>

        <p className="text-xs text-muted-foreground text-center">
          * Required fields. Transaction will be recorded on the blockchain.
        </p>
      </form>
    </div>
  )
}