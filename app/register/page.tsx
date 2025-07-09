import { Suspense } from "react"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-4 gradient-bg-light dark:gradient-bg-dark">
          <div className="w-full max-w-md">
            <div className="animate-pulse">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg"></div>
                    <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="w-full h-10 bg-orange-200 dark:bg-orange-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  )
}
