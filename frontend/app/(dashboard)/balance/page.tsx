"use client"

import { Send, TrendingUp, Lock, Copy, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import { useState } from "react"

export default function BalancePage() {
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc9e7595f42e11")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f42e11"
  const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: "received",
      amount: 500,
      description: "Tokens minted for waste processing",
      date: "2025-01-12",
      hash: "0x1a2b...",
    },
    {
      id: 2,
      type: "sent",
      amount: 100,
      description: "Transfer to farming cooperative",
      date: "2025-01-10",
      hash: "0x3c4d...",
    },
    {
      id: 3,
      type: "received",
      amount: 350,
      description: "Monthly waste reward distribution",
      date: "2025-01-08",
      hash: "0x5e6f...",
    },
    {
      id: 4,
      type: "received",
      amount: 200,
      description: "Tokens minted for waste processing",
      date: "2025-01-05",
      hash: "0x7g8h...",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Balance</h1>
        <p className="text-muted-foreground">View your wallet balance and transaction history.</p>
      </div>

      {/* Main Balance Card */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Balance Overview */}
        <div className="lg:col-span-2 space-y-6">
          {/* OWG Balance */}
          <div className="neomorph-outset p-8 rounded-3xl bg-card border border-border">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground font-medium">OWG Token Balance</p>
                <h2 className="text-5xl font-bold text-accent mt-2">12,450.50</h2>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="px-6 py-3 rounded-2xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Send Tokens
              </button>
              <button className="px-6 py-3 rounded-2xl bg-secondary/10 text-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 flex items-center justify-center gap-2 border border-border">
                <Lock className="w-5 h-5" />
                Stake Tokens
              </button>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="neomorph-card p-6 rounded-3xl bg-card border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Wallet Address</p>
                <p className="font-mono text-lg font-semibold text-foreground mt-2">{walletAddress}</p>
              </div>
              <button
                onClick={copyAddress}
                className="p-3 rounded-xl hover:bg-secondary/10 transition-colors"
                title="Copy address"
              >
                <Copy className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
              </button>
            </div>
            {copied && <p className="text-sm text-accent mt-3 font-medium">Copied to clipboard!</p>}
          </div>

          {/* On-Chain Stats */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Gas Used */}
            <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground font-medium">Total Gas Used</p>
              <p className="text-3xl font-bold text-foreground mt-2">0.0847 ETH</p>
              <p className="text-xs text-muted-foreground mt-2">~$157.30 USD</p>
            </div>

            {/* Network */}
            <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted-foreground font-medium">Network</p>
              <p className="text-3xl font-bold text-accent mt-2">Polygon</p>
              <p className="text-xs text-muted-foreground mt-2">Chain ID: 137</p>
            </div>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="space-y-4">
          {/* Total Transactions */}
          <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground font-medium">Total Transactions</p>
            <p className="text-4xl font-bold text-foreground mt-3">128</p>
          </div>

          {/* 30-Day Change */}
          <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground font-medium">30-Day Change</p>
            <p className="text-3xl font-bold text-accent mt-3">+2,450</p>
            <p className="text-xs text-accent mt-2 font-medium">+24.5%</p>
          </div>

          {/* Account Status */}
          <div className="neomorph-card p-6 rounded-2xl bg-card border border-border">
            <p className="text-sm text-muted-foreground font-medium">Account Status</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <p className="font-semibold text-foreground">Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent Transactions</h2>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-secondary/5 border border-secondary/20 hover:bg-secondary/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-xl ${tx.type === "received" ? "bg-green-100/20 text-green-600" : "bg-blue-100/20 text-blue-600"}`}
                >
                  {tx.type === "received" ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{tx.description}</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.type === "received" ? "text-green-600" : "text-blue-600"}`}>
                  {tx.type === "received" ? "+" : "-"}
                  {tx.amount} OWG
                </p>
                <p className="text-xs text-muted-foreground font-mono">{tx.hash}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 px-6 py-3 rounded-2xl text-accent font-semibold hover:bg-secondary/5 transition-colors border border-accent/20">
          View All Transactions
        </button>
      </div>
    </div>
  )
}
