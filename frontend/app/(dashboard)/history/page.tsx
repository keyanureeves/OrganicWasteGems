"use client"

import { useState } from "react"
import { History, Leaf, Coins, Package, Loader2, AlertCircle, Filter, Search, Calendar, TrendingUp } from "lucide-react"
import { useAccount } from "wagmi"
import { useWasteHistory, useFarmerData } from "@/lib/hooks"
import { formatNumber, formatKES, formatTimestamp, gramsToKg } from "@/lib/utils/contract"

type FilterType = "all" | "waste" | "product"

export default function HistoryPage() {
  const { address, isConnected } = useAccount()
  const { wasteHistory, isLoading: loadingHistory } = useWasteHistory()
  const { farmerImpact, isLoading: loadingImpact } = useFarmerData()
  
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to view your history
          </p>
        </div>
      </div>
    )
  }

  // Loading state
  if (loadingHistory || loadingImpact) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-accent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your history...</p>
        </div>
      </div>
    )
  }

  // Calculate totals
  const totalWasteCollections = wasteHistory?.length || 0
  const totalWasteKg = farmerImpact ? Number(farmerImpact.wasteKg) : 0
  const totalProductKg = farmerImpact ? Number(farmerImpact.productKg) : 0
  const totalCO2Saved = farmerImpact ? Number(farmerImpact.co2Grams) : 0
  const totalTokens = farmerImpact ? Number(farmerImpact.tokens) : 0

  // Filter and search
  const filteredHistory = wasteHistory?.filter((collection) => {
    const matchesSearch = collection.wasteType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  }) || []

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Activity History</h1>
        <p className="text-muted-foreground">Complete record of all your waste processing activities</p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Total Collections */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <History className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Collections</p>
          <p className="text-3xl font-bold text-foreground">{totalWasteCollections}</p>
        </div>

        {/* Total Waste */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Waste</p>
          <p className="text-3xl font-bold text-foreground">{formatNumber(BigInt(totalWasteKg))}</p>
          <p className="text-xs text-muted-foreground">kilograms</p>
        </div>

        {/* Total Product */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Product</p>
          <p className="text-3xl font-bold text-foreground">{formatNumber(BigInt(totalProductKg))}</p>
          <p className="text-xs text-muted-foreground">kilograms</p>
        </div>

        {/* Total Tokens */}
        <div className="neomorph-outset p-6 rounded-2xl bg-card">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Tokens</p>
          <p className="text-3xl font-bold text-foreground">{(totalTokens / 1000000000).toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">OWG earned</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by waste type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent neomorph-inset"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filter === "all"
                  ? "bg-accent text-accent-foreground neomorph-outset"
                  : "bg-secondary text-secondary-foreground neomorph-inset"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("waste")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filter === "waste"
                  ? "bg-accent text-accent-foreground neomorph-outset"
                  : "bg-secondary text-secondary-foreground neomorph-inset"
              }`}
            >
              <Leaf className="w-5 h-5" />
            </button>
            <button
              onClick={() => setFilter("product")}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filter === "product"
                  ? "bg-accent text-accent-foreground neomorph-outset"
                  : "bg-secondary text-secondary-foreground neomorph-inset"
              }`}
            >
              <Package className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Calendar className="w-6 h-6 text-accent" />
            Activity Timeline
          </h3>
          <p className="text-sm text-muted-foreground">
            {filteredHistory.length} {filteredHistory.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="space-y-4">
            {filteredHistory.map((collection, index) => {
              const tokens = Math.floor(Number(collection.kgCollected) / 10)
              const co2 = Number(collection.kgCollected) * 0.4

              return (
                <div
                  key={index}
                  className="relative neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border hover:bg-secondary/20 transition-all duration-200"
                >
                  {/* Timeline Connector */}
                  {index !== filteredHistory.length - 1 && (
                    <div className="absolute left-9 top-20 w-0.5 h-8 bg-border"></div>
                  )}

                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-6 h-6 text-accent" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">
                            {collection.wasteType}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {formatTimestamp(collection.timestamp)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Waste Collected</p>
                          <p className="text-2xl font-bold text-accent">
                            {formatNumber(collection.kgCollected)} kg
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Tokens Earned</p>
                          <p className="text-lg font-bold text-accent">{tokens} OWG</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">CO₂ Saved</p>
                          <p className="text-lg font-bold text-green-500">{co2.toFixed(1)} kg</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Workers</p>
                          <p className="text-lg font-bold text-foreground">
                            {formatNumber(collection.workersInvolved)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Payment</p>
                          <p className="text-lg font-bold text-foreground">
                            {formatKES(collection.workersPaymentKES)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            {searchTerm ? (
              <>
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No results found for &quot;{searchTerm}&quot;</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <History className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground mb-2">No activity history yet</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Start processing waste to build your activity timeline
                </p>
                <a
                  href="/process"
                  className="inline-block px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200"
                >
                  Process Waste
                </a>
              </>
            )}
          </div>
        )}
      </div>

      {/* Environmental Impact Summary */}
      {totalWasteCollections > 0 && (
        <div className="neomorph-card p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-accent/10 border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Environmental Impact</h3>
              <p className="text-sm text-muted-foreground">Your total contribution to sustainability</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="neomorph-inset p-4 rounded-xl bg-background/50">
              <p className="text-sm text-muted-foreground mb-2">Waste Diverted</p>
              <p className="text-3xl font-bold text-foreground mb-1">
                {formatNumber(BigInt(totalWasteKg))} kg
              </p>
              <p className="text-xs text-green-500">
                Prevented from landfill
              </p>
            </div>

            <div className="neomorph-inset p-4 rounded-xl bg-background/50">
              <p className="text-sm text-muted-foreground mb-2">CO₂ Offset</p>
              <p className="text-3xl font-bold text-green-500 mb-1">
                {gramsToKg(BigInt(totalCO2Saved))} kg
              </p>
              <p className="text-xs text-green-500">
                Carbon emissions saved
              </p>
            </div>

            <div className="neomorph-inset p-4 rounded-xl bg-background/50">
              <p className="text-sm text-muted-foreground mb-2">Product Created</p>
              <p className="text-3xl font-bold text-accent mb-1">
                {formatNumber(BigInt(totalProductKg))} kg
              </p>
              <p className="text-xs text-accent">
                Organic fertilizer produced
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}