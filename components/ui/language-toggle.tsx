"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Languages, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageToggle() {
  const { language, setLanguage, isLoading } = useLanguage()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Languages className="h-4 w-4" />
        <span className="sr-only">Toggle language</span>
      </Button>
    )
  }

  const handleLanguageChange = (newLanguage: "en" | "pt") => {
    console.log("Language toggle clicked:", newLanguage)
    setLanguage(newLanguage)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Languages className="h-4 w-4" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={language === "en" ? "bg-orange-100 dark:bg-orange-900/30" : ""}
        >
          <div className="flex items-center justify-between w-full">
            <span>English</span>
            {language === "en" && <Check className="h-4 w-4 text-orange-600" />}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("pt")}
          className={language === "pt" ? "bg-orange-100 dark:bg-orange-900/30" : ""}
        >
          <div className="flex items-center justify-between w-full">
            <span>Português</span>
            {language === "pt" && <Check className="h-4 w-4 text-orange-600" />}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
