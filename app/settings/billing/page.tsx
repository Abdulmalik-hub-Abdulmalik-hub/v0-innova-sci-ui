import Link from "next/link"
import { Check, CreditCard, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Pricing plans
const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "10 AI chat messages/day",
      "5 PDF uploads/month",
      "Basic simulations",
      "Community support",
    ],
    current: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited AI chat messages",
      "100 PDF uploads/month",
      "Advanced simulations",
      "Priority support",
      "API access",
    ],
    current: true,
  },
  {
    name: "Institution",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Unlimited uploads",
      "Custom AI training",
      "Dedicated support",
      "SSO & SAML",
    ],
    current: false,
  },
]

// Invoice history
const invoices = [
  { id: "INV-2024-003", date: "Mar 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-2024-002", date: "Feb 1, 2024", amount: "$29.00", status: "Paid" },
  { id: "INV-2024-001", date: "Jan 1, 2024", amount: "$29.00", status: "Paid" },
]

export default function BillingPage() {
  return (
    <DashboardLayout 
      title="Billing" 
      description="Manage your subscription and billing information."
    >
      {/* Current Plan */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              You are currently on the Pro plan.
            </p>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Pro
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-secondary p-4">
            <div className="text-sm text-muted-foreground">Monthly cost</div>
            <div className="mt-1 text-2xl font-bold text-foreground">$29</div>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <div className="text-sm text-muted-foreground">Next billing date</div>
            <div className="mt-1 text-2xl font-bold text-foreground">Apr 1, 2024</div>
          </div>
          <div className="rounded-lg bg-secondary p-4">
            <div className="text-sm text-muted-foreground">Usage this month</div>
            <div className="mt-1 text-2xl font-bold text-foreground">68%</div>
          </div>
        </div>
      </div>

      {/* Plans Comparison */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Available Plans</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 ${
                plan.current
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                {plan.current && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    Current
                  </span>
                )}
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {plan.current ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : plan.name === "Institution" ? (
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Sales
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button className="w-full">
                    {plan.name === "Free" ? "Downgrade" : "Upgrade"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
        <div className="mt-4 flex items-center justify-between rounded-lg border border-border p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <CreditCard className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <div className="font-medium text-foreground">Visa ending in 4242</div>
              <div className="text-sm text-muted-foreground">Expires 12/2025</div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Update
          </Button>
        </div>
      </div>

      {/* Invoice History */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">Invoice History</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Invoice</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border last:border-0">
                  <td className="py-4 text-sm font-medium text-foreground">{invoice.id}</td>
                  <td className="py-4 text-sm text-muted-foreground">{invoice.date}</td>
                  <td className="py-4 text-sm text-foreground">{invoice.amount}</td>
                  <td className="py-4">
                    <span className="rounded-full bg-chart-3/10 px-2 py-1 text-xs text-chart-3">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
