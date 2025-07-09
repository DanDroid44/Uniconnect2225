"use client"

import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, CreditCard } from "lucide-react"

export default function StudentPayments() {
  const { profile } = useAuth()
  const { language } = useLanguage()
  const { t } = useTranslation(language)

  // Mock payment data
  const payments = [
    { month: "February", year: 2024, amount: 5670, status: "paid", paid_at: "2024-02-01", due_date: "2024-02-28" },
    { month: "January", year: 2024, amount: 5670, status: "paid", paid_at: "2024-01-15", due_date: "2024-01-31" },
    { month: "December", year: 2023, amount: 5670, status: "paid", paid_at: "2023-12-10", due_date: "2023-12-31" },
    { month: "November", year: 2023, amount: 5670, status: "paid", paid_at: "2023-11-05", due_date: "2023-11-30" },
    { month: "March", year: 2024, amount: 5670, status: "pending", paid_at: null, due_date: "2024-03-31" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalPaid = payments.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = payments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("payments")}</h1>
        <p className="text-muted-foreground">Monthly tuition fee: 5,670 Meticais • {profile?.full_name}</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalPaid.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingAmount.toLocaleString()} MT</div>
            <p className="text-xs text-muted-foreground">Due this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Current</div>
            <p className="text-xs text-muted-foreground">Account in good standing</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Payment Due */}
      {pendingAmount > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Payment Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-yellow-800">March 2024 Tuition Fee</p>
                <p className="text-sm text-yellow-700">Amount: 5,670 MT • Due: March 31, 2024</p>
              </div>
              <Button className="bg-yellow-600 hover:bg-yellow-700">Pay Now</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>{t("payment_history")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(payment.status)}
                  <div>
                    <p className="font-semibold">
                      {payment.month} {payment.year}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {payment.status === "paid"
                        ? `Paid on ${new Date(payment.paid_at!).toLocaleDateString()}`
                        : `Due: ${new Date(payment.due_date).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{payment.amount.toLocaleString()} MT</p>
                  {getStatusBadge(payment.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Bank Transfer</h3>
              <p className="text-sm text-muted-foreground mb-2">Transfer to university account</p>
              <p className="text-xs">Account: 1234567890 • Bank: BCI</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Mobile Money</h3>
              <p className="text-sm text-muted-foreground mb-2">Pay via M-Pesa or e-Mola</p>
              <p className="text-xs">Reference: Student ID + Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
