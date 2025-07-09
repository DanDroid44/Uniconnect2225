"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { signUp } from "@/lib/auth"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { LanguageToggle } from "@/components/ui/language-toggle"
import { SimpleThemeToggle } from "@/components/ui/simple-theme-toggle"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    full_name: "",
    role: "" as "student" | "lecturer" | "coordinator" | "",
    faculty: "" as "computer_science" | "accounting" | "business_management" | "",
    academic_year: "" as "year_1" | "year_2" | "year_3" | "year_4" | "",
    course: "",
  })

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.username || !formData.full_name || !formData.role) {
      throw new Error("Please fill in all required fields")
    }

    if (formData.password.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }

    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match")
    }

    if (formData.role === "student" && (!formData.faculty || !formData.academic_year)) {
      throw new Error("Students must select faculty and academic year")
    }

    if (formData.role === "lecturer" && !formData.faculty) {
      throw new Error("Lecturers must select faculty")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw new Error("Please enter a valid email address")
    }

    // Validate username (no spaces, special characters)
    const usernameRegex = /^[a-zA-Z0-9_]+$/
    if (!usernameRegex.test(formData.username)) {
      throw new Error("Username can only contain letters, numbers, and underscores")
    }

    if (formData.username.length < 3) {
      throw new Error("Username must be at least 3 characters long")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      validateForm()

      // Generate a more unique username to avoid conflicts
      const timestamp = Date.now().toString().slice(-4)
      const uniqueUsername = `${formData.username}_${timestamp}`

      const userData: any = {
        username: uniqueUsername,
        full_name: formData.full_name,
        role: formData.role,
      }

      if (formData.role === "student") {
        userData.faculty = formData.faculty
        userData.academic_year = formData.academic_year
      } else if (formData.role === "lecturer") {
        userData.faculty = formData.faculty
        userData.course = formData.course || null
      }

      console.log("Submitting registration with data:", userData)

      await signUp(formData.email, formData.password, userData)

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login?message=Registration successful! Please log in with your credentials.")
      }, 3000)
    } catch (error: any) {
      console.error("Registration error:", error)

      // Provide user-friendly error messages
      let errorMessage = error.message || "Registration failed. Please try again."

      if (errorMessage.includes("User already registered")) {
        errorMessage = "An account with this email already exists. Please try logging in instead."
      } else if (errorMessage.includes("Username already exists")) {
        errorMessage = "This username is already taken. Please choose a different one."
      } else if (errorMessage.includes("foreign key constraint")) {
        errorMessage = "There was a technical issue creating your account. Please try again in a moment."
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 gradient-bg-light dark:gradient-bg-dark">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Registration Successful!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Your account has been created successfully. You will be redirected to the login page shortly.
              </p>
              <div className="animate-pulse">
                <div className="h-2 bg-orange-200 rounded-full">
                  <div className="h-2 bg-orange-600 rounded-full animate-pulse" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 gradient-bg-light dark:gradient-bg-dark">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">UniConnect</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <SimpleThemeToggle />
              <LanguageToggle />
            </div>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-gray-700 dark:text-gray-300">
                  {t("full_name")} *
                </Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                  disabled={loading}
                  placeholder="Enter your full name"
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 dark:text-gray-300">
                  {t("username")} *
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                  required
                  disabled={loading}
                  placeholder="Choose username"
                  minLength={3}
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                {t("email")} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                required
                disabled={loading}
                placeholder="Enter your email address"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                  Password *
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  disabled={loading}
                  placeholder="Create password"
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  disabled={loading}
                  placeholder="Confirm password"
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                {t("role")} *
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: any) =>
                  setFormData({ ...formData, role: value, faculty: "", academic_year: "" })
                }
                disabled={loading}
              >
                <SelectTrigger className="border-gray-300 dark:border-gray-600">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">{t("student")}</SelectItem>
                  <SelectItem value="lecturer">{t("lecturer")}</SelectItem>
                  <SelectItem value="coordinator">{t("coordinator")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(formData.role === "student" || formData.role === "lecturer") && (
              <div className="space-y-2">
                <Label htmlFor="faculty" className="text-gray-700 dark:text-gray-300">
                  {t("faculty")} *
                </Label>
                <Select
                  value={formData.faculty}
                  onValueChange={(value: any) => setFormData({ ...formData, faculty: value })}
                  disabled={loading}
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select faculty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer_science">{t("computer_science")}</SelectItem>
                    <SelectItem value="accounting">{t("accounting")}</SelectItem>
                    <SelectItem value="business_management">{t("business_management")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="academic_year" className="text-gray-700 dark:text-gray-300">
                  {t("academic_year")} *
                </Label>
                <Select
                  value={formData.academic_year}
                  onValueChange={(value: any) => setFormData({ ...formData, academic_year: value })}
                  disabled={loading}
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year_1">{t("year_1")}</SelectItem>
                    <SelectItem value="year_2">{t("year_2")}</SelectItem>
                    <SelectItem value="year_3">{t("year_3")}</SelectItem>
                    <SelectItem value="year_4">{t("year_4")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.role === "lecturer" && (
              <div className="space-y-2">
                <Label htmlFor="course" className="text-gray-700 dark:text-gray-300">
                  Specialization (Optional)
                </Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g., Programming, Databases, etc."
                  disabled={loading}
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            )}

            <Button type="submit" className="w-full btn-primary" disabled={loading}>
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-orange-600 hover:text-orange-500">
              Sign in here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
