"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function SimpleLanguageToggle() {
  const { language, setLanguage, isLoading } = useLanguage()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <Button variant="ghost" size="sm" className="h-9 px-3">
        EN
      </Button>
    )
  }

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en"
    console.log("Simple language toggle:", language, "->", newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <Button variant="ghost" size="sm" className="h-9 px-3 font-medium" onClick={toggleLanguage}>
      {language === "en" ? "EN" : "PT"}
    </Button>
  )
}
