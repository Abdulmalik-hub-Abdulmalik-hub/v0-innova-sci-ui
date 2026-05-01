import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

// Pricing plans data
const plans = [
  {
    name: "Free",
    description: "Perfect for individual researchers getting started.",
    price: "$0",
    period: "forever",
    features: [
      "10 AI chat messages/day",
      "5 PDF uploads/month",
      "Basic simulations",
      "Community support",
      "1 project",
    ],
    cta: "Get Started",
    href: "/auth/signup",
    popular: false,
  },
  {
    name: "Pro",
    description: "For researchers who need more power and flexibility.",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited AI chat messages",
      "100 PDF uploads/month",
      "Advanced simulations",
      "Priority support",
      "Unlimited projects",
      "Team collaboration",
      "API access",
      "Export to all formats",
    ],
    cta: "Start Free Trial",
    href: "/auth/signup?plan=pro",
    popular: true,
  },
  {
    name: "Institution",
    description: "For research teams and institutions with advanced needs.",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Unlimited PDF uploads",
      "Custom AI training",
      "Dedicated support",
      "SSO & SAML",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
]

// FAQ data
const faqs = [
  {
    question: "Can I try Pro features for free?",
    answer: "Yes! All Pro plans come with a 14-day free trial. No credit card required.",
  },
  {
    question: "What happens when I reach my upload limit?",
    answer: "You'll receive a notification and can upgrade your plan or wait until the next billing cycle.",
  },
  {
    question: "Can I switch plans anytime?",
    answer: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
  },
  {
    question: "Do you offer academic discounts?",
    answer: "Yes! We offer 50% off for verified academic institutions. Contact us for more details.",
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your research needs. All plans include core features.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border bg-card p-8 ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/10"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href={plan.href} className="block">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          
          <div className="mt-12 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
