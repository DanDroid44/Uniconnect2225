"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useRoleGuard(allowedRoles: string[]) {
  const { profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && profile && !allowedRoles.includes(profile.role)) {
      router.push("/dashboard")
    }
  }, [profile, loading, allowedRoles, router])

  return { profile, loading, hasAccess: profile ? allowedRoles.includes(profile.role) : false }
}
