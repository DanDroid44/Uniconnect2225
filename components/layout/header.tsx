"use client"

import { Sidebar } from "./sidebar"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function Header() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sidebar />
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          {profile && (
            <div className="text-sm">
              <span className="text-muted-foreground">{t("welcome_back")}, </span>
              <span className="font-medium">{profile.username}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
