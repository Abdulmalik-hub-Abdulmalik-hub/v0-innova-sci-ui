"use client"

import { useState } from "react"
import { 
  Search, 
  Filter,
  MoreHorizontal,
  Mail,
  Shield,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AdminLayout } from "@/components/layout/admin-layout"

// Users data
const users = [
  { 
    id: 1, 
    name: "Dr. Sarah Chen", 
    email: "sarah@mit.edu", 
    role: "Pro",
    status: "Active",
    joined: "Jan 15, 2024",
    lastActive: "2 hours ago"
  },
  { 
    id: 2, 
    name: "James Rodriguez", 
    email: "james@stanford.edu", 
    role: "Pro",
    status: "Active",
    joined: "Jan 20, 2024",
    lastActive: "1 hour ago"
  },
  { 
    id: 3, 
    name: "Dr. Emily Watson", 
    email: "emily@oxford.edu", 
    role: "Free",
    status: "Active",
    joined: "Feb 1, 2024",
    lastActive: "5 hours ago"
  },
  { 
    id: 4, 
    name: "Michael Park", 
    email: "michael@harvard.edu", 
    role: "Institution",
    status: "Active",
    joined: "Feb 10, 2024",
    lastActive: "1 day ago"
  },
  { 
    id: 5, 
    name: "Dr. Lisa Wang", 
    email: "lisa@caltech.edu", 
    role: "Pro",
    status: "Inactive",
    joined: "Feb 15, 2024",
    lastActive: "2 weeks ago"
  },
  { 
    id: 6, 
    name: "David Kim", 
    email: "david@yale.edu", 
    role: "Free",
    status: "Active",
    joined: "Mar 1, 2024",
    lastActive: "3 hours ago"
  },
  { 
    id: 7, 
    name: "Dr. Anna Mueller", 
    email: "anna@eth.ch", 
    role: "Pro",
    status: "Active",
    joined: "Mar 5, 2024",
    lastActive: "30 min ago"
  },
  { 
    id: 8, 
    name: "Robert Taylor", 
    email: "robert@princeton.edu", 
    role: "Free",
    status: "Suspended",
    joined: "Mar 10, 2024",
    lastActive: "1 week ago"
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  const toggleUser = (id: number) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(u => u !== id) 
        : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedUsers(prev => 
      prev.length === users.length ? [] : users.map(u => u.id)
    )
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Pro":
        return "bg-primary/10 text-primary"
      case "Institution":
        return "bg-chart-5/10 text-chart-5"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-chart-3/10 text-chart-3"
      case "Inactive":
        return "bg-chart-4/10 text-chart-4"
      case "Suspended":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <AdminLayout 
      title="User Management" 
      description="View and manage all platform users."
    >
      {/* Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {selectedUsers.length > 0 && (
            <>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email Selected
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
          <Button size="sm">
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6 rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Joined</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUser(user.id)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                        <span className="text-sm font-medium text-primary-foreground">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getRoleBadge(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{user.joined}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{user.lastActive}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-4 py-3">
          <div className="text-sm text-muted-foreground">
            Showing 1-8 of 12,456 users
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
