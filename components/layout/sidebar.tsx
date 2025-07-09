"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Calendar,
  BookOpen,
  GraduationCap,
  CreditCard,
  Users,
  Bell,
  Megaphone,
  Menu,
  Settings,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { signOut } from "@/lib/auth"
import { SimpleLanguageToggle } from "@/components/ui/simple-language-toggle"
import { SimpleThemeToggle } from "@/components/ui/simple-theme-toggle"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)
  const pathname = usePathname()

  const getNavigationItems = () => {
    const baseItems = [
      {
        title: t("dashboard"),
        href: "/dashboard",
        icon: Home,
      },
    ]

    if (profile?.role === "student") {
      return [
        ...baseItems,
        {
          title: t("schedule"),
          href: "/student/schedule",
          icon: Calendar,
        },
        {
          title: t("subjects"),
          href: "/student/grades",
          icon: BookOpen,
        },
        {
          title: t("grades"),
          href: "/student/grades",
          icon: GraduationCap,
        },
        {
          title: t("payments"),
          href: "/student/payments",
          icon: CreditCard,
        },
        {
          title: language === "pt" ? "Grupo" : "Group",
          href: "/student/group",
          icon: Users,
        },
        {
          title: t("notifications"),
          href: "/student/notifications",
          icon: Bell,
        },
      ]
    }

    if (profile?.role === "lecturer") {
      return [
        ...baseItems,
        {
          title: t("schedule"),
          href: "/lecturer/schedule",
          icon: Calendar,
        },
        {
          title: t("students"),
          href: "/lecturer/students",
          icon: Users,
        },
        {
          title: t("subjects"),
          href: "/lecturer/subjects",
          icon: BookOpen,
        },
        {
          title: t("announcements"),
          href: "/lecturer/announcements",
          icon: Megaphone,
        },
      ]
    }

    if (profile?.role === "coordinator") {
      return [
        ...baseItems,
        {
          title: t("students"),
          href: "/coordinator/students",
          icon: Users,
        },
        {
          title: t("subjects"),
          href: "/coordinator/subjects",
          icon: BookOpen,
        },
        {
          title: t("payments"),
          href: "/coordinator/payments",
          icon: CreditCard,
        },
        {
          title: t("schedule"),
          href: "/coordinator/schedule",
          icon: Calendar,
        },
      ]
    }

    return baseItems
  }

  const navigationItems = getNavigationItems()

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-700 px-6">
        <Link className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white" href="/dashboard">
          <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <span>UniConnect</span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          {navigationItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start h-10",
                pathname === item.href
                  ? "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-4">
          <SimpleThemeToggle />
          <SimpleLanguageToggle />
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        {profile && (
          <div className="text-sm">
            <p className="font-medium text-gray-900 dark:text-white truncate">{profile.full_name}</p>
            <p className="text-gray-500 dark:text-gray-400 truncate">{t(profile.role)}</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-transparent">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col p-0 w-80">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn("hidden md:block w-64", className)}>
        <SidebarContent />
      </div>
    </>
  )
}
