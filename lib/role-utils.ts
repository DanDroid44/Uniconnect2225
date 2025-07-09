import type { Database } from "./supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export function canViewAllProfiles(profile: Profile | null): boolean {
  return profile?.role === "coordinator"
}

export function canManageStudents(profile: Profile | null): boolean {
  return profile?.role === "coordinator" || profile?.role === "lecturer"
}

export function canViewGrades(profile: Profile | null, studentId?: string): boolean {
  if (!profile) return false

  if (profile.role === "coordinator") return true
  if (profile.role === "student" && profile.id === studentId) return true
  if (profile.role === "lecturer") return true // Will be filtered by subject/group in queries

  return false
}

export function canManagePayments(profile: Profile | null): boolean {
  return profile?.role === "coordinator"
}

export function canViewPayments(profile: Profile | null, studentId?: string): boolean {
  if (!profile) return false

  if (profile.role === "coordinator") return true
  if (profile.role === "student" && profile.id === studentId) return true

  return false
}

export function isStudent(profile: Profile | null): boolean {
  return profile?.role === "student"
}

export function isLecturer(profile: Profile | null): boolean {
  return profile?.role === "lecturer"
}

export function isCoordinator(profile: Profile | null): boolean {
  return profile?.role === "coordinator"
}
