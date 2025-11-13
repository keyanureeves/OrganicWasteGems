"use client"

import type React from "react"
import { useState } from "react"
import { Leaf, CheckCircle, AlertCircle } from "lucide-react"

export default function ProcessWastePage() {
  const [farmerAddress, setFarmerAddress] = useState("")
  const [wasteType, setWasteType] = useState("Organic")
  const [wasteQuantity, setWasteQuantity] = useState("")
  const [processingLocation, setProcessingLocation] = useState("")
  const [processingDate, setProcessingDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const wasteTypes = ["Organic", "Plastic", "Paper", "Metal", "Mixed"]

  const handleProcessWaste = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)

    console.log("[v0] Processing waste:", {
      farmerAddress,
      wasteType,
      wasteQuantity,
      processingLocation,
      processingDate,
    })

    setTimeout(() => {
      if (farmerAddress && wasteType && wasteQuantity && processingLocation && processingDate) {
        setFeedback({
          type: "success",
          message: `Successfully recorded ${wasteQuantity}kg of ${wasteType} waste at ${processingLocation}`,
        })
        // Reset form
        setFarmerAddress("")
        setWasteType("Organic")
        setWasteQuantity("")
        setProcessingLocation("")
        setProcessingDate("")
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Process Waste</h1>
        <p className="text-muted-foreground">Record organic waste collection and processing activities.</p>
      </div>

      {/* Process Waste Form Card */}
      <div className="max-w-2xl mx-auto">
        <div className="neomorph-outset p-8 rounded-3xl bg-card border border-border">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Log Waste Processing</h2>
              <p className="text-sm text-muted-foreground">Record processing event details</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleProcessWaste} className="space-y-6">
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

            {/* Waste Type Dropdown */}
            <div className="space-y-2">
              <label htmlFor="waste-type" className="block text-sm font-semibold text-foreground">
                Waste Type
              </label>
              <select
                id="waste-type"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
              >
                {wasteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Waste Quantity Input */}
            <div className="space-y-2">
              <label htmlFor="waste-quantity" className="block text-sm font-semibold text-foreground">
                Waste Quantity (kg)
              </label>
              <input
                id="waste-quantity"
                type="number"
                placeholder="250"
                min="0"
                step="0.1"
                value={wasteQuantity}
                onChange={(e) => setWasteQuantity(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground placeholder-muted-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
              />
            </div>

            {/* Processing Location Input */}
            <div className="space-y-2">
              <label htmlFor="processing-location" className="block text-sm font-semibold text-foreground">
                Processing Location
              </label>
              <input
                id="processing-location"
                type="text"
                placeholder="Central Processing Facility"
                value={processingLocation}
                onChange={(e) => setProcessingLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground placeholder-muted-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
              />
            </div>

            {/* Processing Date Input */}
            <div className="space-y-2">
              <label htmlFor="processing-date" className="block text-sm font-semibold text-foreground">
                Processing Date
              </label>
              <input
                id="processing-date"
                type="date"
                value={processingDate}
                onChange={(e) => setProcessingDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-input border border-border text-foreground neomorph-inset focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 rounded-2xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
            >
              <Leaf className="w-5 h-5" />
              {loading ? "Processing..." : "Log Waste Processing"}
            </button>
          </form>
        </div>

        {/* Feedback Area */}
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
              <span>Record each waste processing event with accurate details</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Processing data is verified and stored on-chain</span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Verified waste logs determine token rewards for farmers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
