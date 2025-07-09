import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function CTASection() {
  const benefits = ["Free to get started", "No setup fees", "24/7 support", "Multi-language support"]

  return (
    <section className="py-16 sm:py-20 bg-orange-500 dark:bg-orange-600">
      <div className="container-responsive">
        <div className="text-center text-white">
          <h2 className="text-responsive-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-responsive-base mb-8 max-w-2xl mx-auto opacity-90">
            Join universities across Mozambique who are already using UniConnect to transform their academic operations.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-orange-200" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 w-full sm:w-auto text-lg px-8 py-4 font-semibold"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto text-lg px-8 py-4 bg-transparent font-semibold"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
