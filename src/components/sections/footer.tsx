import { ArrowUpRight, Mail } from "lucide-react"
import { GithubMark } from "@/components/icons/github-mark"
import { MagneticButton } from "@/components/motion/button/magnetic"
import { useSmoothScroll } from "@/components/motion/smooth-scroll"

const LINKS = [
  { label: "GitHub", href: "https://github.com/vhlima1008", icon: GithubMark },
  { label: "E-mail", href: "mailto:vhlima1008@gmail.com", icon: Mail },
]

export function Footer() {
  const { scrollTo } = useSmoothScroll()

  return (
    <footer
      id="contato"
      className="dark relative overflow-hidden bg-background px-6 pb-32 pt-24 sm:px-8 md:pt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-6 border-b border-border pb-16">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Contato
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Vamos construir seu próximo projeto?
          </h2>
          <MagneticButton
            size="lg"
            onClick={() => {
              window.location.href = "mailto:vhlima1008@gmail.com"
            }}
          >
            <Mail className="size-4" />
            vhlima1008@gmail.com
          </MagneticButton>
        </div>

        <div className="flex flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Victor Hugo. Todos os direitos
            reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noreferrer noopener"
                    : undefined
                }
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <link.icon className="size-4" />
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("#hero", { duration: 1.1 })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-4" aria-hidden="true" />
              Voltar ao topo
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
