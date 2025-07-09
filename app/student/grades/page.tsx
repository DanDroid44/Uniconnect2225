"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function StudentGrades() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  // Mock data - in real app, fetch from Supabase
  const subjects = [
    {
      id: 1,
      name: "Programming Fundamentals",
      code: "CS101",
      assignment_1: 16,
      assignment_2: 14,
      test_1: 15,
      test_2: 17,
      exam: 16,
      final_average: 15.8,
      credits: 3,
    },
    {
      id: 2,
      name: "Computer Networks",
      code: "CS102",
      assignment_1: 18,
      assignment_2: 16,
      test_1: 17,
      test_2: 15,
      exam: null,
      final_average: null,
      credits: 3,
    },
    {
      id: 3,
      name: "Web Development",
      code: "CS103",
      assignment_1: 19,
      assignment_2: 17,
      test_1: 18,
      test_2: null,
      exam: null,
      final_average: null,
      credits: 3,
    },
  ]

  const getGradeColor = (grade: number | null) => {
    if (!grade) return "text-gray-400"
    if (grade >= 16) return "text-green-600"
    if (grade >= 14) return "text-blue-600"
    if (grade >= 10) return "text-yellow-600"
    return "text-red-600"
  }

  const getPassStatus = (average: number | null) => {
    if (!average) return { status: "Pending", color: "secondary" }
    if (average >= 10) return { status: "Pass", color: "default" }
    return { status: "Fail", color: "destructive" }
  }

  const overallAverage =
    subjects.filter((s) => s.final_average).reduce((sum, s) => sum + s.final_average!, 0) /
    subjects.filter((s) => s.final_average).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("grades")}</h1>
        <p className="text-muted-foreground">
          Academic performance for {profile?.academic_year ? t(profile.academic_year) : ""} -{" "}
          {profile?.faculty ? t(profile.faculty) : ""}
        </p>
      </div>

      {/* Overall Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{overallAverage.toFixed(1)}</div>
              <p className="text-sm text-muted-foreground">Overall Average</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {subjects.filter((s) => s.final_average && s.final_average >= 10).length}
              </div>
              <p className="text-sm text-muted-foreground">Subjects Passed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {subjects.filter((s) => !s.final_average).length}
              </div>
              <p className="text-sm text-muted-foreground">Pending Results</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to Graduation</span>
              <span>75%</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Subjects */}
      <div className="grid gap-4">
        {subjects.map((subject) => {
          const passStatus = getPassStatus(subject.final_average)
          return (
            <Card key={subject.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {subject.code} • {subject.credits} Credits
                    </p>
                  </div>
                  <Badge variant={passStatus.color as any}>{passStatus.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getGradeColor(subject.assignment_1)}`}>
                      {subject.assignment_1 || "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t("assignment_1")}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getGradeColor(subject.assignment_2)}`}>
                      {subject.assignment_2 || "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t("assignment_2")}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getGradeColor(subject.test_1)}`}>
                      {subject.test_1 || "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t("test_1")}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getGradeColor(subject.test_2)}`}>
                      {subject.test_2 || "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t("test_2")}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getGradeColor(subject.exam)}`}>{subject.exam || "-"}</div>
                    <p className="text-xs text-muted-foreground">{t("exam")}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-xl font-bold ${getGradeColor(subject.final_average)}`}>
                      {subject.final_average?.toFixed(1) || "-"}
                    </div>
                    <p className="text-xs text-muted-foreground">{t("final_average")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Grading Scale */}
      <Card>
        <CardHeader>
          <CardTitle>Grading Scale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span>16-20: Excellent</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>14-15: Good</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-600 rounded"></div>
              <span>10-13: Pass</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span>0-9: Fail</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
