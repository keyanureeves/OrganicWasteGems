"use client"

import { Leaf, Zap, TrendingUp, Loader2, AlertCircle } from "lucide-react"
import { useAccount } from "wagmi"
import { useFarmerData, useTokenBalance, useGlobalStats, useRegister } from "@/lib/hooks"
import { formatNumber, gramsToKg } from "@/lib/utils/contract"

export default function DashboardPage() {
  const { address, isConnected } = useAccount()
  const { farmerImpact, isLoading: loadingImpact } = useFarmerData()
  const { formattedBalance, isLoading: loadingBalance } = useTokenBalance()
  const { globalStats, isLoading: loadingGlobal } = useGlobalStats()
  const { isRegistered, register, isPending, isConfirmed } = useRegister()

  // Show connect wallet message if not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to view your dashboard
          </p>
        </div>
      </div>
    )
  }

  // Show registration prompt if not registered
  if (!isRegistered && !loadingImpact) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="neomorph-card p-8 rounded-3xl bg-card border border-border max-w-md">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mx-auto">
              <Leaf className="w-10 h-10 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Welcome to OWG!</h2>
              <p className="text-muted-foreground">
                Register as a farmer to start earning tokens for processing organic waste
              </p>
            </div>
            <button
              onClick={() => register()}
              disabled={isPending}
              className="w-full px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Registering...
                </>
              ) : isConfirmed ? (
                "Registration Confirmed! ✓"
              ) : (
                "Register as Farmer"
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (loadingImpact || loadingBalance || loadingGlobal) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-accent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here is your sustainability impact.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Waste Processed */}
        <div className="neomorph-outset p-8 rounded-3xl bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Waste Processed</p>
              <p className="text-4xl font-bold text-foreground mt-2">
                {farmerImpact ? formatNumber(farmerImpact.wasteKg) : "0"} kg
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <Leaf className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Product Claimed: <span className="font-semibold text-foreground">
                {farmerImpact ? formatNumber(farmerImpact.productKg) : "0"} kg
              </span>
            </p>
          </div>
        </div>

        {/* CO2 Saved */}
        <div className="neomorph-outset p-8 rounded-3xl bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">CO₂ Saved</p>
              <p className="text-4xl font-bold text-foreground mt-2">
                {farmerImpact ? gramsToKg(farmerImpact.co2Grams) : "0"} kg
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <Zap className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-accent font-semibold">
              Environmental Impact Verified ✓
            </p>
          </div>
        </div>

        {/* Tokens Earned */}
        <div className="neomorph-outset p-8 rounded-3xl bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Tokens Earned</p>
              <p className="text-4xl font-bold text-foreground mt-2">
                {formattedBalance || "0"} OWG
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Workers Paid: <span className="font-semibold text-foreground">
                {farmerImpact ? formatNumber(farmerImpact.workersPaid) : "0"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Global Impact Section */}
      {globalStats && (
        <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Global Impact</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Farmers</p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(globalStats.farmersCount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Global Waste</p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(globalStats.wasteKg)} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Global CO₂ Saved</p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(globalStats.co2SavedKg)} kg
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Carbon Credits Sold</p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(globalStats.carbonCreditsSoldTons)} tons
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Panel */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
          <p className="text-muted-foreground">
            Start processing waste or claim your product tokens
          </p>
          <div className="flex gap-4 justify-center pt-4 flex-wrap">
            <a
              href="/process"
              className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
            >
              Process Waste
            </a>
            <a
              href="/mint"
              className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
            >
              Claim Tokens
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}