"use client"

import { Coins, TrendingUp, Loader2, AlertCircle, ArrowUpRight, ArrowDownRight, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useAccount } from "wagmi"
import { useTokenBalance, useFarmerData, useWasteHistory } from "@/lib/hooks"
import { formatNumber, formatTokenBalance, formatTimestamp } from "@/lib/utils/contract"
import { contractAddress } from "@/lib/contracts/abi"

export default function BalancePage() {
  const { address, isConnected } = useAccount()
  const { balance, formattedBalance, isLoading: loadingBalance } = useTokenBalance()
  const { farmerImpact, isLoading: loadingImpact } = useFarmerData()
  const { wasteHistory, isLoading: loadingHistory } = useWasteHistory()
  const [copied, setCopied] = useState(false)

  // Calculate token transactions from history
  const tokenTransactions = wasteHistory?.map((collection, index) => {
    const tokens = Number(collection.kgCollected) / 10
    return {
      id: index,
      type: 'earned' as const,
      amount: tokens,
      source: 'Waste Processing',
      description: `${collection.wasteType} - ${formatNumber(collection.kgCollected)} kg`,
      timestamp: collection.timestamp,
    }
  }) || []

  // Add product claims if available
  const productTokens = farmerImpact && Number(farmerImpact.productKg) > 0 ? [{
    id: tokenTransactions.length,
    type: 'earned' as const,
    amount: Number(farmerImpact.productKg) / 10,
    source: 'Product Claim',
    description: `Organic product - ${formatNumber(farmerImpact.productKg)} kg`,
    timestamp: BigInt(0), // We don't have exact timestamp for product claims
  }] : []

  const allTransactions = [...tokenTransactions, ...productTokens].sort((a, b) => 
    Number(b.timestamp) - Number(a.timestamp)
  )

  // Copy contract address
  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Not connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
          <p className="text-muted-foreground">
            Please connect your wallet to view your balance
          </p>
        </div>
      </div>
    )
  }

  // Loading state
  if (loadingBalance || loadingImpact) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 text-accent animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your balance...</p>
        </div>
      </div>
    )
  }

  // Calculate USD value (example rate: 1 OWG = $1)
  const usdValue = Number(formattedBalance) * 1

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Token Balance</h1>
        <p className="text-muted-foreground">View your OWG token balance and transaction history</p>
      </div>

      {/* Balance Card */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
            <h2 className="text-5xl font-bold text-foreground mb-2">
              {formattedBalance || "0"} <span className="text-3xl text-green-500">OWG</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              ≈ ${usdValue.toFixed(2)} USD
            </p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <Coins className="w-10 h-10 text-green-500" />
          </div>
        </div>

        {/* Token Stats */}
        <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">From Waste Processing</p>
            <p className="text-2xl font-bold text-foreground">
              {farmerImpact ? formatNumber(BigInt(Math.floor(Number(farmerImpact.wasteKg) / 10))) : "0"} OWG
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">From Product Claims</p>
            <p className="text-2xl font-bold text-foreground">
              {farmerImpact ? formatNumber(BigInt(Math.floor(Number(farmerImpact.productKg) / 10))) : "0"} OWG
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-green-500">
              {formattedBalance || "0"} OWG
            </p>
          </div>
        </div>
      </div>

      {/* Token Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contract Info */}
        <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Token Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Token Name</span>
              <span className="text-sm font-semibold text-foreground">OrganicWasteGems</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Symbol</span>
              <span className="text-sm font-semibold text-foreground">OWG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Decimals</span>
              <span className="text-sm font-semibold text-foreground">9</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Network</span>
              <span className="text-sm font-semibold text-foreground">Moonbase Alpha</span>
            </div>
          </div>
        </div>

        {/* Earning Rate */}
        <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Earning Rate</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Waste Processing</span>
              <span className="text-sm font-semibold text-green-500">1 OWG per 10 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Product Claiming</span>
              <span className="text-sm font-semibold text-green-500">1 OWG per 10 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">CO₂ per kg</span>
              <span className="text-sm font-semibold text-emerald-500">400 grams</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Address */}
      <div className="neomorph-inset p-6 rounded-xl bg-secondary/10 border border-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
            <p className="text-sm font-mono text-foreground break-all">
              {contractAddress}
            </p>
          </div>
          <button
            onClick={copyAddress}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Transaction History</h3>
        {loadingHistory ? (
          <div className="text-center py-8">
            <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto" />
          </div>
        ) : allTransactions.length > 0 ? (
          <div className="space-y-3">
            {allTransactions.map((tx) => (
              <div
                key={tx.id}
                className="neomorph-inset p-4 rounded-xl bg-secondary/10 border border-border hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      tx.type === 'earned' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      {tx.type === 'earned' ? (
                        <ArrowDownRight className="w-5 h-5 text-green-500" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{tx.source}</p>
                      <p className="text-sm text-muted-foreground">{tx.description}</p>
                      {Number(tx.timestamp) > 0 && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatTimestamp(tx.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      tx.type === 'earned' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {tx.type === 'earned' ? '+' : '-'}{tx.amount.toFixed(1)} OWG
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Start processing waste to earn your first tokens!
            </p>
            <a
              href="/process"
              className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Process Waste
            </a>
          </div>
        )}
      </div>
    </div>
  )
}