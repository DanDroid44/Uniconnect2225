"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertCircle, Info, Calendar } from "lucide-react"

export default function StudentNotifications() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "New Grade Posted",
      message: "Your grade for Programming Fundamentals Assignment 2 has been posted. Score: 16/20",
      type: "grade",
      read: false,
      created_at: "2024-03-10T14:30:00Z",
      sender: "Dr. Silva",
    },
    {
      id: 2,
      title: "Exam Schedule Update",
      message: "Computer Networks final exam has been rescheduled to March 25, 2024 at 09:00 AM in Hall A",
      type: "exam",
      read: false,
      created_at: "2024-03-09T10:15:00Z",
      sender: "Prof. Santos",
    },
    {
      id: 3,
      title: "Payment Reminder",
      message: "Your March 2024 tuition fee payment is due on March 31, 2024. Amount: 5,670 MT",
      type: "payment",
      read: true,
      created_at: "2024-03-08T09:00:00Z",
      sender: "Finance Office",
    },
    {
      id: 4,
      title: "Class Cancelled",
      message: "Web Development practical class on March 12, 2024 has been cancelled due to lecturer unavailability",
      type: "class",
      read: true,
      created_at: "2024-03-07T16:45:00Z",
      sender: "Dr. Costa",
    },
    {
      id: 5,
      title: "New Assignment Posted",
      message: "A new assignment for Computer Networks has been posted. Due date: March 20, 2024",
      type: "assignment",
      read: true,
      created_at: "2024-03-06T11:20:00Z",
      sender: "Prof. Santos",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "grade":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "exam":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "payment":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "class":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "assignment":
        return <Info className="h-5 w-5 text-purple-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "grade":
        return "border-l-green-500"
      case "exam":
        return "border-l-red-500"
      case "payment":
        return "border-l-yellow-500"
      case "class":
        return "border-l-blue-500"
      case "assignment":
        return "border-l-purple-500"
      default:
        return "border-l-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("notifications")}</h1>
        <p className="text-muted-foreground">Stay updated with important announcements and alerts</p>
      </div>

      {/* Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Bell className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">New notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Info className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <p className="text-xs text-muted-foreground">All notifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-xs text-muted-foreground">Recent updates</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
        <Button variant="outline" size="sm">
          Filter by Type
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`border-l-4 ${getNotificationColor(notification.type)} ${!notification.read ? "bg-blue-50" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>From: {notification.sender}</span>
                      <span>{formatDate(notification.created_at)}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {notification.read ? "Mark Unread" : "Mark Read"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Grade Updates</p>
                <p className="text-sm text-muted-foreground">Get notified when new grades are posted</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Exam Schedules</p>
                <p className="text-sm text-muted-foreground">Receive alerts about exam dates and changes</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Reminders</p>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming payment due dates</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
