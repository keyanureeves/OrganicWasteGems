"use client"

import { useState } from "react"
import { Award, TrendingUp, Loader2, AlertCircle, ShoppingCart, CheckCircle, Leaf, DollarSign } from "lucide-react"
import { useAccount } from "wagmi"
import { useCarbonCredits, useFarmerData, useRegister } from "@/lib/hooks"
import { formatNumber, gramsToTons, formatKES } from "@/lib/utils/contract"

type ViewMode = "farmer" | "buyer"

export default function CarbonCreditsPage() {
  const { address, isConnected } = useAccount()
  const { isRegistered } = useRegister()
  const { carbonCredits, buyCarbonCredits, isPending, isConfirming, isConfirmed, buyError } = useCarbonCredits()
  const { farmerImpact, isLoading: loadingImpact } = useFarmerData()
  
  const [viewMode, setViewMode] = useState<ViewMode>("farmer")
  const [buyForm, setBuyForm] = useState({
    farmerAddress: "",
    tons: 0,
    pricePerTon: 10000, // Default: KES 10,000 per ton
  })
  const [showSuccess, setShowSuccess] = useState(false)

  // Calculate values
  const totalCost = buyForm.tons * buyForm.pricePerTon
  const availableCredits = carbonCredits ? Number(carbonCredits.availableTons) : 0

  // Handle buy submission
  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await buyCarbonCredits({
        farmerAddress: buyForm.farmerAddress,
        tonsCO2: buyForm.tons,
        priceKES: buyForm.pricePerTon,
      })
      
      setShowSuccess(true)
      setTimeout(() => {
        setBuyForm({
          farmerAddress: "",
          tons: 0,
          pricePerTon: 10000,
        })
        setShowSuccess(false)
      }, 5000)
    } catch (err) {
      console.error("Error buying carbon credits:", err)
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
            Please connect your wallet to access carbon credits
          </p>
        </div>
      </div>
    )
  }

  // Loading state
  if (loadingImpact && viewMode === "farmer") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-green-500 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading carbon credits...</p>
        </div>
      </div>
    )
  }

  // Success state for buyer
  if (showSuccess && isConfirmed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="neomorph-card p-8 rounded-3xl bg-card border border-border max-w-md">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Purchase Successful!</h2>
              <p className="text-muted-foreground mb-4">
                Your carbon credits have been purchased and recorded on the blockchain
              </p>
              <div className="space-y-2 text-left bg-secondary/20 p-4 rounded-lg">
                <p className="text-sm">
                  <span className="text-muted-foreground">Credits:</span>{" "}
                  <span className="font-bold text-green-500">{buyForm.tons} tons CO₂</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Total Cost:</span>{" "}
                  <span className="font-bold text-foreground">{formatKES(BigInt(totalCost))}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Purchase More Credits
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Carbon Credits Marketplace</h1>
        <p className="text-muted-foreground">Buy and sell verified carbon offset credits</p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => setViewMode("farmer")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            viewMode === "farmer"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
              : "bg-secondary text-secondary-foreground neomorph-inset"
          }`}
        >
          <Leaf className="w-5 h-5 inline mr-2" />
          Farmer View
        </button>
        <button
          onClick={() => setViewMode("buyer")}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
            viewMode === "buyer"
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
              : "bg-secondary text-secondary-foreground neomorph-inset"
          }`}
        >
          <ShoppingCart className="w-5 h-5 inline mr-2" />
          Corporate Buyer
        </button>
      </div>

      {/* Farmer View */}
      {viewMode === "farmer" && (
        <>
          {/* Not registered warning */}
          {!isRegistered && (
            <div className="neomorph-card p-6 rounded-3xl bg-yellow-500/10 border border-yellow-500/30">
              <div className="flex items-center gap-4">
                <AlertCircle className="w-10 h-10 text-yellow-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Registration Required</h3>
                  <p className="text-sm text-muted-foreground">
                    You need to register as a farmer to earn carbon credits
                  </p>
                </div>
                <a
                  href="/dashboard"
                  className="ml-auto px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold whitespace-nowrap"
                >
                  Register Now
                </a>
              </div>
            </div>
          )}

          {/* Carbon Credits Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Available Credits */}
            <div className="neomorph-outset p-8 rounded-3xl bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center">
                  <Award className="w-7 h-7 text-green-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Available to Sell</p>
              <p className="text-4xl font-bold text-green-500">
                {carbonCredits ? formatNumber(carbonCredits.availableTons) : "0"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">tons CO₂</p>
            </div>

            {/* Total Earned */}
            <div className="neomorph-outset p-8 rounded-3xl bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Total Earned</p>
              <p className="text-4xl font-bold text-foreground">
                {carbonCredits ? formatNumber(carbonCredits.totalEarnedTons) : "0"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">tons CO₂</p>
            </div>

            {/* Sold Credits */}
            <div className="neomorph-outset p-8 rounded-3xl bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-emerald-500" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Already Sold</p>
              <p className="text-4xl font-bold text-emerald-500">
                {carbonCredits ? formatNumber(carbonCredits.soldTons) : "0"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">tons CO₂</p>
            </div>
          </div>

          {/* How Credits are Earned */}
          <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">How Carbon Credits Work</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="neomorph-inset p-6 rounded-xl bg-secondary/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-500" />
                  Earning Credits
                </h4>
                <p className="text-sm text-muted-foreground">
                  For every kilogram of organic waste you process, you save 400 grams of CO₂ emissions. 
                  These savings are converted into carbon credits that you can sell to corporations.
                </p>
                <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                  <p className="text-sm font-semibold text-green-500">
                    1 kg waste = 400g CO₂ saved = 0.0004 tons credit
                  </p>
                </div>
              </div>

              <div className="neomorph-inset p-6 rounded-xl bg-secondary/10">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                  Selling Credits
                </h4>
                <p className="text-sm text-muted-foreground">
                  Corporations purchase your carbon credits to offset their emissions. 
                  The typical market price ranges from KES 8,000 to KES 15,000 per ton.
                </p>
                <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg">
                  <p className="text-sm font-semibold text-emerald-500">
                    Market rate: ~KES 10,000 per ton CO₂
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Listing Info */}
          {availableCredits > 0 && (
            <div className="neomorph-card p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
              <h3 className="text-xl font-semibold text-foreground mb-4">Your Credits Listing</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Available for Sale</p>
                  <p className="text-3xl font-bold text-green-500 mb-4">
                    {formatNumber(carbonCredits?.availableTons || BigInt(0))} tons CO₂
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Estimated Value (@ KES 10,000/ton)
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatKES(BigInt(availableCredits * 10000))}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center p-6 bg-background/50 rounded-xl neomorph-inset">
                    <Award className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground mb-2">Share your wallet address</p>
                    <p className="text-xs font-mono text-foreground break-all bg-secondary/20 p-2 rounded">
                      {address}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Corporations can use this to purchase your credits
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Buyer View */}
      {viewMode === "buyer" && (
        <>
          {/* Info Banner */}
          <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Purchase Verified Carbon Credits</h3>
                <p className="text-sm text-muted-foreground">
                  Support local farmers while offsetting your carbon footprint. All credits are verified 
                  on the blockchain and represent real CO₂ savings from organic waste processing.
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <form onSubmit={handleBuy} className="neomorph-card p-8 rounded-3xl bg-card border border-border space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Purchase Carbon Credits</h3>

            {/* Farmer Address */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Farmer Wallet Address *
              </label>
              <input
                type="text"
                required
                placeholder="0x..."
                value={buyForm.farmerAddress}
                onChange={(e) => setBuyForm({ ...buyForm, farmerAddress: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-500 neomorph-inset"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the wallet address of the farmer selling credits
              </p>
            </div>

            {/* Tons to Purchase */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tons of CO₂ to Purchase *
              </label>
              <input
                type="number"
                min="0.01"
                step="0.01"
                required
                value={buyForm.tons || ""}
                onChange={(e) => setBuyForm({ ...buyForm, tons: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 neomorph-inset"
                placeholder="0.00"
              />
            </div>

            {/* Price per Ton */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price per Ton (KES) *
              </label>
              <input
                type="number"
                min="1000"
                step="100"
                required
                value={buyForm.pricePerTon || ""}
                onChange={(e) => setBuyForm({ ...buyForm, pricePerTon: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 neomorph-inset"
                placeholder="10000"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Market rate: KES 8,000 - 15,000 per ton
              </p>
            </div>

            {/* Cost Summary */}
            {buyForm.tons > 0 && buyForm.pricePerTon > 0 && (
              <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
                <h4 className="font-semibold text-foreground mb-4">Purchase Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">CO₂ Credits</span>
                    <span className="text-sm font-semibold text-foreground">{buyForm.tons} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price per Ton</span>
                    <span className="text-sm font-semibold text-foreground">{formatKES(BigInt(buyForm.pricePerTon))}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between">
                    <span className="text-base font-semibold text-foreground">Total Cost</span>
                    <span className="text-xl font-bold text-green-500">{formatKES(BigInt(totalCost))}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Display */}
            {buyError && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {buyError.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || isConfirming || buyForm.tons <= 0 || !buyForm.farmerAddress}
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isPending ? "Confirm in Wallet..." : "Processing Purchase..."}
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Purchase {buyForm.tons > 0 ? `${buyForm.tons} tons for ${formatKES(BigInt(totalCost))}` : "Carbon Credits"}
                </>
              )}
            </button>
          </form>

          {/* Benefits of Carbon Credits */}
          <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-6">Why Purchase Carbon Credits?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Offset Emissions</h4>
                <p className="text-sm text-muted-foreground">
                  Neutralize your companys carbon footprint with verified offsets
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">ESG Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  Meet environmental, social, and governance reporting requirements
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Support Farmers</h4>
                <p className="text-sm text-muted-foreground">
                  Directly support local farmers while promoting sustainability
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}