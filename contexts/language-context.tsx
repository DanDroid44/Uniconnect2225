"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Language } from "@/lib/i18n"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get saved language from localStorage or detect browser language
    const getSavedLanguage = () => {
      try {
        const saved = localStorage.getItem("uniconnect-language") as Language
        if (saved && (saved === "en" || saved === "pt")) {
          return saved
        }

        // Detect browser language
        const browserLang = navigator.language.toLowerCase()
        if (browserLang.startsWith("pt")) {
          return "pt"
        }

        return "en"
      } catch (error) {
        console.error("Error getting saved language:", error)
        return "en"
      }
    }

    const initialLanguage = getSavedLanguage()
    setLanguageState(initialLanguage)
    setIsLoading(false)
  }, [])

  const setLanguage = (newLanguage: Language) => {
    console.log("Setting language to:", newLanguage)
    setLanguageState(newLanguage)

    try {
      localStorage.setItem("uniconnect-language", newLanguage)
    } catch (error) {
      console.error("Error saving language:", error)
    }
  }

  return <LanguageContext.Provider value={{ language, setLanguage, isLoading }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
