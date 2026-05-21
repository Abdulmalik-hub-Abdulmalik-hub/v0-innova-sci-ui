"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Minus, Plus, Tag, ArrowRight, Package, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { supabase } from "@/lib/supabase"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string | null
  type: string | null
  image: string | null
  isActive: boolean
}

interface CartItem {
  product: Product
  quantity: number
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video bg-secondary relative">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {product.category && (
          <span className="absolute top-3 right-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            {product.category}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            {product.type && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Tag className="h-3 w-3" />
                {product.type}
              </span>
            )}
          </div>
          <span className="text-lg font-bold text-primary">${product.price}</span>
        </div>
        {product.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        )}
        <Button onClick={() => onAddToCart(product)} className="mt-4 w-full" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

function CartDrawer({ 
  items, 
  onUpdateQuantity, 
  onCheckout,
  isOpen, 
  onClose 
}: { 
  items: CartItem[]; 
  onUpdateQuantity: (id: string, qty: number) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-background border-l border-border h-full flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Shopping Cart ({items.length})</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-3 rounded-lg border border-border">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">${item.product.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7"
                    onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button onClick={onCheckout} className="w-full" size="lg">
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkingOut, setCheckingOut] = useState(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    setLoading(true)
    const { data } = await supabase
      .from('product')
      .select('*')
      .eq('isActive', true)
      .order('name')
    
    if (data) setProducts(data as Product[])
    setLoading(false)
  }

  function addToCart(product: Product) {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setCartOpen(true)
  }

  function updateCartQuantity(productId: string, quantity: number) {
    if (quantity < 1) {
      setCart(prev => prev.filter(item => item.product.id !== productId))
    } else {
      setCart(prev => prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ))
    }
  }

  async function handleCheckout() {
    if (cart.length === 0) return
    setCheckingOut(true)
    
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      
      const { data: order, error: orderError } = await supabase
        .from('order')
        .insert({
          userId: user?.id || 'demo-user',
          totalAmount: total,
          status: 'PENDING',
          customerEmail: user?.email || 'demo@example.com'
        })
        .select()
        .single()
      
      if (orderError) throw orderError
      
      const orderItems = cart.map(item => ({
        orderId: order.id,
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
      
      await supabase.from('orderitem').insert(orderItems)
      
      setCheckoutSuccess(true)
      setCart([])
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Checkout failed. Please try again.')
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background p-8 rounded-2xl border border-border text-center max-w-md">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground">Order Placed!</h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your order.
            </p>
            <Button onClick={() => setCheckoutSuccess(false)} className="mt-6">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
      
      <CartDrawer 
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onCheckout={handleCheckout}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
      />
      
      <section className="pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
              <p className="mt-1 text-muted-foreground">Browse our collection of AI research tools and services</p>
            </div>
            <Button variant="outline" onClick={() => setCartOpen(true)} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>
      
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-card animate-pulse h-80" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground">No products available</h3>
              <p className="text-muted-foreground">Check back later for new offerings</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  )
}