import { supabase } from "./supabase"
import type { Database } from "./supabase"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export async function signUp(
  email: string,
  password: string,
  userData: {
    username: string
    full_name: string
    role: "student" | "lecturer" | "coordinator"
    faculty?: "computer_science" | "accounting" | "business_management"
    academic_year?: "year_1" | "year_2" | "year_3" | "year_4"
    course?: string
  },
) {
  try {
    console.log("Starting signup process...")

    // First, sign up the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          // Store some basic info in auth metadata
          full_name: userData.full_name,
          role: userData.role,
        },
      },
    })

    if (authError) {
      console.error("Auth signup error:", authError)
      throw authError
    }

    if (!authData.user) {
      throw new Error("No user returned from signup")
    }

    console.log("Auth user created:", authData.user.id)

    // Wait a moment to ensure the auth user is fully created
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if the auth user exists in the auth.users table
    const { data: authUser, error: authUserError } = await supabase.auth.getUser()

    if (authUserError || !authUser.user) {
      console.error("Auth user verification failed:", authUserError)
      throw new Error("Failed to verify auth user creation")
    }

    console.log("Auth user verified:", authUser.user.id)

    // Now create the profile
    const profileData = {
      id: authData.user.id,
      email,
      username: userData.username,
      full_name: userData.full_name,
      role: userData.role,
      faculty: userData.faculty || null,
      academic_year: userData.academic_year || null,
      course: userData.course || null,
    }

    console.log("Creating profile with data:", profileData)

    // Use a direct insert with error handling
    const { data: profile, error: profileError } = await supabase.from("profiles").insert(profileData).select().single()

    if (profileError) {
      console.error("Profile creation error:", profileError)

      // If it's a foreign key constraint error, try to handle it
      if (profileError.code === "23503") {
        console.log("Foreign key constraint error, retrying after delay...")

        // Wait a bit longer and try again
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const { data: retryProfile, error: retryError } = await supabase
          .from("profiles")
          .insert(profileData)
          .select()
          .single()

        if (retryError) {
          console.error("Retry failed:", retryError)
          throw new Error(`Profile creation failed: ${retryError.message}`)
        }

        console.log("Profile created on retry:", retryProfile)
        return authData
      }

      // Handle duplicate key errors
      if (profileError.code === "23505") {
        if (profileError.message.includes("profiles_username_key")) {
          throw new Error("Username already exists. Please choose a different username.")
        }
        if (profileError.message.includes("profiles_email_key")) {
          throw new Error("Email already exists. Please use a different email.")
        }
        if (profileError.message.includes("profiles_pkey")) {
          // Profile already exists, which is fine
          console.log("Profile already exists for user")
          return authData
        }
      }

      throw new Error(`Profile creation failed: ${profileError.message}`)
    }

    console.log("Profile created successfully:", profile)
    return authData
  } catch (error) {
    console.error("SignUp error:", error)

    // If profile creation failed but auth user was created, we should clean up
    // But we'll let the user try to sign in instead, as the auth user exists
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log("Attempting to sign in...")
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("SignIn error:", error)
      throw error
    }

    console.log("Sign in successful")
    return data
  } catch (error) {
    console.error("SignIn error:", error)
    throw error
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error("SignOut error:", error)
    throw error
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("getCurrentUser error:", error)
    return null
  }
}

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      console.log("No authenticated user found")
      return null
    }

    console.log("Fetching profile for user:", user.id)

    const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    if (error) {
      if (error.code === "PGRST116") {
        // No profile found
        console.log("No profile found for user:", user.id)
        return null
      }
      console.error("Error fetching profile:", error)
      return null
    }

    console.log("Profile fetched successfully:", profile.id)
    return profile
  } catch (error) {
    console.error("getCurrentProfile error:", error)
    return null
  }
}
