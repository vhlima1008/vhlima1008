import { Download } from "lucide-react"
import { GithubMark } from "@/components/icons/github-mark"
import { ButtonLink } from "@/components/motion/button/base"
import { MagneticButton } from "@/components/motion/button/magnetic"
import { Magnetic } from "@/components/motion/magnetic"

const SKILLS = [
  "Java",
  "Spring Boot",
  "Node.js",
  "Python",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "MySQL",
  "Docker",
  "Figma",
]

export function About() {
  return (
    <section id="sobre" className="relative px-6 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Sobre
        </p>
        <div className="mt-4 flex items-center gap-4 sm:gap-5">
          <img
            src="https://avatars.githubusercontent.com/u/116356507?v=4"
            alt="Foto de perfil de Victor Hugo"
            width={80}
            height={80}
            loading="lazy"
            className="size-16 shrink-0 rounded-full border border-border object-cover sm:size-20"
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Victor Hugo
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Estagiário de Desenvolvimento · Leste Telecom
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
          <p>
            Desenvolvo produtos de ponta a ponta: back-ends robustos em Java
            com Spring Boot, APIs em Python e interfaces em React com
            TypeScript. Gosto de projetos onde performance e experiência do
            usuário andam juntas.
          </p>
          <p>
            Fora do trabalho, mantenho o hábito de estudar todos os dias — de
            algoritmos a novas stacks — e publico o que construo em código
            aberto.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton
            variant="outline"
            onClick={() =>
              window.open(
                "https://github.com/vhlima1008",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <GithubMark className="size-4" />
            Ver perfil no GitHub
          </MagneticButton>
          <Magnetic strength={0.25}>
            <ButtonLink
              href="/curriculo-victor-hugo.pdf"
              download="Victor-Hugo-Lima-Monteiro-Curriculo.pdf"
              variant="outline"
            >
              <Download className="size-4" />
              Baixar currículo
            </ButtonLink>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
