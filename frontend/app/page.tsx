"use client"

import Link from "next/link"
import { ChevronRight, Leaf, Zap, Globe, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 lg:py-40 max-w-6xl mx-auto">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-accent border border-accent/30">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-medium">Waste-to-Earn Sustainability</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
            <span className="text-balance">Organic</span>
            <span className="block text-accent">Waste</span>
            <span className="text-balance">Gems</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Empowering farmers through waste-to-earn sustainability
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link
              href="/dashboard"
              className="neomorph-outset neomorph-hover px-8 py-4 rounded-2xl bg-accent text-accent-foreground font-semibold text-lg flex items-center gap-2 group"
            >
              Launch App
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="https://github.com/keyanureeves/OrganicWasteGems.git"
              target="_blank"
              rel="noopener noreferrer"
              className="neomorph-card neomorph-hover px-8 py-4 rounded-2xl bg-card text-foreground font-semibold text-lg border border-border"
            >
              View GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A transparent, decentralized system connecting farmers to value creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="neomorph-card p-8 rounded-3xl bg-card space-y-4">
              <div className="text-4xl font-bold text-accent">1</div>
              <h3 className="text-2xl font-bold text-foreground">Register as a Farmer</h3>
              <p className="text-muted-foreground leading-relaxed">
                Join our decentralized platform and verify your farm information. Get immediate access to processing
                tools and carbon tracking.
              </p>
            </div>

            <div className="neomorph-card p-8 rounded-3xl bg-card space-y-4">
              <div className="text-4xl font-bold text-accent">2</div>
              <h3 className="text-2xl font-bold text-foreground">Process Organic Waste</h3>
              <p className="text-muted-foreground leading-relaxed">
                Convert organic waste into value using sustainable methods. Each kilogram processed is tracked on-chain
                for transparency.
              </p>
            </div>

            <div className="neomorph-card p-8 rounded-3xl bg-card space-y-4">
              <div className="text-4xl font-bold text-accent">3</div>
              <h3 className="text-2xl font-bold text-foreground">Earn OWG Tokens</h3>
              <p className="text-muted-foreground leading-relaxed">
                Receive OWG tokens instantly for each processing milestone. Tokens reflect the real value created
                through waste processing.
              </p>
            </div>

            <div className="neomorph-card p-8 rounded-3xl bg-card space-y-4">
              <div className="text-4xl font-bold text-accent">4</div>
              <h3 className="text-2xl font-bold text-foreground">Sell Carbon Credits</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monetize CO₂ reduction through tokenized carbon credits. Trade on our marketplace and unlock additional
                revenue streams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Platform Features</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="neomorph-card neomorph-hover p-8 rounded-3xl bg-card space-y-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Tokenized Carbon Credits</h3>
              <p className="text-muted-foreground leading-relaxed">
                Convert verified CO₂ reductions into tradable tokens. Each credit represents real environmental impact
                with full transparency.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="neomorph-card neomorph-hover p-8 rounded-3xl bg-card space-y-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Waste-to-Earnings Model</h3>
              <p className="text-muted-foreground leading-relaxed">
                Turn agricultural waste into multiple revenue streams. Earn through processing, tokens, and carbon
                credit sales simultaneously.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="neomorph-card neomorph-hover p-8 rounded-3xl bg-card space-y-4 group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Transparent Impact Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                View real-time data on waste processed, emissions saved, and economic impact. Blockchain-verified
                metrics for complete trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="px-4 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Impact Metrics</h2>
            <p className="text-lg text-muted-foreground">Together, we are making a tangible difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="neomorph-outset p-8 rounded-3xl bg-gradient-to-br from-card to-card space-y-2 text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent">120+</div>
              <h3 className="text-xl font-semibold text-foreground">Registered Farmers</h3>
              <p className="text-muted-foreground">Growing network of sustainable producers</p>
            </div>

            {/* Stat 2 */}
            <div className="neomorph-outset p-8 rounded-3xl bg-gradient-to-br from-card to-card space-y-2 text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent">25K</div>
              <h3 className="text-xl font-semibold text-foreground">KG Waste Processed</h3>
              <p className="text-muted-foreground">Organic material converted to value</p>
            </div>

            {/* Stat 3 */}
            <div className="neomorph-outset p-8 rounded-3xl bg-gradient-to-br from-card to-card space-y-2 text-center">
              <div className="text-5xl md:text-6xl font-bold text-accent">10K</div>
              <h3 className="text-xl font-semibold text-foreground">KG CO₂ Saved</h3>
              <p className="text-muted-foreground">Environmental impact in emissions prevented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-16 md:py-20 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-2xl font-bold text-foreground">OWG</h3>
              <p className="text-muted-foreground text-sm">Empowering farmers through waste-to-earn sustainability</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-accent transition-colors">
                    Launch App
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 OrganicWasteGems. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}