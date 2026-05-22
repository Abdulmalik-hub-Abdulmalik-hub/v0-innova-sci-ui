"use client"

import { useState } from "react"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FlaskConical, Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase"

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
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
          emailRedirectTo: typeof window !== 'undefined' 
            ? `${window.location.origin}/auth/callback` 
            : undefined
        }
      })

      if (signUpError) {
        console.error("SIGNUP_ERR:", signUpError.message)
        setError(signUpError.message)
        setIsLoading(false)
        return
      }

      if (data.user || data.session) {
        router.push("/dashboard")
      } else if (data.data?.confirmation_sent) {
        setSuccess(true)
        setError(null)
      }
    } catch (err: unknown) {
      console.error("SIGNUP_ERR:", err)
      setError("Account created! Check your email to verify.")
      setSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuth = async (provider: "google" | "github") => {
    if (isLoading) return
    setIsLoading(true)
    setError(null)
    
    try {
      const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : undefined
      
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: redirectUrl }
      })

      if (oauthError) {
        console.error("OAUTH_ERR:", oauthError.message)
        setError(oauthError.message)
        setIsLoading(false)
      }
    } catch (err) {
      console.error("OAUTH_ERR:", err)
      setError("OAuth failed. Please try again.")
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const passwordStrength = React.useMemo(() => {
    const passed = passwordRequirements.filter(r => r.check(formData.password)).length
    if (passed === 0) return "none"
    if (passed <= 1) return "weak"
    if (passed === 2) return "medium"
    return "strong"
  }, [formData.password])

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <FlaskConical className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">InnovaSci</span>
          </Link>

          <h1 className="mt-8 text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start your free trial</p>

          {success && (
            <div className="mt-4 p-3 text-sm text-green-800 bg-green-50 rounded">
              Account created! Check your email to verify.
            </div>
          )}
          {error && !success && (
            <div className="mt-4 p-3 text-sm text-red-800 bg-red-50 rounded">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">Full name</label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name" name="name" type="text" value={formData.name}
                  onChange={handleChange} placeholder="Your name"
                  className="h-11 bg-secondary pl-10" required disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email" name="email" type="email" value={formData.email}
                  onChange={handleChange} placeholder="you@example.com"
                  className="h-11 bg-secondary pl-10" required disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">Password</label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password" name="password" type={showPassword ? "text" : "password"}
                  value={formData.password} onChange={handleChange}
                  placeholder="Create password" className="h-11 bg-secondary pl-10 pr-10" required disabled={isLoading}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {["weak", "medium", "strong"].map(lvl => (
                      <div key={lvl} className={`h-1 flex-1 rounded-full ${
                        lvl === "weak" && passwordStrength === "none" ? "bg-red-500" :
                        lvl === "weak" && passwordStrength === "weak" ? "bg-red-500" :
                        lvl === "medium" && passwordStrength === "medium" ? "bg-yellow-500" :
                        lvl === "strong" && passwordStrength === "strong" ? "bg-green-500" : "bg-gray-200"
                      }`} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Button type="submit" className="h-11 w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t"/></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-background text-muted-foreground">Or continue with</span></div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11" onClick={() => handleOAuth("google")} disabled={isLoading}>
              Google
            </Button>
            <Button variant="outline" className="h-11" onClick={() => handleOAuth("github")} disabled={isLoading}>
              GitHub
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/auth/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>

      <div className="hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
      </div>
    </div>
  )
}
