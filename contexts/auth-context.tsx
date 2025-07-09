"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"
import { getCurrentProfile } from "@/lib/auth"
import type { Database } from "@/lib/supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    try {
      console.log("Refreshing profile...")
      const profileData = await getCurrentProfile()
      setProfile(profileData)
      console.log("Profile refreshed:", profileData?.id || "No profile")
    } catch (error) {
      console.error("Error refreshing profile:", error)
      setProfile(null)
    }
  }

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener")

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error getting session:", error)
        setLoading(false)
        return
      }

      console.log("Initial session:", session?.user?.id || "No session")
      setUser(session?.user ?? null)

      if (session?.user) {
        refreshProfile().finally(() => setLoading(false))
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id || "No user")

      setUser(session?.user ?? null)

      if (session?.user) {
        // For signup events, add a longer delay to ensure profile creation is complete
        if (event === "SIGNED_UP") {
          console.log("User signed up, waiting for profile creation...")
          // Wait longer for profile creation to complete
          setTimeout(async () => {
            await refreshProfile()
            setLoading(false)
          }, 3000)
        } else {
          await refreshProfile()
          setLoading(false)
        }
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => {
      console.log("AuthProvider: Cleaning up auth listener")
      subscription.unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, profile, loading, refreshProfile }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
