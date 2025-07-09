"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, CreditCard, Calendar, Users, Bell, Shield } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"

export function FeaturesSection() {
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  const features = [
    {
      icon: GraduationCap,
      title: language === "pt" ? "Gestão de Notas" : "Grade Management",
      description:
        language === "pt"
          ? "Acompanhe trabalhos, testes e exames com cálculos automáticos usando a escala 0-20."
          : "Track assignments, tests, and exams with automatic calculations using the 0-20 scale.",
    },
    {
      icon: CreditCard,
      title: language === "pt" ? "Controlo de Pagamentos" : "Payment Tracking",
      description:
        language === "pt"
          ? "Monitore as propinas mensais (5.670 MT) com histórico e estado dos pagamentos."
          : "Monitor monthly tuition fees (5,670 MT) with payment history and status tracking.",
    },
    {
      icon: Calendar,
      title: language === "pt" ? "Gestão de Horários" : "Schedule Management",
      description:
        language === "pt"
          ? "Visualize horários de aulas, calendário de exames e datas académicas importantes."
          : "View class timetables, exam schedules, and important academic dates.",
    },
    {
      icon: Users,
      title: language === "pt" ? "Colaboração em Grupo" : "Group Collaboration",
      description:
        language === "pt"
          ? "Conecte-se com colegas, forme grupos de estudo e colabore em projetos."
          : "Connect with classmates, form study groups, and collaborate on projects.",
    },
    {
      icon: Bell,
      title: language === "pt" ? "Notificações Inteligentes" : "Smart Notifications",
      description:
        language === "pt"
          ? "Receba alertas sobre notas, pagamentos, mudanças de horário e anúncios."
          : "Receive alerts for grades, payments, schedule changes, and announcements.",
    },
    {
      icon: Shield,
      title: language === "pt" ? "Seguro e Confiável" : "Secure & Reliable",
      description:
        language === "pt"
          ? "Controlo de acesso baseado em funções com suporte multi-idioma para Português e Inglês."
          : "Role-based access control with multi-language support for Portuguese and English.",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-responsive-2xl font-bold text-gray-900 dark:text-white mb-4">{t("features_title")}</h2>
          <p className="text-responsive-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("features_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="card-hover border-0 shadow-md bg-orange-50 dark:bg-gray-800 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                    <feature.icon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
