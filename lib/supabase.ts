import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://krpyomixusjskuidnyeq.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycHlvbWl4dXNqc2t1aWRueWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNTc4OTUsImV4cCI6MjA2NzYzMzg5NX0.5rnU5NuP12-M87PDeZExmvCRvmovulfabXbqjtQ8uyk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Rest of the Database type definitions remain the same
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          email: string
          role: "student" | "lecturer" | "coordinator"
          faculty: "computer_science" | "accounting" | "business_management" | null
          academic_year: "year_1" | "year_2" | "year_3" | "year_4" | null
          course: string | null
          bio: string | null
          age: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          email: string
          role: "student" | "lecturer" | "coordinator"
          faculty?: "computer_science" | "accounting" | "business_management" | null
          academic_year?: "year_1" | "year_2" | "year_3" | "year_4" | null
          course?: string | null
          bio?: string | null
          age?: number | null
        }
        Update: {
          username?: string
          full_name?: string
          email?: string
          faculty?: "computer_science" | "accounting" | "business_management" | null
          academic_year?: "year_1" | "year_2" | "year_3" | "year_4" | null
          course?: string | null
          bio?: string | null
          age?: number | null
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          code: string
          faculty: "computer_science" | "accounting" | "business_management"
          academic_year: "year_1" | "year_2" | "year_3" | "year_4"
          credits: number
          created_at: string
        }
      }
      grades: {
        Row: {
          id: string
          student_id: string
          subject_id: string
          assignment_1: number | null
          assignment_2: number | null
          test_1: number | null
          test_2: number | null
          exam: number | null
          final_average: number | null
          semester: "first" | "second"
          academic_year_period: string
          created_at: string
          updated_at: string
        }
      }
      payments: {
        Row: {
          id: string
          student_id: string
          amount: number
          month: number
          year: number
          status: "paid" | "pending" | "overdue"
          paid_at: string | null
          created_at: string
        }
      }
      schedules: {
        Row: {
          id: string
          subject_id: string
          group_id: string
          lecturer_id: string
          day_of_week: number
          start_time: string
          end_time: string
          room: string | null
          semester: "first" | "second"
          academic_year_period: string
          created_at: string
        }
      }
      notifications: {
        Row: {
          id: string
          recipient_id: string
          title: string
          message: string
          type: string
          read: boolean
          created_at: string
        }
      }
    }
  }
}
