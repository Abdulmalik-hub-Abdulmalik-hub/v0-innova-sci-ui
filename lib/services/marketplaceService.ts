import { createClient } from '@supabase/supabase-js';
import type { 
  Product, 
  Order, 
  OrderItem, 
  Cart, 
  CartItem,
  PaystackInitResponse,
  PaystackVerifyResponse 
} from '@/lib/types/database';

// Create a service-level Supabase client for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  });
}

export class MarketplaceService {
  // ==================== PRODUCTS ====================
  
  static async getProducts(options?: { 
    category?: string; 
    limit?: number; 
    offset?: number;
    search?: string;
  }): Promise<{ products: Product[]; total: number }> {
    const supabase = getServiceClient();
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (options?.category) {
      query = query.eq('category', options.category);
    }
    if (options?.search) {
      query = query.ilike('name', `%${options.search}%`);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(`Failed to fetch products: ${error.message}`);
    
    return { products: data || [], total: count || 0 };
  }

  static async getProductById(productId: string): Promise<Product | null> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
    return data;
  }

  static async getCategories(): Promise<string[]> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('products')
      .select('category')
      .eq('is_active', true)
      .not('category', 'is', null);

    if (error) throw new Error(`Failed to fetch categories: ${error.message}`);
    
    const categories = [...new Set(data?.map(p => p.category).filter(Boolean))];
    return categories as string[];
  }

  // ==================== CART ====================

  static async getOrCreateCart(userId: string): Promise<Cart> {
    const supabase = getServiceClient();
    
    // Try to find existing cart
    const { data: existingCart } = await supabase
      .from('carts')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingCart) return existingCart;

    // Create new cart
    const { data: newCart, error } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single();

    if (error) throw new Error(`Failed to create cart: ${error.message}`);
    return newCart;
  }

  static async getCartItems(userId: string): Promise<CartItem[]> {
    const supabase = getServiceClient();
    const cart = await this.getOrCreateCart(userId);

    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*)
      `)
      .eq('cart_id', cart.id);

    if (error) throw new Error(`Failed to fetch cart items: ${error.message}`);
    return data || [];
  }

  static async addToCart(userId: string, productId: string, quantity: number = 1): Promise<CartItem> {
    const supabase = getServiceClient();
    const cart = await this.getOrCreateCart(userId);

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('cart_id', cart.id)
      .eq('product_id', productId)
      .single();

    if (existingItem) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existingItem.quantity + quantity })
        .eq('id', existingItem.id)
        .select()
        .single();

      if (error) throw new Error(`Failed to update cart item: ${error.message}`);
      return data;
    }

    // Add new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        cart_id: cart.id,
        product_id: productId,
        quantity
      })
      .select()
      .single();

    if (error) throw new Error(`Failed to add item to cart: ${error.message}`);
    return data;
  }

  static async updateCartItemQuantity(userId: string, cartItemId: string, quantity: number): Promise<CartItem | null> {
    const supabase = getServiceClient();
    const cart = await this.getOrCreateCart(userId);

    if (quantity <= 0) {
      await this.removeFromCart(userId, cartItemId);
      return null;
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .eq('cart_id', cart.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update cart item: ${error.message}`);
    return data;
  }

  static async removeFromCart(userId: string, cartItemId: string): Promise<void> {
    const supabase = getServiceClient();
    const cart = await this.getOrCreateCart(userId);

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
      .eq('cart_id', cart.id);

    if (error) throw new Error(`Failed to remove item from cart: ${error.message}`);
  }

  static async clearCart(userId: string): Promise<void> {
    const supabase = getServiceClient();
    const cart = await this.getOrCreateCart(userId);

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cart.id);

    if (error) throw new Error(`Failed to clear cart: ${error.message}`);
  }

  // ==================== ORDERS ====================

  static async createOrder(
    userId: string, 
    shippingAddress?: Record<string, unknown>,
    billingAddress?: Record<string, unknown>
  ): Promise<Order> {
    const supabase = getServiceClient();
    
    // Get cart items with product details
    const cartItems = await this.getCartItems(userId);
    if (cartItems.length === 0) {
      throw new Error('Cart is empty');
    }

    // Calculate total from database prices (never trust client-side prices)
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    // Generate payment reference
    const paymentReference = `INV-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        currency: 'NGN',
        status: 'PENDING',
        payment_reference: paymentReference,
        payment_provider: 'paystack',
        shipping_address: shippingAddress || null,
        billing_address: billingAddress || null
      })
      .select()
      .single();

    if (orderError) throw new Error(`Failed to create order: ${orderError.message}`);

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.product?.price || 0,
      total_price: (item.product?.price || 0) * item.quantity,
      product_snapshot: item.product ? {
        name: item.product.name,
        description: item.product.description,
        image_url: item.product.image_url
      } : null
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw new Error(`Failed to create order items: ${itemsError.message}`);

    // Clear the cart after order creation
    await this.clearCart(userId);

    return order;
  }

  static async getOrderById(orderId: string, userId?: string): Promise<Order | null> {
    const supabase = getServiceClient();
    let query = supabase
      .from('orders')
      .select('*')
      .eq('id', orderId);

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
    return data;
  }

  static async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (error) throw new Error(`Failed to fetch order items: ${error.message}`);
    return data || [];
  }

  static async getUserOrders(userId: string): Promise<Order[]> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch orders: ${error.message}`);
    return data || [];
  }

  static async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update order status: ${error.message}`);
    return data;
  }

  // ==================== PAYSTACK INTEGRATION ====================

  static async initializePayment(
    orderId: string, 
    email: string,
    callbackUrl: string
  ): Promise<PaystackInitResponse> {
    const order = await this.getOrderById(orderId);
    if (!order) throw new Error('Order not found');

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: Math.round(order.total_amount * 100), // Paystack expects amount in kobo
        currency: order.currency,
        reference: order.payment_reference,
        callback_url: callbackUrl,
        metadata: {
          order_id: orderId,
          custom_fields: [
            {
              display_name: "Order ID",
              variable_name: "order_id",
              value: orderId
            }
          ]
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Paystack initialization failed: ${error.message}`);
    }

    return response.json();
  }

  static async verifyPaystackPayment(reference: string): Promise<{ success: boolean; order: Order | null }> {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Paystack verification failed: ${error.message}`);
    }

    const result: PaystackVerifyResponse = await response.json();
    
    if (result.data.status === 'success') {
      // Find order by payment reference
      const supabase = getServiceClient();
      const { data: order } = await supabase
        .from('orders')
        .select('*')
        .eq('payment_reference', reference)
        .single();

      if (order) {
        // Update order status to PROCESSING
        const updatedOrder = await this.updateOrderStatus(order.id, 'PROCESSING');
        
        // Log the successful payment
        await supabase.from('audit_logs').insert({
          user_id: order.user_id,
          action: 'PAYMENT_SUCCESSFUL',
          entity_type: 'order',
          entity_id: order.id,
          new_values: { 
            payment_reference: reference, 
            amount: result.data.amount / 100,
            status: 'PROCESSING'
          }
        });

        return { success: true, order: updatedOrder };
      }
    }

    return { success: false, order: null };
  }

  static async handlePaystackWebhook(
    signature: string, 
    body: string
  ): Promise<{ success: boolean; message: string }> {
    const crypto = await import('crypto');
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return { success: false, message: 'Invalid signature' };
    }

    const event = JSON.parse(body);
    
    if (event.event === 'charge.success') {
      const { reference } = event.data;
      await this.verifyPaystackPayment(reference);
      return { success: true, message: 'Payment processed' };
    }

    return { success: true, message: 'Event received' };
  }

  // ==================== ADMIN OPERATIONS ====================

  static async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw new Error(`Failed to create product: ${error.message}`);
    return data;
  }

  static async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error) throw new Error(`Failed to update product: ${error.message}`);
    return data;
  }

  static async deleteProduct(productId: string): Promise<void> {
    const supabase = getServiceClient();
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', productId);

    if (error) throw new Error(`Failed to delete product: ${error.message}`);
  }

  static async getAllOrders(options?: {
    status?: Order['status'];
    limit?: number;
    offset?: number;
  }): Promise<{ orders: Order[]; total: number }> {
    const supabase = getServiceClient();
    let query = supabase
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (options?.status) {
      query = query.eq('status', options.status);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;
    if (error) throw new Error(`Failed to fetch orders: ${error.message}`);

    return { orders: data || [], total: count || 0 };
  }
}
