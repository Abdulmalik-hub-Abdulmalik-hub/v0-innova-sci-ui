import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { AdminLayout } from "@/components/layout/admin-layout"

// Admin stats
const stats = [
  { 
    label: "Total Users", 
    value: "12,456", 
    change: "+12%", 
    trend: "up",
    icon: Users,
    description: "vs last month"
  },
  { 
    label: "Active Sessions", 
    value: "1,234", 
    change: "+8%", 
    trend: "up",
    icon: Activity,
    description: "currently active"
  },
  { 
    label: "AI Conversations", 
    value: "45,678", 
    change: "+23%", 
    trend: "up",
    icon: MessageSquare,
    description: "this month"
  },
  { 
    label: "Monthly Revenue", 
    value: "$89,432", 
    change: "-3%", 
    trend: "down",
    icon: DollarSign,
    description: "vs last month"
  },
]

// Recent activity
const recentActivity = [
  { user: "john@university.edu", action: "Signed up", time: "2 min ago" },
  { user: "sarah@research.org", action: "Upgraded to Pro", time: "15 min ago" },
  { user: "mike@lab.com", action: "Uploaded paper", time: "32 min ago" },
  { user: "emma@science.edu", action: "Started simulation", time: "1 hour ago" },
  { user: "david@institute.org", action: "Chat with Hakeem", time: "2 hours ago" },
]

// Top users
const topUsers = [
  { name: "Dr. Sarah Chen", email: "sarah@mit.edu", chats: 156, papers: 42 },
  { name: "James Rodriguez", email: "james@stanford.edu", chats: 134, papers: 38 },
  { name: "Dr. Emily Watson", email: "emily@oxford.edu", chats: 128, papers: 35 },
  { name: "Michael Park", email: "michael@harvard.edu", chats: 112, papers: 29 },
]

export default function AdminDashboardPage() {
  return (
    <AdminLayout 
      title="Admin Dashboard" 
      description="Overview of platform metrics and activity."
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
                <div className={`flex items-center gap-1 text-xs ${
                  stat.trend === "up" ? "text-chart-3" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.description}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="font-semibold text-foreground">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{activity.user}</div>
                    <div className="text-sm text-muted-foreground">{activity.action}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Growth Chart Placeholder */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">User Growth</h3>
            <div className="mt-4 flex items-end gap-2">
              {[40, 55, 45, 65, 75, 60, 80].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-primary/20"
                  style={{ height: `${height}px` }}
                >
                  <div
                    className="w-full rounded-t bg-primary"
                    style={{ height: `${height * 0.6}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-chart-3" />
              <span className="text-sm text-chart-3">+12% this week</span>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Platform Stats</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Papers Analyzed</span>
                <span className="font-medium text-foreground">1.2M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Simulations Run</span>
                <span className="font-medium text-foreground">456K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">AI Messages</span>
                <span className="font-medium text-foreground">8.9M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Session</span>
                <span className="font-medium text-foreground">24 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Users Table */}
      <div className="mt-8 rounded-xl border border-border bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold text-foreground">Top Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">AI Chats</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Papers</th>
              </tr>
            </thead>
            <tbody>
              {topUsers.map((user, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <span className="text-xs font-medium text-primary-foreground">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{user.chats}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{user.papers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
