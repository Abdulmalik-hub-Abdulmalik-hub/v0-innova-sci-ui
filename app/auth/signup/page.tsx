"use client"

import { useState } from "react"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FlaskConical, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase, isConfigured } from "@/lib/supabase"

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return

    if (!formData.name.trim() || !formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check if Supabase is configured
      if (!isConfigured()) {
        // Dev mode without Supabase - simulate success
        console.warn("[Signup] Running in demo mode - Supabase not configured")
        setSuccess(true)
        setTimeout(() => router.push("/auth/login"), 1500)
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      })

      if (signUpError) {
        console.error("SIGNUP_ERR:", signUpError.message)
        setError(signUpError.message)
      } else if (data.user) {
        setSuccess(true)
        // Redirect to login after successful signup
        setTimeout(() => router.push("/auth/login"), 1500)
      }
    } catch (err) {
      console.error("FETCH_ERROR:", err)
      setError("Connection failed. Please check your internet and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Demo mode indicator
  const demoMode = !isConfigured()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-secondary/30 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Demo Mode Banner */}
        {demoMode && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 text-sm text-center">
            ⚠️ Demo Mode - Configure Supabase to enable real signups
          </div>
        )}

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25 mb-4">
            <FlaskConical className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-1">Join InnovaSci AI Labs</p>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-xl">
          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Check your email!</h2>
              <p className="text-muted-foreground">
                We sent a confirmation link to <strong>{formData.email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-11"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="space-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <Check className={`w-3 h-3 ${req.check(formData.password) ? "text-green-500" : "text-muted-foreground"}`} />
                      <span className={req.check(formData.password) ? "text-green-600" : "text-muted-foreground"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Create Account <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <Button variant="outline" className="w-full h-11" type="button" onClick={async () => {
            if (!isConfigured()) {
              setError("Configure Supabase to enable OAuth")
              return
            }
            try {
              const { error: oauthError } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: window.location.origin + "/auth/callback" }
              })
              if (oauthError) setError(oauthError.message)
            } catch (err) {
              setError("OAuth failed. Please try again.")
            }
          }}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.96 21.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.96 2.47 2.18 5.12l2.85 2.85c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Sign In Link */}
        <p className="text-center mt-6 text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
