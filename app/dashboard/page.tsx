"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, GraduationCap, CreditCard, Bell, TrendingUp, Clock, Calendar } from "lucide-react"

export default function DashboardPage() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>{t("loading")}</p>
        </div>
      </div>
    )
  }

  const getStudentStats = () => [
    {
      title: t("subjects"),
      value: "6",
      description: "Active subjects this semester",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: t("final_average"),
      value: "15.2",
      description: "Current semester average",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: t("payments"),
      value: "Current",
      description: "Payment status",
      icon: CreditCard,
      color: "text-emerald-600",
    },
    {
      title: t("notifications"),
      value: "3",
      description: "Unread notifications",
      icon: Bell,
      color: "text-orange-600",
    },
  ]

  const getLecturerStats = () => [
    {
      title: t("students"),
      value: "45",
      description: "Total students",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: t("subjects"),
      value: "3",
      description: "Teaching subjects",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Classes Today",
      value: "4",
      description: "Scheduled classes",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Assignments",
      value: "12",
      description: "Pending grading",
      icon: GraduationCap,
      color: "text-orange-600",
    },
  ]

  const getCoordinatorStats = () => [
    {
      title: "Total Students",
      value: "234",
      description: "Enrolled students",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Lecturers",
      value: "18",
      description: "Active lecturers",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Pending Payments",
      value: "23",
      description: "Students with overdue payments",
      icon: CreditCard,
      color: "text-red-600",
    },
    {
      title: "Active Subjects",
      value: "36",
      description: "Subjects this semester",
      icon: BookOpen,
      color: "text-purple-600",
    },
  ]

  const getStats = () => {
    switch (profile.role) {
      case "student":
        return getStudentStats()
      case "lecturer":
        return getLecturerStats()
      case "coordinator":
        return getCoordinatorStats()
      default:
        return []
    }
  }

  const stats = getStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("welcome_back")}, {profile.full_name}
        </h1>
        <p className="text-muted-foreground">
          {t(profile.role)} • {profile.faculty ? t(profile.faculty) : "UniConnect"}
          {profile.academic_year && ` • ${t(profile.academic_year)}`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profile.role === "student" && (
              <>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>View Schedule</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  <span>Check Grades</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span>Payment History</span>
                </div>
              </>
            )}
            {profile.role === "lecturer" && (
              <>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Manage Students</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                  <span>Grade Assignments</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <span>Schedule Classes</span>
                </div>
              </>
            )}
            {profile.role === "coordinator" && (
              <>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span>Manage Students</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-red-600" />
                  <span>Payment Reports</span>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Academic Overview</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
