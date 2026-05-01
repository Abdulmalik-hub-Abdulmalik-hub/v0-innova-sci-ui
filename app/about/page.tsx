import Link from "next/link"
import { ArrowRight, Target, Lightbulb, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

// Team members data
const team = [
  {
    name: "Dr. Sarah Chen",
    role: "CEO & Co-founder",
    bio: "Former MIT researcher with 15 years in computational biology.",
  },
  {
    name: "James Rodriguez",
    role: "CTO & Co-founder",
    bio: "Ex-Google AI researcher, specializing in NLP and machine learning.",
  },
  {
    name: "Dr. Emily Watson",
    role: "Chief Science Officer",
    bio: "PhD in Physics from Stanford, expert in quantum simulations.",
  },
  {
    name: "Michael Park",
    role: "VP of Engineering",
    bio: "Built scalable systems at AWS and Stripe.",
  },
]

// Values data
const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We&apos;re committed to democratizing access to AI-powered research tools.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We constantly push the boundaries of what&apos;s possible in scientific AI.",
  },
  {
    icon: Users,
    title: "Researcher-Centric",
    description: "Every feature we build starts with understanding researcher needs.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We serve researchers from over 100 countries worldwide.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
              Transforming scientific research with AI
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              InnovaSci AI Labs was founded in 2023 with a simple mission: make AI-powered 
              research tools accessible to every scientist, regardless of their technical background.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="border-y border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground text-balance">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  The idea for InnovaSci was born in a research lab at MIT, where our founders 
                  experienced firsthand the frustrations of manual literature reviews and 
                  complex data analysis.
                </p>
                <p>
                  They envisioned a future where AI could handle the tedious parts of research, 
                  freeing scientists to focus on what truly matters: discovery and innovation.
                </p>
                <p>
                  Today, InnovaSci serves over 50,000 researchers worldwide, helping them 
                  analyze millions of papers and run thousands of simulations every month.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">2023</div>
                  <div className="mt-1 text-sm text-muted-foreground">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">50K+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Researchers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">100+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">$15M</div>
                  <div className="mt-1 text-sm text-muted-foreground">Funding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Our Values
          </h2>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Meet Our Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            A diverse team of researchers, engineers, and designers working to transform scientific research.
          </p>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-border bg-background p-6 text-center"
              >
                <div className="mx-auto h-20 w-20 rounded-full bg-primary/10" />
                <h3 className="mt-4 font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground text-balance">
            Join us in transforming research
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you&apos;re a researcher or want to join our team, we&apos;d love to hear from you.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/signup">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
