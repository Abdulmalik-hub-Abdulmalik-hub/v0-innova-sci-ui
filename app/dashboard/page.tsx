import Link from "next/link"
import { 
  MessageSquare, 
  FileText, 
  Beaker, 
  FolderOpen, 
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Stats data
const stats = [
  { label: "AI Chats", value: "124", change: "+12%", icon: MessageSquare },
  { label: "Papers Analyzed", value: "56", change: "+8%", icon: FileText },
  { label: "Simulations", value: "23", change: "+15%", icon: Beaker },
  { label: "Projects", value: "8", change: "+2%", icon: FolderOpen },
]

// Quick actions
const quickActions = [
  { 
    label: "Chat with Hakeem", 
    description: "Ask questions about your research",
    href: "/dashboard/chat", 
    icon: MessageSquare,
    color: "bg-primary/10 text-primary" 
  },
  { 
    label: "Upload Paper", 
    description: "Analyze a new research paper",
    href: "/dashboard/research", 
    icon: FileText,
    color: "bg-chart-2/10 text-chart-2" 
  },
  { 
    label: "Run Simulation", 
    description: "Chemistry and physics tools",
    href: "/dashboard/simulations", 
    icon: Beaker,
    color: "bg-chart-3/10 text-chart-3" 
  },
  { 
    label: "Open Workspace", 
    description: "Access your saved work",
    href: "/workspace", 
    icon: FolderOpen,
    color: "bg-chart-4/10 text-chart-4" 
  },
]

// Recent activity
const recentActivity = [
  { 
    action: "Chat with Hakeem", 
    detail: "Discussed quantum mechanics principles",
    time: "2 hours ago" 
  },
  { 
    action: "Paper analyzed", 
    detail: "Machine Learning in Drug Discovery.pdf",
    time: "5 hours ago" 
  },
  { 
    action: "Simulation completed", 
    detail: "Molecular dynamics simulation",
    time: "1 day ago" 
  },
  { 
    action: "Project created", 
    detail: "Protein Folding Research",
    time: "2 days ago" 
  },
  { 
    action: "Chat with Hakeem", 
    detail: "Reviewed statistical analysis methods",
    time: "3 days ago" 
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Welcome back! Here&apos;s an overview of your research activity."
    >
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center gap-1 text-xs text-chart-3">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.label}
                href={action.href}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground group-hover:text-primary transition-colors">
                  {action.label}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-secondary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{activity.action}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {activity.detail}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tips */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">AI Tips</h2>
          </div>
          <div className="mt-4 space-y-4">
            <div className="rounded-lg bg-primary/5 p-4">
              <h3 className="font-medium text-foreground">Try asking Hakeem</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                &quot;Summarize the key findings from my last uploaded paper&quot;
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-medium text-foreground">Research tip</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Upload multiple related papers to get cross-referenced insights.
              </p>
            </div>
            <div className="rounded-lg bg-secondary p-4">
              <h3 className="font-medium text-foreground">New feature</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Chemistry simulations now support molecular visualization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
