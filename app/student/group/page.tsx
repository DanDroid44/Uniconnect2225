"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Mail, MessageCircle } from "lucide-react"

export default function StudentGroup() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  // Mock group data
  const groupInfo = {
    name: "CS Year 1 - Group A",
    faculty: "Computer Science",
    academic_year: "Year 1",
    total_students: 25,
    subjects: ["Programming Fundamentals", "Computer Networks", "Web Development"],
  }

  const classmates = [
    { id: 1, name: "Ana Silva", email: "ana.silva@student.edu.mz", phone: "+258 84 123 4567", status: "online" },
    { id: 2, name: "João Santos", email: "joao.santos@student.edu.mz", phone: "+258 85 234 5678", status: "offline" },
    { id: 3, name: "Maria Costa", email: "maria.costa@student.edu.mz", phone: "+258 86 345 6789", status: "online" },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@student.edu.mz",
      phone: "+258 87 456 7890",
      status: "offline",
    },
    {
      id: 5,
      name: "Sofia Pereira",
      email: "sofia.pereira@student.edu.mz",
      phone: "+258 84 567 8901",
      status: "online",
    },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusColor = (status: string) => {
    return status === "online" ? "bg-green-500" : "bg-gray-400"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Group Management</h1>
        <p className="text-muted-foreground">Connect and collaborate with your classmates</p>
      </div>

      {/* Group Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>{groupInfo.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Faculty</p>
              <p className="font-semibold">{groupInfo.faculty}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Academic Year</p>
              <p className="font-semibold">{groupInfo.academic_year}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="font-semibold">{groupInfo.total_students}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Shared Subjects</p>
              <p className="font-semibold">{groupInfo.subjects.length}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Subjects:</p>
            <div className="flex flex-wrap gap-2">
              {groupInfo.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center space-x-4 p-6">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold">Group Chat</h3>
              <p className="text-sm text-muted-foreground">Join the class discussion</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center space-x-4 p-6">
            <Users className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold">Study Groups</h3>
              <p className="text-sm text-muted-foreground">Form study partnerships</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center space-x-4 p-6">
            <Mail className="h-8 w-8 text-purple-600" />
            <div>
              <h3 className="font-semibold">Class Updates</h3>
              <p className="text-sm text-muted-foreground">Latest announcements</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Classmates */}
      <Card>
        <CardHeader>
          <CardTitle>Classmates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {classmates.map((classmate) => (
              <div key={classmate.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{getInitials(classmate.name)}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(classmate.status)}`}
                    ></div>
                  </div>
                  <div>
                    <p className="font-semibold">{classmate.name}</p>
                    <p className="text-sm text-muted-foreground">{classmate.email}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Group Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Group Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">Ana Silva</span> shared notes for Programming Fundamentals
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">João Santos</span> created a study group for Computer Networks exam
                </p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">Maria Costa</span> asked a question about Web Development assignment
                </p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
