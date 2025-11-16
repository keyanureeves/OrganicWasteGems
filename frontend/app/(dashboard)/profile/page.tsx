"use client"

import { User, Leaf, Zap, Coins, Users, DollarSign, Package, Award, Loader2, AlertCircle } from "lucide-react"
import { useAccount } from "wagmi"
import { useFarmerData, useTokenBalance, useCarbonCredits, useWasteHistory } from "@/lib/hooks"
import { formatNumber, gramsToKg, formatKES, formatTimestamp } from "@/lib/utils/contract"

export default function ProfilePage() {
  const { address, isConnected } = useAccount()
  const { farmerImpact, isLoading: loadingImpact } = useFarmerData()
  const { formattedBalance, isLoading: loadingBalance } = useTokenBalance()
  const { carbonCredits, isLoading: loadingCredits } = useCarbonCredits()
  const { wasteHistory, isLoading: loadingHistory } = useWasteHistory()

  // Not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to view your profile
          </p>
        </div>
      </div>
    )
  }

  // Loading state
  if (loadingImpact || loadingBalance) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-accent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Farmer Profile</h1>
        <p className="text-muted-foreground">Your complete impact and statistics</p>
      </div>

      {/* Profile Card */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 neomorph-inset flex items-center justify-center">
            <User className="w-12 h-12 text-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">Farmer Account</h2>
            <p className="text-sm font-mono text-muted-foreground break-all">
              {address}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Member Status</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Waste */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Waste</p>
          <p className="text-3xl font-bold text-foreground">
            {farmerImpact ? formatNumber(farmerImpact.wasteKg) : "0"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">kilograms</p>
        </div>

        {/* CO2 Saved */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">CO₂ Saved</p>
          <p className="text-3xl font-bold text-foreground">
            {farmerImpact ? gramsToKg(farmerImpact.co2Grams) : "0"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">kilograms</p>
        </div>

        {/* Tokens Earned */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">OWG Tokens</p>
          <p className="text-3xl font-bold text-foreground">
            {formattedBalance || "0"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">current balance</p>
        </div>

        {/* Product Claimed */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Product</p>
          <p className="text-3xl font-bold text-foreground">
            {farmerImpact ? formatNumber(farmerImpact.productKg) : "0"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">kilograms</p>
        </div>
      </div>

      {/* Worker & Payment Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Workers Paid</h3>
              <p className="text-sm text-muted-foreground">Total workers employed</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground">
            {farmerImpact ? formatNumber(farmerImpact.workersPaid) : "0"}
          </p>
        </div>

        <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Total Payout</h3>
              <p className="text-sm text-muted-foreground">Amount paid to workers</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-foreground">
            {farmerImpact ? formatKES(farmerImpact.totalPayoutKES) : "KES 0"}
          </p>
        </div>
      </div>

      {/* Carbon Credits */}
      {carbonCredits && (
        <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Carbon Credits</h3>
              <p className="text-sm text-muted-foreground">Your environmental impact credits</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Available</p>
              <p className="text-3xl font-bold text-green-500">
                {formatNumber(carbonCredits.availableTons)} tons
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
              <p className="text-3xl font-bold text-foreground">
                {formatNumber(carbonCredits.totalEarnedTons)} tons
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Sold</p>
              <p className="text-3xl font-bold text-accent">
                {formatNumber(carbonCredits.soldTons)} tons
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Waste History */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Collection History</h3>
        {loadingHistory ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto" />
          </div>
        ) : wasteHistory && wasteHistory.length > 0 ? (
          <div className="space-y-4">
            {wasteHistory.map((collection, index) => (
              <div
                key={index}
                className="neomorph-inset p-4 rounded-xl bg-secondary/10 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{collection.wasteType}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTimestamp(collection.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {formatNumber(collection.kgCollected)} kg
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mt-3 pt-3 border-t border-border text-sm">
                  <div>
                    <span className="text-muted-foreground">Workers:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {formatNumber(collection.workersInvolved)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment:</span>{" "}
                    <span className="font-semibold text-foreground">
                      {formatKES(collection.workersPaymentKES)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No waste collections yet</p>
            <a
              href="/process"
              className="inline-block mt-4 px-6 py-2 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
            >
              Process Your First Collection
            </a>
          </div>
        )}
      </div>
    </div>
  )
}