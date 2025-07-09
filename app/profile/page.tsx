"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { User, BookOpen, Edit3, Save, X } from "lucide-react"

export default function ProfilePage() {
  const { profile, refreshProfile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    bio: profile?.bio || "",
    age: profile?.age || "",
  })

  const handleSave = async () => {
    if (!profile) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          email: formData.email,
          bio: formData.bio,
          age: formData.age ? Number.parseInt(formData.age) : null,
        })
        .eq("id", profile.id)

      if (error) throw error

      await refreshProfile()
      setEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || "",
      email: profile?.email || "",
      bio: profile?.bio || "",
      age: profile?.age?.toString() || "",
    })
    setEditing(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("profile")}</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-lg">{getInitials(profile.full_name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile.full_name}</h2>
              <p className="text-muted-foreground">@{profile.username}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline">{t(profile.role)}</Badge>
                {profile.faculty && <Badge variant="secondary">{t(profile.faculty)}</Badge>}
                {profile.academic_year && <Badge variant="secondary">{t(profile.academic_year)}</Badge>}
              </div>
            </div>
            <Button
              variant={editing ? "destructive" : "outline"}
              onClick={editing ? handleCancel : () => setEditing(true)}
            >
              {editing ? <X className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
              {editing ? t("cancel") : t("edit")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">{t("full_name")}</Label>
              {editing ? (
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{profile.full_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              {editing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{profile.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">{t("age")}</Label>
              {editing ? (
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded">{profile.age || "Not specified"}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t("bio")}</Label>
              {editing ? (
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-sm p-2 bg-muted rounded min-h-[60px]">{profile.bio || "No bio provided"}</p>
              )}
            </div>

            {editing && (
              <Button onClick={handleSave} disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {t("save")}
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("username")}</Label>
              <p className="text-sm p-2 bg-muted rounded">{profile.username}</p>
            </div>

            <div className="space-y-2">
              <Label>{t("role")}</Label>
              <p className="text-sm p-2 bg-muted rounded">{t(profile.role)}</p>
            </div>

            {profile.faculty && (
              <div className="space-y-2">
                <Label>{t("faculty")}</Label>
                <p className="text-sm p-2 bg-muted rounded">{t(profile.faculty)}</p>
              </div>
            )}

            {profile.academic_year && (
              <div className="space-y-2">
                <Label>{t("academic_year")}</Label>
                <p className="text-sm p-2 bg-muted rounded">{t(profile.academic_year)}</p>
              </div>
            )}

            {profile.course && (
              <div className="space-y-2">
                <Label>{t("course")}</Label>
                <p className="text-sm p-2 bg-muted rounded">{profile.course}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label>Member Since</Label>
              <p className="text-sm p-2 bg-muted rounded">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Language Preference</p>
                <p className="text-sm text-muted-foreground">Choose your preferred language</p>
              </div>
              <Select value={language} onValueChange={() => {}}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Button variant="outline" size="sm">
                Enabled
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Privacy Settings</p>
                <p className="text-sm text-muted-foreground">Control who can see your information</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
