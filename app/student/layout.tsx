"use client"

import type React from "react"

import { RoleGuard } from "@/components/guards/role-guard"
import { Header } from "@/components/layout/header"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={["student"]}>
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <div className="flex flex-1">
          <div className="hidden w-64 border-r bg-muted/40 md:block"></div>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </RoleGuard>
  )
}
