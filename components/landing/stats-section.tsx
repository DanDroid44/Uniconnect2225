export function StatsSection() {
  const stats = [
    { number: "10,000+", label: "Students Connected" },
    { number: "500+", label: "Lecturers Active" },
    { number: "25+", label: "Universities" },
    { number: "99.9%", label: "Uptime" },
  ]

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container-responsive">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-responsive-2xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-responsive-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
