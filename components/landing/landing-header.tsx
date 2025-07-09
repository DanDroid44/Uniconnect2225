"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GraduationCap, Menu } from "lucide-react"
import { SimpleLanguageToggle } from "@/components/ui/simple-language-toggle"
import { SimpleThemeToggle } from "@/components/ui/simple-theme-toggle"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container-responsive">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">UniConnect</span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <SimpleThemeToggle />
            <SimpleLanguageToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600 dark:text-gray-300">
                {t("login")}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="btn-primary">
                {t("get_started")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <SimpleThemeToggle />
            <SimpleLanguageToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-lg font-bold">UniConnect</span>
                  </div>

                  <div className="flex flex-col space-y-3 pt-6 border-t">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full btn-secondary bg-transparent">
                        {t("login")}
                      </Button>
                    </Link>
                    <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full btn-primary">{t("get_started")}</Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
