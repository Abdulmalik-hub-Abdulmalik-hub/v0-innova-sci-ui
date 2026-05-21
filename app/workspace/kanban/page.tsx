"use client"

import { useState, useEffect } from "react"
import { 
  Clock, 
  Play, 
  CheckCircle2, 
  MoreVertical, 
  AlertCircle,
  ArrowRight,
  Calendar,
  User as UserIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { supabase, getCurrentUser } from "@/lib/supabase"

type TaskStatus = 'pending' | 'in_progress' | 'completed'

interface StaffTask {
  id: string
  staffId: string
  title: string
  description: string | null
  priority: string
  status: TaskStatus
  deadline: string
  createdAt: string
  staff?: {
    name: string | null
    email: string
  }
}

const PRIORITY_COLORS = {
  low: 'bg-chart-2/20 text-chart-2 border-chart-2/30',
  medium: 'bg-chart-3/20 text-chart-3 border-chart-3/30', 
  high: 'bg-destructive/20 text-destructive border-destructive/30',
}

const STATUS_COLUMNS = [
  { id: 'pending', title: 'Pending', icon: Clock, color: 'border-chart-2' },
  { id: 'in_progress', title: 'In Progress', icon: Play, color: 'border-chart-3' },
  { id: 'completed', title: 'Completed', icon: CheckCircle2, color: 'border-primary' },
]

function TaskCard({ 
  task, 
  onMove 
}: { 
  task: StaffTask; 
  onMove: (id: string, status: TaskStatus) => void 
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const deadline = new Date(task.deadline)
  const isOverdue = deadline < new Date() && task.status !== 'completed'
  
  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{task.title}</h4>
          {task.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          {menuOpen && (
            <div className="absolute right-0 top-8 z-10 w-36 rounded-md border border-border bg-background shadow-lg p-1">
              {task.status === 'pending' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => { onMove(task.id, 'in_progress'); setMenuOpen(false) }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Move to Active
                </Button>
              )}
              {task.status === 'in_progress' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => { onMove(task.id, 'completed'); setMenuOpen(false) }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              {task.status === 'completed' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-left"
                  onClick={() => { onMove(task.id, 'pending'); setMenuOpen(false) }}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Move to Pending
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${PRIORITY_COLORS[task.priority as keyof typeof PRIORITY_COLORS] || PRIORITY_COLORS.medium}`}>
          {task.priority}
        </span>
        {task.staff && (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <UserIcon className="h-3 w-3" />
            {task.staff.name || task.staff.email.split('@')[0]}
          </span>
        )}
      </div>
      
      <div className={`mt-3 flex items-center gap-1 text-xs ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
        <Calendar className="h-3 w-3" />
        {deadline.toLocaleDateString()}
        {isOverdue && <AlertCircle className="h-3 w-3 ml-1" />}
      </div>
    </div>
  )
}

export default function KanbanPage() {
  const [tasks, setTasks] = useState<StaffTask[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    loadUserAndTasks()
  }, [])

  async function loadUserAndTasks() {
    setLoading(true)
    const user = await getCurrentUser()
    setCurrentUser(user)
    
    if (user) {
      const { data } = await supabase
        .from('stafftask')
        .select('*, staff:user!staffId(name, email)')
        .order('createdAt', { ascending: false })
      
      if (data) setTasks(data as StaffTask[])
    } else {
      // Load all tasks for demo without user filter
      const { data } = await supabase
        .from('stafftask')
        .select('*, staff:user!staffId(name, email)')
        .order('createdAt', { ascending: false })
        .limit(20)
      
      if (data) setTasks(data as StaffTask[])
    }
    setLoading(false)
  }

  async function moveTask(taskId: string, newStatus: TaskStatus) {
    const { error } = await supabase
      .from('stafftask')
      .update({ status: newStatus })
      .eq('id', taskId)
    
    if (!error) {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, status: newStatus } : t
      ))
    }
  }

  const tasksByStatus = {
    pending: tasks.filter(t => t.status === 'pending'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    completed: tasks.filter(t => t.status === 'completed'),
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Task Board</h1>
              <p className="mt-1 text-muted-foreground">Manage staff tasks and track progress</p>
            </div>
            <Button onClick={loadUserAndTasks} variant="outline">
              Refresh
            </Button>
          </div>
        </div>
      </section>
      
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card animate-pulse h-96" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {STATUS_COLUMNS.map(column => {
                const ColumnIcon = column.icon
                const columnTasks = tasksByStatus[column.id as keyof typeof tasksByStatus]
                
                return (
                  <div key={column.id} className="flex flex-col">
                    <div className={`flex items-center gap-2 rounded-t-lg border-t-4 ${column.color} bg-card p-4`}>
                      <ColumnIcon className="h-5 w-5" />
                      <h2 className="font-semibold text-foreground">{column.title}</h2>
                      <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs">
                        {columnTasks.length}
                      </span>
                    </div>
                    
                    <div className="flex-1 space-y-3 rounded-b-lg border border-t-0 border-border bg-secondary/20 p-3 min-h-[400px]">
                      {columnTasks.length === 0 ? (
                        <p className="text-center text-sm text-muted-foreground py-8">
                          No tasks
                        </p>
                      ) : (
                        columnTasks.map(task => (
                          <TaskCard 
                            key={task.id} 
                            task={task} 
                            onMove={moveTask}
                          />
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}