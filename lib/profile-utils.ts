import { supabase } from "./supabase"
import type { Database } from "./supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export async function getProfileSafely(userId: string): Promise<Profile | null> {
  try {
    console.log(`Fetching profile for user: ${userId}`)

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No profile found
        console.log("No profile found for user:", userId)
        return null
      }
      console.error("Error fetching profile:", error)
      return null
    }

    console.log("Profile found successfully:", profile.id)
    return profile
  } catch (error) {
    console.error("Error in getProfileSafely:", error)
    return null
  }
}

export async function createProfileSafely(
  profileData: Database["public"]["Tables"]["profiles"]["Insert"],
): Promise<Profile | null> {
  try {
    console.log(`Creating profile for user: ${profileData.id}`)

    // First verify the auth user exists
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(profileData.id)

    if (authError || !authUser.user) {
      console.error("Auth user does not exist:", authError)
      throw new Error("Cannot create profile: auth user does not exist")
    }

    // Check if profile already exists
    const existingProfile = await getProfileSafely(profileData.id)
    if (existingProfile) {
      console.log("Profile already exists, returning existing profile")
      return existingProfile
    }

    // Ensure username is unique
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", profileData.username)
      .single()

    const finalProfileData = { ...profileData }

    if (existingUsername) {
      // Make username unique by adding timestamp
      const timestamp = Date.now().toString().slice(-6)
      finalProfileData.username = `${profileData.username}_${timestamp}`
      console.log(`Username conflict resolved: ${profileData.username} -> ${finalProfileData.username}`)
    }

    // Create the profile
    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert(finalProfileData)
      .select()
      .single()

    if (createError) {
      console.error("Error creating profile:", createError)

      // Handle specific constraint violations
      if (createError.code === "23503") {
        throw new Error("Cannot create profile: user authentication record not found")
      }

      if (createError.code === "23505") {
        if (createError.message.includes("profiles_username_key")) {
          // Try with a more unique username
          const uniqueTimestamp = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          finalProfileData.username = `${profileData.username}_${uniqueTimestamp}`

          const { data: retryProfile, error: retryError } = await supabase
            .from("profiles")
            .insert(finalProfileData)
            .select()
            .single()

          if (retryError) {
            console.error("Retry with unique username failed:", retryError)
            throw new Error(`Profile creation failed: ${retryError.message}`)
          }

          return retryProfile
        }

        if (createError.message.includes("profiles_pkey")) {
          // Primary key violation - profile already exists
          return await getProfileSafely(profileData.id)
        }
      }

      throw new Error(`Profile creation failed: ${createError.message}`)
    }

    console.log("Profile created successfully:", newProfile.id)
    return newProfile
  } catch (error) {
    console.error("Error in createProfileSafely:", error)
    throw error
  }
}

export async function ensureProfileExists(userId: string, email: string): Promise<Profile | null> {
  try {
    // First, try to get the profile
    const existingProfile = await getProfileSafely(userId)
    if (existingProfile) {
      return existingProfile
    }

    // Profile doesn't exist, create a basic one
    console.log("Creating missing profile for user:", userId)

    const profileData = {
      id: userId,
      email: email,
      username: `user_${userId.slice(0, 8)}_${Date.now().toString().slice(-6)}`,
      full_name: email.split("@")[0], // Temporary full name
      role: "student" as const, // Default role
      faculty: null,
      academic_year: null,
      course: null,
      bio: null,
      age: null,
    }

    return await createProfileSafely(profileData)
  } catch (error) {
    console.error("Error in ensureProfileExists:", error)
    return null
  }
}
