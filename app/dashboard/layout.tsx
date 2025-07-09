"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile, loading, refreshProfile } = useAuth()
  const router = useRouter()
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleRetry = async () => {
    setIsRetrying(true)
    setRetryCount((prev) => prev + 1)
    try {
      await refreshProfile()
    } catch (error) {
      console.error("Retry failed:", error)
    } finally {
      setIsRetrying(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/auth/login")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // If user exists but no profile, show error with retry option
  if (user && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Setup Required</h3>
              <p className="text-sm text-gray-500 mb-4">
                Your account was created but your profile needs to be set up. This usually happens automatically.
              </p>
              <div className="space-y-2">
                <Button onClick={handleRetry} disabled={isRetrying} className="w-full">
                  {isRetrying ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Retrying...
                    </div>
                  ) : (
                    `Retry ${retryCount > 0 ? `(${retryCount + 1})` : ""}`
                  )}
                </Button>
                <Button variant="outline" onClick={handleBackToLogin} className="w-full bg-transparent">
                  Back to Login
                </Button>
              </div>
              {retryCount > 2 && (
                <p className="text-xs text-gray-400 mt-4">
                  If this persists, please contact support or try logging out and back in.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="hidden w-64 border-r bg-muted/40 md:block">{/* Sidebar is now in Header component */}</div>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
