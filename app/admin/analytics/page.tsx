import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  FileText,
  DollarSign,
  ArrowUpRight,
  BarChart3
} from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"

// Analytics cards
const analyticsCards = [
  {
    title: "Total Revenue",
    value: "$124,563",
    change: "+12.5%",
    period: "vs last month",
    icon: DollarSign,
  },
  {
    title: "New Users",
    value: "2,345",
    change: "+8.2%",
    period: "vs last month",
    icon: Users,
  },
  {
    title: "AI Conversations",
    value: "89,432",
    change: "+23.1%",
    period: "vs last month",
    icon: MessageSquare,
  },
  {
    title: "Papers Analyzed",
    value: "12,567",
    change: "+15.8%",
    period: "vs last month",
    icon: FileText,
  },
]

// Chart data simulation
const monthlyData = [
  { month: "Jan", users: 8500, revenue: 95000 },
  { month: "Feb", users: 9200, revenue: 102000 },
  { month: "Mar", users: 10100, revenue: 108000 },
  { month: "Apr", users: 10800, revenue: 112000 },
  { month: "May", users: 11500, revenue: 118000 },
  { month: "Jun", users: 12456, revenue: 124563 },
]

// Top features
const topFeatures = [
  { name: "AI Chat (Hakeem)", usage: "45%", count: "40,234" },
  { name: "Paper Analysis", usage: "28%", count: "25,012" },
  { name: "Simulations", usage: "18%", count: "16,078" },
  { name: "Workspace", usage: "9%", count: "8,034" },
]

// Geographic distribution
const geoDistribution = [
  { region: "North America", percentage: 42 },
  { region: "Europe", percentage: 31 },
  { region: "Asia", percentage: 18 },
  { region: "Other", percentage: 9 },
]

export default function AdminAnalyticsPage() {
  const maxUsers = Math.max(...monthlyData.map(d => d.users))

  return (
    <AdminLayout 
      title="Analytics" 
      description="Platform metrics and insights."
    >
      {/* Analytics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map((card) => {
          const Icon = card.icon
          return (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-xs text-chart-3">
                  <ArrowUpRight className="h-3 w-3" />
                  {card.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                <div className="text-sm text-muted-foreground">{card.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{card.period}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">User Growth</h3>
              <p className="text-sm text-muted-foreground">Monthly active users</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-3" />
              <span className="text-sm text-chart-3">+12.5%</span>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="mt-6">
            <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
              {monthlyData.map((data) => (
                <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex-1">
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-primary transition-all"
                      style={{ height: `${(data.users / maxUsers) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Revenue</h3>
              <p className="text-sm text-muted-foreground">Monthly recurring revenue</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-chart-3" />
              <span className="text-sm text-chart-3">+8.2%</span>
            </div>
          </div>

          {/* Simple Line Chart Visualization */}
          <div className="mt-6">
            <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex-1">
                    <div
                      className="absolute bottom-0 w-full rounded-t bg-chart-2 transition-all"
                      style={{ height: `${(data.revenue / 125000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Top Features */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Top Features</h3>
          <p className="text-sm text-muted-foreground">Usage distribution</p>

          <div className="mt-6 space-y-4">
            {topFeatures.map((feature) => (
              <div key={feature.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{feature.name}</span>
                  <span className="text-muted-foreground">{feature.count} uses</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: feature.usage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground">Geographic Distribution</h3>
          <p className="text-sm text-muted-foreground">Users by region</p>

          <div className="mt-6 space-y-4">
            {geoDistribution.map((geo, index) => (
              <div key={geo.region} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: [
                        "var(--primary)",
                        "var(--chart-2)",
                        "var(--chart-3)",
                        "var(--chart-4)",
                      ][index],
                    }}
                  />
                  <span className="text-sm text-foreground">{geo.region}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{geo.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Simple Pie Chart Visualization */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border-8 border-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-6 w-6 text-primary" />
                  <span className="text-xs text-muted-foreground">12.4K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
