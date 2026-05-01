"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Beaker, 
  Atom, 
  Zap,
  Dna,
  Globe,
  Calculator,
  ArrowRight,
  Play,
  Clock,
  CheckCircle,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

// Simulation tools
const simulationTools = [
  {
    id: "chemistry",
    name: "Chemistry Tools",
    description: "Molecular dynamics, reaction simulations, and compound analysis",
    icon: Beaker,
    color: "bg-chart-2/10 text-chart-2",
    available: true,
    tools: [
      { name: "Molecular Viewer", description: "3D visualization of molecular structures" },
      { name: "Reaction Simulator", description: "Predict reaction outcomes and pathways" },
      { name: "Energy Calculator", description: "Calculate molecular energies and bonds" },
    ]
  },
  {
    id: "physics",
    name: "Physics Calculators",
    description: "Quantum mechanics, thermodynamics, and classical mechanics tools",
    icon: Atom,
    color: "bg-primary/10 text-primary",
    available: true,
    tools: [
      { name: "Quantum State Calculator", description: "Wave function and probability analysis" },
      { name: "Thermodynamics Simulator", description: "Heat transfer and entropy calculations" },
      { name: "Mechanics Solver", description: "Classical mechanics problem solver" },
    ]
  },
  {
    id: "biology",
    name: "Biology Simulations",
    description: "Protein folding, genetic analysis, and cellular modeling",
    icon: Dna,
    color: "bg-chart-3/10 text-chart-3",
    available: false,
    tools: [
      { name: "Protein Folding", description: "Predict protein structures" },
      { name: "Gene Expression", description: "Model gene expression patterns" },
      { name: "Cell Dynamics", description: "Simulate cellular processes" },
    ]
  },
  {
    id: "environmental",
    name: "Environmental Models",
    description: "Climate modeling, ecosystem simulation, and environmental analysis",
    icon: Globe,
    color: "bg-chart-4/10 text-chart-4",
    available: false,
    tools: [
      { name: "Climate Predictor", description: "Model climate patterns" },
      { name: "Ecosystem Simulator", description: "Simulate ecosystem dynamics" },
      { name: "Pollution Tracker", description: "Track environmental pollutants" },
    ]
  },
]

// Recent simulations
const recentSimulations = [
  {
    id: 1,
    name: "Molecular Dynamics - Water",
    tool: "Chemistry Tools",
    status: "completed",
    date: "Mar 14, 2024",
    duration: "12 min",
  },
  {
    id: 2,
    name: "Quantum Harmonic Oscillator",
    tool: "Physics Calculators",
    status: "completed",
    date: "Mar 13, 2024",
    duration: "5 min",
  },
  {
    id: 3,
    name: "Heat Transfer Analysis",
    tool: "Physics Calculators",
    status: "running",
    date: "Mar 14, 2024",
    duration: "8 min",
  },
]

export default function SimulationsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  const activeTool = simulationTools.find((t) => t.id === selectedTool)

  return (
    <DashboardLayout 
      title="Simulation Tools" 
      description="Run powerful simulations for chemistry, physics, and more."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tool Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tool Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {simulationTools.map((tool) => {
              const Icon = tool.icon
              return (
                <div
                  key={tool.id}
                  onClick={() => tool.available && setSelectedTool(tool.id)}
                  className={`relative rounded-xl border p-6 transition-colors ${
                    tool.available
                      ? selectedTool === tool.id
                        ? "border-primary bg-primary/5 cursor-pointer"
                        : "border-border bg-card hover:border-primary/50 cursor-pointer"
                      : "border-border bg-card/50 cursor-not-allowed"
                  }`}
                >
                  {!tool.available && (
                    <div className="absolute right-4 top-4">
                      <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-1 text-xs text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        Coming Soon
                      </span>
                    </div>
                  )}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{tool.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  {tool.available && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 -ml-2"
                    >
                      Explore Tools
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Recent Simulations */}
          <div className="rounded-xl border border-border bg-card">
            <div className="border-b border-border p-4">
              <h2 className="font-semibold text-foreground">Recent Simulations</h2>
            </div>
            <div className="divide-y divide-border">
              {recentSimulations.map((sim) => (
                <div
                  key={sim.id}
                  className="flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calculator className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{sim.name}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{sim.tool}</span>
                        <span>{sim.date}</span>
                        <span>{sim.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {sim.status === "completed" ? (
                      <span className="flex items-center gap-1 rounded-full bg-chart-3/10 px-2 py-1 text-xs text-chart-3">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-chart-4/10 px-2 py-1 text-xs text-chart-4">
                        <Clock className="h-3 w-3" />
                        Running
                      </span>
                    )}
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Tool Details */}
        <div className="space-y-6">
          {/* Selected Tool Details */}
          <div className="rounded-xl border border-border bg-card p-6">
            {activeTool ? (
              <>
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${activeTool.color}`}>
                    <activeTool.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-semibold text-foreground">{activeTool.name}</h2>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {activeTool.description}
                </p>

                <div className="mt-6 space-y-3">
                  {activeTool.tools.map((subtool, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary/50 hover:bg-secondary"
                    >
                      <div>
                        <h4 className="font-medium text-foreground">{subtool.name}</h4>
                        <p className="text-xs text-muted-foreground">{subtool.description}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Play className="h-4 w-4" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold text-foreground">
                  Select a Tool
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a simulation category to see available tools
                </p>
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground">This Month</h3>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Simulations Run</span>
                  <span className="font-medium text-foreground">23</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div className="h-2 w-3/4 rounded-full bg-primary" />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Compute Time</span>
                  <span className="font-medium text-foreground">4.2 hours</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div className="h-2 w-1/2 rounded-full bg-chart-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
