"use client"

import type React from "react"

import { useState } from "react"
import { Coins, CheckCircle, AlertCircle } from "lucide-react"

export default function MintPage() {
  const [farmerAddress, setFarmerAddress] = useState("")
  const [wasteAmount, setWasteAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    // Simulate smart contract call
    console.log("[v0] Minting tokens for:", { farmerAddress, wasteAmount })

    setTimeout(() => {
      if (farmerAddress && wasteAmount) {
        const tokensToMint = Math.floor(Number.parseFloat(wasteAmount) * 4.5)
        setFeedback({
          type: "success",
          message: `Successfully minted ${tokensToMint} OWG tokens for ${farmerAddress.slice(0, 6)}...${farmerAddress.slice(-4)}`,
        })
        setFarmerAddress("")
        setWasteAmount("")
      } else {
        setFeedback({
          type: "error",
          message: "Please fill in all fields",
        })
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Mint Tokens</h1>
        <p className="text-muted-foreground">Reward farmers for processed waste by minting OWG tokens.</p>
      </div>

      {/* Mint Form Card */}
      <div className="max-w-2xl mx-auto">
        <div className="neomorph-outset p-8 rounded-3xl bg-card border border-border">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Token Minting</h2>
              <p className="text-sm text-muted-foreground">Enter farmer details to mint tokens</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleMint} className="space-y-6">
            {/* Farmer Address Input */}
            <div className="space-y-2">
              <label htmlFor="farmer-address" className="block text-sm font-semibold text-foreground">
                Farmer Address
              </label>
              <input
                id="farmer-address"
                type="text"
                placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f42e11"
                value={farmerAddress}
                onChange={(e) => setFarmerAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground placeholder-muted-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
              />
            </div>

            {/* Waste Amount Input */}
            <div className="space-y-2">
              <label htmlFor="waste-amount" className="block text-sm font-semibold text-foreground">
                Amount of Waste Processed (KG)
              </label>
              <input
                id="waste-amount"
                type="number"
                placeholder="250"
                min="0"
                step="0.1"
                value={wasteAmount}
                onChange={(e) => setWasteAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground placeholder-muted-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {wasteAmount ? `Estimated tokens: ${Math.floor(Number.parseFloat(wasteAmount) * 4.5)} OWG` : ""}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-2xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
            >
              <Coins className="w-5 h-5" />
              {loading ? "Minting..." : "Mint Tokens"}
            </button>
          </form>
        </div>

        {/* Transaction Feedback Area */}
        {feedback && (
          <div
            className={`mt-6 p-6 rounded-2xl neomorph-card border flex items-start gap-4 ${
              feedback.type === "success"
                ? "bg-green-50/20 border-green-200/30 text-green-800"
                : "bg-red-50/20 border-red-200/30 text-red-800"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{feedback.type === "success" ? "Success!" : "Error"}</p>
              <p className="text-sm mt-1">{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-6 rounded-2xl bg-secondary/5 border border-secondary/20 neomorph-card">
          <h3 className="font-semibold text-foreground mb-3">How it works</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Each kilogram of waste processed = 4.5 OWG tokens</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Tokens are minted instantly after verification</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Farmers receive tokens in their connected wallet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
