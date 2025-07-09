"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, BookOpen, Calendar } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function HeroSection() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  return (
    <section className="py-16 sm:py-20 lg:py-24 gradient-bg-light dark:gradient-bg-dark">
      <div className="container-responsive">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium bg-orange-100 text-orange-800 border-orange-200 mb-8 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700">
            🎓 {language === "pt" ? "Feito para Universidades Moçambicanas" : "Made for Mozambican Universities"}
          </div>

          {/* Headline */}
          <h1 className="text-responsive-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {language === "pt" ? (
              <>
                Gestão Universitária <br />
                <span className="text-gradient">Simplificada</span>
              </>
            ) : (
              <>
                University Management <br />
                <span className="text-gradient">Made Simple</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-responsive-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("hero_subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/register">
              <Button size="lg" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
                {language === "pt" ? "Começar Grátis" : "Start Free Today"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="btn-secondary w-full sm:w-auto text-lg px-8 py-4 bg-transparent"
              >
                {t("sign_in")}
              </Button>
            </Link>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {language === "pt" ? "Conectar" : "Connect"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "pt" ? "Estudantes e Professores" : "Students & Lecturers"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <BookOpen className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {language === "pt" ? "Gerir" : "Manage"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "pt" ? "Notas e Disciplinas" : "Grades & Subjects"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {language === "pt" ? "Organizar" : "Organize"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === "pt" ? "Horários e Eventos" : "Schedules & Events"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
