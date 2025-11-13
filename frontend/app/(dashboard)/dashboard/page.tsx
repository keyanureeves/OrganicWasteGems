"use client"

import { Leaf, Zap, TrendingUp } from "lucide-react"

export default function DashboardPage() {
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
              <p className="text-4xl font-bold text-foreground mt-2">2,847 kg</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <Leaf className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-accent font-semibold">+312 kg this month</p>
          </div>
        </div>

        {/* CO2 Saved */}
        <div className="neomorph-outset p-8 rounded-3xl bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">CO₂ Saved</p>
              <p className="text-4xl font-bold text-foreground mt-2">856 kg</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <Zap className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-accent font-semibold">+89 kg this month</p>
          </div>
        </div>

        {/* Tokens Earned */}
        <div className="neomorph-outset p-8 rounded-3xl bg-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Tokens Earned</p>
              <p className="text-4xl font-bold text-foreground mt-2">12,450</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-accent" />
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-accent font-semibold">+1,240 this month</p>
          </div>
        </div>
      </div>

      {/* Action Panel */}
      <div className="neomorph-card p-8 rounded-3xl bg-card border border-border">
        <div className="text-center space-y-4 py-12">
          <h2 className="text-2xl font-bold text-foreground">Action Panel</h2>
          <p className="text-muted-foreground">
            Smart contract interactions and waste processing forms will appear here
          </p>
          <div className="pt-4">
            <button className="px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold neomorph-outset neomorph-hover transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
