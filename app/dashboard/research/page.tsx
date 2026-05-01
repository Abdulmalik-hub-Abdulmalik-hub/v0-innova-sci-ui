"use client"

import { useState } from "react"
import { 
  Upload, 
  FileText, 
  Search, 
  Sparkles, 
  Clock, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Eye,
  Download,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Uploaded papers data
const uploadedPapers = [
  {
    id: 1,
    title: "Machine Learning in Drug Discovery.pdf",
    status: "analyzed",
    uploadedAt: "Mar 14, 2024",
    pages: 24,
    insights: 12,
  },
  {
    id: 2,
    title: "Quantum Computing Overview.pdf",
    status: "analyzing",
    uploadedAt: "Mar 14, 2024",
    pages: 18,
    insights: 0,
  },
  {
    id: 3,
    title: "Climate Science Review.pdf",
    status: "analyzed",
    uploadedAt: "Mar 12, 2024",
    pages: 32,
    insights: 15,
  },
]

// Sample insights
const sampleInsights = [
  {
    type: "key_finding",
    title: "Key Finding",
    content: "The study demonstrates a 45% improvement in drug candidate identification using transformer-based models compared to traditional methods.",
  },
  {
    type: "methodology",
    title: "Methodology",
    content: "Researchers employed a multi-stage pipeline combining molecular fingerprinting with deep learning architectures.",
  },
  {
    type: "limitation",
    title: "Limitation",
    content: "The model shows reduced accuracy for novel compound structures outside the training distribution.",
  },
]

export default function ResearchPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPaper, setSelectedPaper] = useState<number | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file upload logic here
  }

  return (
    <DashboardLayout 
      title="Research Engine" 
      description="Upload and analyze research papers with AI-powered insights."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Upload and Papers */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border bg-card"
            }`}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Upload Research Paper
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop your PDF here, or click to browse
            </p>
            <Button className="mt-4">
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Supports PDF files up to 50MB
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your papers..."
              className="pl-9 bg-secondary"
            />
          </div>

          {/* Uploaded Papers */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border p-4">
              <h2 className="font-semibold text-foreground">Your Papers</h2>
            </div>
            <div className="divide-y divide-border">
              {uploadedPapers.map((paper) => (
                <div
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper.id)}
                  className={`flex items-center justify-between p-4 transition-colors cursor-pointer ${
                    selectedPaper === paper.id
                      ? "bg-primary/5"
                      : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-2/10">
                      <FileText className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{paper.title}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{paper.pages} pages</span>
                        <span>{paper.uploadedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {paper.status === "analyzed" ? (
                      <span className="flex items-center gap-1 rounded-full bg-chart-3/10 px-2 py-1 text-xs text-chart-3">
                        <CheckCircle className="h-3 w-3" />
                        {paper.insights} insights
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-chart-4/10 px-2 py-1 text-xs text-chart-4">
                        <Clock className="h-3 w-3" />
                        Analyzing...
                      </span>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Insights */}
        <div className="space-y-6">
          {/* Insights Panel */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-foreground">AI Insights</h2>
            </div>

            {selectedPaper ? (
              <div className="mt-6 space-y-4">
                {sampleInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-2">
                      {insight.type === "key_finding" && (
                        <CheckCircle className="h-4 w-4 text-chart-3" />
                      )}
                      {insight.type === "methodology" && (
                        <Sparkles className="h-4 w-4 text-primary" />
                      )}
                      {insight.type === "limitation" && (
                        <AlertCircle className="h-4 w-4 text-chart-4" />
                      )}
                      <span className="text-sm font-medium text-foreground">
                        {insight.title}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {insight.content}
                    </p>
                  </div>
                ))}

                <Button className="w-full">
                  Ask Hakeem about this paper
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Select a paper to view AI-generated insights</p>
              </div>
            )}
          </div>

          {/* Quick Tips */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">Quick Tips</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Upload multiple related papers for cross-referencing
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Ask Hakeem to compare findings across papers
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                Export insights to your workspace for later use
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
