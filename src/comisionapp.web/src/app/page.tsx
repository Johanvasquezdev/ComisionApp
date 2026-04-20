import { CommissionForm } from "@/components/CommissionForm"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      
      <div className="absolute top-8 right-8 z-20">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        <CommissionForm />
      </div>

      <footer className="mt-16 text-center z-10">
        <div className="glass px-6 py-3 rounded-full inline-block backdrop-blur-xl border-white/10 shadow-xl">
          <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            © 2026 <span className="shiny-text">Johan Vaquez</span> • 2025-1235
          </p>
        </div>
      </footer>
    </main>
  )
}
