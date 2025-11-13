"use client"

import type React from "react"
import { useState } from "react"
import { Menu, X, Home, Coins, Leaf, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setMobileOpen] = useState(false)
  const { address, isConnected } = useAccount()

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Coins, label: "Mint Tokens", href: "/mint" },
    { icon: Leaf, label: "Process Waste", href: "/process" },
    { icon: TrendingUp, label: "Balance", href: "/balance" },
    { icon: User, label: "Profile", href: "/profile" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border neomorph-card transition-all duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-2xl font-bold text-accent flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              OWG
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Waste-to-Earn</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all duration-200 neomorph-hover"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* RainbowKit Connect Button - Simplified */}
          <div className="mt-4">
            <ConnectButton 
              accountStatus="address"
              chainStatus="icon"
              showBalance={false}
            />
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="md:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border neomorph-card">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-secondary/20 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Spacer for mobile */}
            <div className="flex-1 md:hidden" />

            {/* Wallet info and profile */}
            <div className="flex items-center gap-4">
              {isConnected && address ? (
                <>
                  <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground">Connected Wallet</p>
                    <p className="font-mono font-semibold text-foreground">
                      {`${address.slice(0, 6)}...${address.slice(-4)}`}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 neomorph-inset flex items-center justify-center">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                </>
              ) : (
                <div className="text-right hidden md:block">
                  <p className="text-sm text-muted-foreground">Not Connected</p>
                  <p className="font-semibold text-foreground">Connect your wallet</p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}