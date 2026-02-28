export default function PageHeader({
  title,
  subtitle,
  description,
}: {
  title: string
  subtitle: string
  description: string
}) {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-850">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">{title}</h1>
        <h2 className="text-2xl md:text-3xl text-slate-300 mb-6">{subtitle}</h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>
    </section>
  )
}
