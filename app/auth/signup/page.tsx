"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Stub for demo mode
const isConfigured = () => false
const supabase = { auth: { signUp: () => ({ data: {}, error: null }), signInWithOAuth: () => ({ error: null }) } }

const passwordRequirements = [
  { label: "At least 8 characters", check: (p: string) => p.length >= 8 },
  { label: "Contains uppercase letter", check: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains number", check: (p: string) => /\d/.test(p) },
]

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return
    if (!formData.name.trim() || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }
    setIsLoading(true)
    setError(null)
    
    // Demo mode
    console.warn("[Signup] Running in demo mode")
    setSuccess(true)
    setTimeout(() => router.push("/auth/login"), 1500)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)" }}>
      <div className="w-full max-w-md p-6">
        <div className="mb-4 p-3 rounded-xl text-center text-yellow-400 text-sm" 
          style={{ background: "rgba(234, 179, 8, 0.1)", border: "1px solid rgba(234, 179, 8, 0.3)" }}>
          Demo Mode - Configure Supabase for real signups
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", boxShadow: "0 10px 40px rgba(139, 92, 246, 0.4)" }}>
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2">Join InnovaSci AI Labs</p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(30, 41, 59, 0.8)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: "#22c55e" }}>
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Check your email!</h2>
              <p className="text-gray-400">We sent a confirmation link to <strong>{formData.email}</strong></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-12 py-4 rounded-xl text-white placeholder-gray-500" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)" }} required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-12 py-4 rounded-xl text-white placeholder-gray-500" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)" }} required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-12 py-4 rounded-xl text-white placeholder-gray-500 pr-12" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.1)" }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    {showPassword ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                  </button>
                </div>
              </div>

              {formData.password && (
                <div className="space-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <svg className={`w-3 h-3 ${req.check(formData.password) ? "text-green-500" : "text-gray-500"}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span className={req.check(formData.password) ? "text-green-400" : "text-gray-500"}>{req.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{error}</div>}

              <button type="submit" disabled={isLoading} className="w-full py-4 rounded-xl font-semibold text-white disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)" }}>
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border" style={{ borderColor: "rgba(255,255,255,0.1)" }} /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="px-3 text-gray-500" style={{ background: "rgba(30, 41, 59, 0.8)" }}>Or continue with</span></div>
          </div>

          <button type="button" className="w-full py-4 rounded-xl font-medium text-white border hover:bg-white/5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 7.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.96 2.47 2.18 5.12l2.85 2.85c.87-2.6 3.3-4.53 6.16-4.53z" /><path fill="#EA4335" d="M5.27 9.76A11.195 11.195 0 0112 6c2.12 0 3.99.74 5.46 1.97l4.08-3.99C19.94 2.42 16.3 1 12 1 7.7 1 3.96 2.47 2.18 5.12L5.27 9.76z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#34A853" d="M12 22c2.97 0 5.46-.98 7.28-2.66l-4.08-3.99c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.96 19.53 7.7 22 12 22z" /></svg>
              Continue with Google
            </span>
          </button>
        </div>

        <p className="text-center mt-8 text-gray-400">Already have an account?{" "}<Link href="/auth/login" className="font-medium hover:underline" style={{ color: "#8b5cf6" }}>Sign in</Link></p>
      </div>
    </div>
  )
}
