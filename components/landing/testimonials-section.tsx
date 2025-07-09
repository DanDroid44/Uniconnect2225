import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Santos",
      role: "Computer Science Student",
      university: "Universidade Eduardo Mondlane",
      content:
        "UniConnect has transformed how I manage my academic life. I can easily track my grades, payments, and stay connected with my classmates.",
      rating: 5,
      avatar: "MS",
    },
    {
      name: "Dr. João Silva",
      role: "Lecturer",
      university: "Instituto Superior Politécnico",
      content:
        "As a lecturer, UniConnect makes it incredibly easy to manage student grades and communicate with my classes. The interface is intuitive and efficient.",
      rating: 5,
      avatar: "JS",
    },
    {
      name: "Ana Costa",
      role: "Academic Coordinator",
      university: "Universidade Católica de Moçambique",
      content:
        "The comprehensive dashboard gives me complete oversight of our academic operations. Payment tracking and student management have never been easier.",
      rating: 5,
      avatar: "AC",
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-responsive-2xl font-bold text-gray-900 mb-4">
            Trusted by Universities Across Mozambique
          </h2>
          <p className="text-responsive-base text-gray-600 max-w-2xl mx-auto">
            See what students, lecturers, and coordinators are saying about UniConnect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-600">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-gray-500">{testimonial.university}</div>
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
