"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, CreditCard, Bell, TrendingUp, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const stats = [
    {
      title: t("subjects"),
      value: "6",
      description: "Active subjects this semester",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/student/grades",
    },
    {
      title: t("final_average"),
      value: "15.2",
      description: "Current semester average",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/student/grades",
    },
    {
      title: t("payments"),
      value: "Current",
      description: "Payment status",
      icon: CreditCard,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      href: "/student/payments",
    },
    {
      title: t("notifications"),
      value: "3",
      description: "Unread notifications",
      icon: Bell,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/student/notifications",
    },
  ]

  const quickActions = [
    {
      title: "View Schedule",
      description: "Check your class timetable",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/student/schedule",
    },
    {
      title: "Group Management",
      description: "Connect with classmates",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/student/group",
    },
    {
      title: "Update Profile",
      description: "Manage your information",
      icon: GraduationCap,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/profile",
    },
  ]

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-responsive-2xl font-bold tracking-tight text-gray-900">
          {t("welcome_back")}, {profile?.full_name}
        </h1>
        <p className="text-responsive-base text-gray-600">
          {t("student")} • {profile?.faculty ? t(profile.faculty) : ""} •{" "}
          {profile?.academic_year ? t(profile.academic_year) : ""}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <Card className="card-hover cursor-pointer border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-responsive-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Card className="card-hover cursor-pointer border-0 shadow-sm">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className={`p-3 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{action.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-responsive-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "New grade posted for Programming Fundamentals",
                time: "2 hours ago",
                color: "bg-blue-500",
              },
              {
                title: "Payment confirmed for February 2024",
                time: "1 day ago",
                color: "bg-green-500",
              },
              {
                title: "Exam scheduled for Data Structures",
                time: "3 days ago",
                color: "bg-orange-500",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 ${activity.color} rounded-full mt-2 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
