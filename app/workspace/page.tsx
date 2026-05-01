"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  MessageSquare, 
  FileText, 
  FolderOpen, 
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Trash2,
  Edit
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Tabs
const tabs = [
  { id: "chats", label: "Saved Chats", icon: MessageSquare },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderOpen },
]

// Saved chats data
const savedChats = [
  { 
    id: 1, 
    title: "Quantum Mechanics Discussion", 
    preview: "Discussion about wave function collapse and quantum entanglement...",
    date: "Mar 15, 2024",
    messages: 24
  },
  { 
    id: 2, 
    title: "Drug Discovery Research", 
    preview: "Analysis of machine learning approaches in pharmaceutical research...",
    date: "Mar 14, 2024",
    messages: 18
  },
  { 
    id: 3, 
    title: "Statistical Methods Review", 
    preview: "Comparing different statistical approaches for experimental data...",
    date: "Mar 12, 2024",
    messages: 32
  },
  { 
    id: 4, 
    title: "Climate Model Analysis", 
    preview: "Discussing computational methods for climate prediction models...",
    date: "Mar 10, 2024",
    messages: 15
  },
]

// Documents data
const documents = [
  { 
    id: 1, 
    title: "Machine Learning in Drug Discovery.pdf", 
    type: "PDF",
    size: "2.4 MB",
    date: "Mar 14, 2024",
    insights: 12
  },
  { 
    id: 2, 
    title: "Quantum Computing Overview.pdf", 
    type: "PDF",
    size: "1.8 MB",
    date: "Mar 12, 2024",
    insights: 8
  },
  { 
    id: 3, 
    title: "Climate Science Review.pdf", 
    type: "PDF",
    size: "3.1 MB",
    date: "Mar 10, 2024",
    insights: 15
  },
]

// Projects data
const projects = [
  { 
    id: 1, 
    title: "Protein Folding Research", 
    description: "Investigating protein folding mechanisms using AI",
    chats: 8,
    documents: 12,
    date: "Mar 15, 2024"
  },
  { 
    id: 2, 
    title: "Renewable Energy Study", 
    description: "Analysis of solar cell efficiency improvements",
    chats: 5,
    documents: 7,
    date: "Mar 10, 2024"
  },
  { 
    id: 3, 
    title: "Neural Network Applications", 
    description: "Exploring deep learning in scientific computing",
    chats: 12,
    documents: 9,
    date: "Mar 5, 2024"
  },
]

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("chats")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <DashboardLayout 
      title="Workspace" 
      description="Manage your saved chats, documents, and research projects."
    >
      {/* Search and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workspace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="mt-6">
        {activeTab === "chats" && (
          <div className="grid gap-4">
            {savedChats.map((chat) => (
              <Link
                key={chat.id}
                href="/dashboard/chat"
                className="group flex items-start justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {chat.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                      {chat.preview}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {chat.date}
                      </span>
                      <span>{chat.messages} messages</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group flex items-start justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                    <FileText className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {doc.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>{doc.size}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {doc.date}
                      </span>
                      <span>{doc.insights} insights</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-4/10">
                    <FolderOpen className="h-5 w-5 text-chart-4" />
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{project.chats} chats</span>
                  <span>{project.documents} documents</span>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Updated {project.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
