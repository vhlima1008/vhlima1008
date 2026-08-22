import {
  BookOpen,
  Briefcase,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Trophy,
} from "lucide-react"
import type { ReactNode } from "react"
import {
  BouncyAccordion,
  type BouncyAccordionItem,
} from "@/components/motion/bouncy-accordion"
import { EXPERIENCE, type ExperienceKind } from "@/lib/experience"

const KIND_ICON: Record<ExperienceKind, ReactNode> = {
  education: <GraduationCap className="size-4" aria-hidden="true" />,
  work: <Briefcase className="size-4" aria-hidden="true" />,
  research: <FlaskConical className="size-4" aria-hidden="true" />,
  award: <Trophy className="size-4" aria-hidden="true" />,
  course: <BookOpen className="size-4" aria-hidden="true" />,
  volunteer: <HeartHandshake className="size-4" aria-hidden="true" />,
}

export function Experience() {
  const items: BouncyAccordionItem[] = EXPERIENCE.map((entry) => ({
    id: entry.id,
    icon: KIND_ICON[entry.kind],
    title: entry.short,
    description: (
      <div>
        <p className="text-sm font-semibold text-foreground">{entry.role}</p>
        <p className="mb-2 text-xs font-medium text-muted-foreground/80">
          {entry.organization} · {entry.period}
        </p>
        <ul className="list-disc space-y-1.5 pl-4 marker:text-muted-foreground/50">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </div>
    ),
  }))

  return (
    <section
      id="experiencia"
      className="relative px-6 py-24 sm:px-8 md:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trajetória
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Experiência
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
          Da sala de aula à produção: uma linha do tempo profissional,
          acadêmica e de pesquisa.
        </p>

        <div className="mt-10 overflow-hidden rounded-[28px]">
          <BouncyAccordion
            items={items}
            defaultValue={EXPERIENCE[0]?.id ?? null}
          />
        </div>
      </div>
    </section>
  )
}
