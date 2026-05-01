import Link from "next/link"
import { 
  ArrowRight, 
  MessageSquare, 
  FileSearch, 
  Beaker, 
  Sparkles,
  CheckCircle,
  Users,
  Zap,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { NewsletterForm } from "@/components/newsletter/newsletter-form"

// Feature cards data
const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Assistant",
    description: "Meet Hakeem, your intelligent research companion that understands scientific context and provides accurate insights.",
  },
  {
    icon: FileSearch,
    title: "Research Engine",
    description: "Upload PDFs and research papers. Our AI extracts key insights, summaries, and actionable data.",
  },
  {
    icon: Beaker,
    title: "Simulation Tools",
    description: "Run chemistry and physics simulations with our powerful computational engine.",
  },
  {
    icon: Sparkles,
    title: "Smart Workspace",
    description: "Organize your research, save chats, and manage projects all in one intelligent workspace.",
  },
]

// Stats data
const stats = [
  { value: "50K+", label: "Researchers" },
  { value: "1M+", label: "Papers Analyzed" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "AI Support" },
]

// Benefits data
const benefits = [
  "AI-powered research assistance",
  "Instant paper analysis",
  "Chemistry & physics simulations",
  "Collaborative workspace",
  "Secure data handling",
  "Export to any format",
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-50" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Powered by Advanced AI</span>
            </div>
            
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl text-balance">
              Accelerate Your
              <span className="block text-primary">Scientific Research</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-balance">
              InnovaSci AI Labs is the end-to-end platform for building world-class research. 
              Chat with Hakeem, analyze papers instantly, and run powerful simulations.
            </p>
            
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/auth/signup">
                <Button size="lg" className="h-12 px-8">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard/chat">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Chat with Hakeem
                </Button>
              </Link>
            </div>
          </div>

          {/* Trusted By Section */}
          <div className="mt-20">
            <p className="text-center text-sm text-muted-foreground uppercase tracking-wider">
              Trusted by research teams at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["Stanford", "MIT", "Oxford", "Cambridge", "Harvard"].map((uni) => (
                <span key={uni} className="text-lg font-semibold text-foreground">
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Everything you need for modern research
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              From AI-powered chat to simulation tools, InnovaSci provides all the tools 
              researchers need to accelerate discoveries.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-border bg-card py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
                Built for researchers, by researchers
              </h2>
              <p className="mt-4 text-muted-foreground">
                We understand the challenges of modern scientific research. That&apos;s why we built 
                InnovaSci with features that actually matter.
              </p>
              
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/auth/signup">
                  <Button>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6">
                <Users className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">Collaborative</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Work together with your team in real-time on any project.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">Lightning Fast</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get instant results with our optimized AI infrastructure.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-6 sm:col-span-2">
                <Shield className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">Enterprise Security</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  SOC 2 compliant with end-to-end encryption for your sensitive research data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Get AI Science Tips
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join our newsletter for the latest in AI-powered research, tips, and product updates.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Ready to transform your research?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Join thousands of researchers already using InnovaSci AI Labs to accelerate their discoveries.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
