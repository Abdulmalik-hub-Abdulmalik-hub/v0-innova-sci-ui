import { createClient } from '@supabase/supabase-js';
import type { 
  StaffTask, 
  SupportTicket, 
  TicketMessage, 
  AuditLog,
  User,
  TaskStatus,
  TaskPriority,
  TicketStatus,
  TicketPriority
} from '@/lib/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  });
}

export class StaffService {
  // ==================== TASK MANAGEMENT ====================

  static async createTask(task: {
    title: string;
    description?: string;
    assigned_to?: string;
    assigned_by: string;
    priority?: TaskPriority;
    due_date?: string;
  }): Promise<StaffTask> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('staff_tasks')
      .insert({
        title: task.title,
        description: task.description || null,
        assigned_to: task.assigned_to || null,
        assigned_by: task.assigned_by,
        priority: task.priority || 'MEDIUM',
        due_date: task.due_date || null,
        status: 'PENDING'
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create task: ${error.message}`);

    // Log the action
    await this.createAuditLog({
      user_id: task.assigned_by,
      action: 'TASK_CREATED',
      entity_type: 'staff_task',
      entity_id: data.id,
      new_values: data
    });

    return data;
  }

  static async getTasks(options?: {
    assigned_to?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    limit?: number;
    offset?: number;
  }): Promise<{ tasks: StaffTask[]; total: number }> {
    const supabase = getServiceClient();
    let query = supabase
      .from('staff_tasks')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options?.assigned_to) {
      query = query.eq('assigned_to', options.assigned_to);
    }
    if (options?.status) {
      query = query.eq('status', options.status);
    }
    if (options?.priority) {
      query = query.eq('priority', options.priority);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(`Failed to fetch tasks: ${error.message}`);

    return { tasks: data || [], total: count || 0 };
  }

  static async getTaskById(taskId: string): Promise<StaffTask | null> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('staff_tasks')
      .select('*')
      .eq('id', taskId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch task: ${error.message}`);
    }
    return data;
  }

  static async updateTask(
    taskId: string, 
    updates: Partial<StaffTask>,
    updatedBy: string
  ): Promise<StaffTask> {
    const supabase = getServiceClient();
    
    // Get current task for audit log
    const currentTask = await this.getTaskById(taskId);
    
    const updateData: Record<string, unknown> = { ...updates };
    
    // If marking as completed, set completed_at
    if (updates.status === 'COMPLETED') {
      updateData.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('staff_tasks')
      .update(updateData)
      .eq('id', taskId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update task: ${error.message}`);

    // Log the action
    await this.createAuditLog({
      user_id: updatedBy,
      action: 'TASK_UPDATED',
      entity_type: 'staff_task',
      entity_id: taskId,
      old_values: currentTask,
      new_values: data
    });

    return data;
  }

  static async deleteTask(taskId: string, deletedBy: string): Promise<void> {
    const supabase = getServiceClient();
    
    const currentTask = await this.getTaskById(taskId);
    
    const { error } = await supabase
      .from('staff_tasks')
      .delete()
      .eq('id', taskId);

    if (error) throw new Error(`Failed to delete task: ${error.message}`);

    await this.createAuditLog({
      user_id: deletedBy,
      action: 'TASK_DELETED',
      entity_type: 'staff_task',
      entity_id: taskId,
      old_values: currentTask
    });
  }

  // ==================== SUPPORT TICKETS ====================

  static generateTicketNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TKT-${timestamp}-${random}`;
  }

  static async createTicket(ticket: {
    subject: string;
    description?: string;
    user_id: string;
    priority?: TicketPriority;
    category?: string;
  }): Promise<SupportTicket> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('support_tickets')
      .insert({
        ticket_number: this.generateTicketNumber(),
        subject: ticket.subject,
        description: ticket.description || null,
        user_id: ticket.user_id,
        priority: ticket.priority || 'MEDIUM',
        category: ticket.category || null,
        status: 'OPEN'
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create ticket: ${error.message}`);

    await this.createAuditLog({
      user_id: ticket.user_id,
      action: 'TICKET_CREATED',
      entity_type: 'support_ticket',
      entity_id: data.id,
      new_values: data
    });

    return data;
  }

  static async getTickets(options?: {
    user_id?: string;
    assigned_to?: string;
    status?: TicketStatus;
    priority?: TicketPriority;
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ tickets: SupportTicket[]; total: number }> {
    const supabase = getServiceClient();
    let query = supabase
      .from('support_tickets')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options?.user_id) {
      query = query.eq('user_id', options.user_id);
    }
    if (options?.assigned_to) {
      query = query.eq('assigned_to', options.assigned_to);
    }
    if (options?.status) {
      query = query.eq('status', options.status);
    }
    if (options?.priority) {
      query = query.eq('priority', options.priority);
    }
    if (options?.category) {
      query = query.eq('category', options.category);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(`Failed to fetch tickets: ${error.message}`);

    return { tickets: data || [], total: count || 0 };
  }

  static async getTicketById(ticketId: string): Promise<SupportTicket | null> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch ticket: ${error.message}`);
    }
    return data;
  }

  static async updateTicket(
    ticketId: string, 
    updates: Partial<SupportTicket>,
    updatedBy: string
  ): Promise<SupportTicket> {
    const supabase = getServiceClient();
    
    const currentTicket = await this.getTicketById(ticketId);
    
    const updateData: Record<string, unknown> = { ...updates };
    
    // If resolving, set resolved_at
    if (updates.status === 'RESOLVED' || updates.status === 'CLOSED') {
      updateData.resolved_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('support_tickets')
      .update(updateData)
      .eq('id', ticketId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update ticket: ${error.message}`);

    await this.createAuditLog({
      user_id: updatedBy,
      action: 'TICKET_UPDATED',
      entity_type: 'support_ticket',
      entity_id: ticketId,
      old_values: currentTicket,
      new_values: data
    });

    return data;
  }

  static async assignTicket(
    ticketId: string, 
    assigneeId: string,
    assignedBy: string
  ): Promise<SupportTicket> {
    return this.updateTicket(ticketId, { 
      assigned_to: assigneeId,
      status: 'IN_PROGRESS' 
    }, assignedBy);
  }

  // ==================== TICKET MESSAGES ====================

  static async addTicketMessage(message: {
    ticket_id: string;
    user_id: string;
    message: string;
    is_internal?: boolean;
    attachments?: unknown[];
  }): Promise<TicketMessage> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('ticket_messages')
      .insert({
        ticket_id: message.ticket_id,
        user_id: message.user_id,
        message: message.message,
        is_internal: message.is_internal || false,
        attachments: message.attachments || []
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to add message: ${error.message}`);
    return data;
  }

  static async getTicketMessages(ticketId: string, includeInternal: boolean = false): Promise<TicketMessage[]> {
    const supabase = getServiceClient();
    let query = supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true });

    if (!includeInternal) {
      query = query.eq('is_internal', false);
    }

    const { data, error } = await query;
    if (error) throw new Error(`Failed to fetch messages: ${error.message}`);
    return data || [];
  }

  // ==================== AUDIT LOGS ====================

  static async createAuditLog(log: {
    user_id: string | null;
    action: string;
    entity_type: string;
    entity_id?: string;
    old_values?: unknown;
    new_values?: unknown;
    ip_address?: string;
    user_agent?: string;
    metadata?: Record<string, unknown>;
  }): Promise<AuditLog> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        user_id: log.user_id,
        action: log.action,
        entity_type: log.entity_type,
        entity_id: log.entity_id || null,
        old_values: log.old_values || null,
        new_values: log.new_values || null,
        ip_address: log.ip_address || null,
        user_agent: log.user_agent || null,
        metadata: log.metadata || {}
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to create audit log: ${error.message}`);
    return data;
  }

  static async getAuditLogs(options?: {
    user_id?: string;
    entity_type?: string;
    entity_id?: string;
    action?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ logs: AuditLog[]; total: number }> {
    const supabase = getServiceClient();
    let query = supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options?.user_id) {
      query = query.eq('user_id', options.user_id);
    }
    if (options?.entity_type) {
      query = query.eq('entity_type', options.entity_type);
    }
    if (options?.entity_id) {
      query = query.eq('entity_id', options.entity_id);
    }
    if (options?.action) {
      query = query.eq('action', options.action);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(`Failed to fetch audit logs: ${error.message}`);

    return { logs: data || [], total: count || 0 };
  }

  // ==================== USER MANAGEMENT (STAFF) ====================

  static async getStaffMembers(): Promise<User[]> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .in('role', ['ADMIN', 'SUPER_ADMIN', 'SUPPORT', 'MODERATOR'])
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw new Error(`Failed to fetch staff members: ${error.message}`);
    return data || [];
  }

  static async updateUserRole(userId: string, role: User['role'], updatedBy: string): Promise<User> {
    const supabase = getServiceClient();
    
    const { data: currentUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const { data, error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update user role: ${error.message}`);

    await this.createAuditLog({
      user_id: updatedBy,
      action: 'USER_ROLE_UPDATED',
      entity_type: 'user',
      entity_id: userId,
      old_values: { role: currentUser?.role },
      new_values: { role }
    });

    return data;
  }

  // ==================== DASHBOARD STATS ====================

  static async getDashboardStats(): Promise<{
    totalTasks: number;
    pendingTasks: number;
    completedTasks: number;
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
  }> {
    const supabase = getServiceClient();

    const [tasksResult, ticketsResult] = await Promise.all([
      supabase.from('staff_tasks').select('status'),
      supabase.from('support_tickets').select('status')
    ]);

    const tasks = tasksResult.data || [];
    const tickets = ticketsResult.data || [];

    return {
      totalTasks: tasks.length,
      pendingTasks: tasks.filter(t => t.status === 'PENDING').length,
      completedTasks: tasks.filter(t => t.status === 'COMPLETED').length,
      totalTickets: tickets.length,
      openTickets: tickets.filter(t => t.status === 'OPEN').length,
      resolvedTickets: tickets.filter(t => t.status === 'RESOLVED' || t.status === 'CLOSED').length
    };
  }
}
