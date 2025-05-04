import Link from "next/link"
import { ArrowRight, Github, Mail, Shield, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./components/theme-toggle"
import { ParticleBackground } from "./components/particle-background"
import { FeatureCard } from "./components/feature-card"
import { StepCard } from "./components/step-card"
import { TeamMember } from "./components/team-member"
import { ConnectWalletButton } from "./components/connect-wallet-button"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <ParticleBackground />

      {/* Navbar */}
      <header className="container z-10 mx-auto flex items-center justify-between p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-green-700 p-[2px]">
            <div className="h-full w-full rounded-full bg-background"></div>
          </div>
          <span className="text-xl font-bold">BlockCircle</span>
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm font-medium hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#team" className="text-sm font-medium hover:text-primary">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
          <ConnectWalletButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container relative z-10 mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(1,206,141,0.15),transparent_50%)]"></div>
        <h1 className="mb-6 max-w-4xl bg-gradient-to-r from-green-400 via-green-500 to-green-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Revolutionizing Community Finance with Web3 & zkProofs
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
          Create trustless financial circles, contribute monthly, win through auctions, and build a reputation economy.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-green-600 to-green-800 px-8"
          >
            <Link href="/dashboard">
              Start a Circle
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <ConnectWalletButton variant="outline" size="lg" className="rounded-full px-8 bg-black" />
        </div>

        {/* Animated nodes background */}
        <div className="absolute inset-0 -z-20 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            <g className="nodes"></g>
            <g className="links"></g>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container relative z-10 mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            BlockCircle makes community finance simple, transparent, and rewarding.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <StepCard
            number={1}
            title="Create or Join a BlockCircle Pool"
            description="Start your own circle or join an existing one with verified members."
            icon={Users}
          />
          <StepCard
            number={2}
            title="Contribute Monthly"
            description="Make regular contributions to the pool using stablecoins."
            icon={Wallet}
          />
          <StepCard
            number={3}
            title="Bid with Reputation or Collateral"
            description="Participate in auctions to win the pool based on your needs."
            icon={Shield}
          />
          <StepCard
            number={4}
            title="Repeat & Build Reputation"
            description="Continue participating to build your on-chain reputation score."
            icon={ArrowRight}
          />
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="container relative z-10 mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Core Features</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Powered by cutting-edge blockchain technology for maximum security and transparency.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="zk-KYC with Reclaim Protocol"
            description="Verify your identity privately using zero-knowledge proofs."
            gradient="from-green-500 to-green-700"
          />
          <FeatureCard
            title="Auction & Lottery-based Allocations"
            description="Fair distribution mechanisms for pool allocations."
            gradient="from-green-400 to-green-600"
          />
          <FeatureCard
            title="Stablecoin Escrow & Trustless Payouts"
            description="Secure fund management with smart contract guarantees."
            gradient="from-green-400 to-green-600"
          />
          <FeatureCard
            title="Contribution Tracking + Reputation Scoring"
            description="Build your financial reputation with each contribution."
            gradient="from-green-500 to-green-700"
          />
          <FeatureCard
            title="Multi-cycle Reward Systems"
            description="Earn rewards for consistent participation across cycles."
            gradient="from-green-500 to-green-700"
          />
          <FeatureCard
            title="Transparent ROSCA Logic"
            description="Clear and auditable rotating savings and credit association rules."
            gradient="from-green-500 to-green-700"
          />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="container relative z-10 mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">Meet the visionaries behind BlockCircle.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          <TeamMember name="Rythme" role="Blockchain Architect" imageUrl="/placeholder.svg?height=200&width=200" />
          <TeamMember name="Swarna" role="Protocol Engineer" imageUrl="/placeholder.svg?height=200&width=200" />
          <TeamMember name="Eshan" role="Frontend Developer" imageUrl="/placeholder.svg?height=200&width=200" />
        </div>
      </section>

      {/* Footer */}
      <footer className="container relative z-10 mx-auto border-t border-border/40 px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-green-700 p-[2px]">
                <div className="h-full w-full rounded-full bg-background"></div>
              </div>
              <span className="text-lg font-bold">BlockCircle</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Decentralized financial coordination protocol powered by the Pharos Network.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Github className="h-4 w-4" /> GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Smart Contracts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Telegram
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <Mail className="h-4 w-4" /> Newsletter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Connect</h3>
            <div className="flex flex-col gap-2">
              <ConnectWalletButton variant="outline" size="sm" />
              <div className="text-xs text-muted-foreground">
                Wallet Status: <span className="text-red-500">Not Connected</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BlockCircle. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
