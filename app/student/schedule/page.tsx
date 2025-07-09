"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User } from "lucide-react"

export default function StudentSchedule() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  // Mock schedule data
  const schedule = [
    {
      day: "monday",
      classes: [
        {
          subject: "Programming Fundamentals",
          lecturer: "Dr. Silva",
          time: "08:00 - 10:00",
          room: "Lab 101",
          type: "Lecture",
        },
        {
          subject: "Computer Networks",
          lecturer: "Prof. Santos",
          time: "14:00 - 16:00",
          room: "Room 205",
          type: "Practical",
        },
      ],
    },
    {
      day: "tuesday",
      classes: [
        {
          subject: "Web Development",
          lecturer: "Dr. Costa",
          time: "10:00 - 12:00",
          room: "Lab 102",
          type: "Practical",
        },
      ],
    },
    {
      day: "wednesday",
      classes: [
        {
          subject: "Programming Fundamentals",
          lecturer: "Dr. Silva",
          time: "08:00 - 10:00",
          room: "Room 301",
          type: "Tutorial",
        },
        {
          subject: "Computer Networks",
          lecturer: "Prof. Santos",
          time: "16:00 - 18:00",
          room: "Lab 103",
          type: "Lab",
        },
      ],
    },
    {
      day: "thursday",
      classes: [
        {
          subject: "Web Development",
          lecturer: "Dr. Costa",
          time: "14:00 - 17:00",
          room: "Lab 102",
          type: "Project",
        },
      ],
    },
    {
      day: "friday",
      classes: [
        {
          subject: "Programming Fundamentals",
          lecturer: "Dr. Silva",
          time: "09:00 - 11:00",
          room: "Room 201",
          type: "Lecture",
        },
      ],
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "lecture":
        return "default"
      case "practical":
        return "secondary"
      case "lab":
        return "outline"
      case "tutorial":
        return "destructive"
      case "project":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("schedule")}</h1>
        <p className="text-muted-foreground">
          Weekly timetable for {profile?.academic_year ? t(profile.academic_year) : ""} -{" "}
          {profile?.faculty ? t(profile.faculty) : ""}
        </p>
      </div>

      {/* Current Semester Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Semester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Semester</p>
              <p className="font-semibold">{t("first_semester")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Academic Year</p>
              <p className="font-semibold">2024-2025</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Classes/Week</p>
              <p className="font-semibold">12 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <div className="grid gap-4">
        {schedule.map((day) => (
          <Card key={day.day}>
            <CardHeader>
              <CardTitle className="capitalize">{t(day.day)}</CardTitle>
            </CardHeader>
            <CardContent>
              {day.classes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No classes scheduled</p>
              ) : (
                <div className="space-y-4">
                  {day.classes.map((classItem, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{classItem.subject}</h3>
                        <Badge variant={getTypeColor(classItem.type) as any}>{classItem.type}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{classItem.room}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{classItem.lecturer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Exams */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Exams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Programming Fundamentals - Test 2</p>
                <p className="text-sm text-muted-foreground">March 15, 2024 • 14:00 - 16:00 • Room 301</p>
              </div>
              <Badge variant="destructive">In 3 days</Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-semibold">Computer Networks - Final Exam</p>
                <p className="text-sm text-muted-foreground">March 22, 2024 • 09:00 - 12:00 • Hall A</p>
              </div>
              <Badge variant="secondary">In 10 days</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
