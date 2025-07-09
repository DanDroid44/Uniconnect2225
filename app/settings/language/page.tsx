"use client"

import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages, Check } from "lucide-react"

export default function LanguageSettings() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation(language)

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "pt", name: "Portuguese", nativeName: "Português" },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Language Settings</h1>
        <p className="text-muted-foreground">Choose your preferred language for the interface</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="h-5 w-5" />
            <span>Interface Language</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-colors ${
                  language === lang.code ? "border-blue-500 bg-blue-50" : "hover:bg-muted/50"
                }`}
                onClick={() => setLanguage(lang.code as any)}
              >
                <div>
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-sm text-muted-foreground">{lang.nativeName}</p>
                </div>
                {language === lang.code && <Check className="h-5 w-5 text-blue-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium mb-2">Supported Languages:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• English - Full support for all features</li>
                <li>• Portuguese - Complete localization for Mozambican users</li>
              </ul>
            </div>

            <div>
              <p className="font-medium mb-2">Note:</p>
              <p className="text-muted-foreground">
                Language changes will be applied immediately across the entire application. Your preference will be
                saved and remembered for future sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
