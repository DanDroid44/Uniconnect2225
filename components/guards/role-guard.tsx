"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  allowedRoles: string[]
  children: React.ReactNode
  fallbackPath?: string
}

export function RoleGuard({ allowedRoles, children, fallbackPath = "/dashboard" }: RoleGuardProps) {
  const { profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && profile && !allowedRoles.includes(profile.role)) {
      router.push(fallbackPath)
    }
  }, [profile, loading, allowedRoles, router, fallbackPath])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!profile || !allowedRoles.includes(profile.role)) {
    return null
  }

  return <>{children}</>
}
