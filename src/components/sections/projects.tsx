import { ExternalLink, Lightbulb } from "lucide-react"
import { GithubMark } from "@/components/icons/github-mark"
import { MagneticButton } from "@/components/motion/button/magnetic"
import {
  CenterMorphModal,
  CenterMorphModalContent,
  CenterMorphModalTrigger,
} from "@/components/motion/center-morph-modal"
import { PROJECTS, type Project, type ProjectCaseStudy } from "@/lib/projects"

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-4 text-xs font-medium">
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground"
      >
        <GithubMark className="size-3.5" />
        Código
      </a>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground"
        >
          <ExternalLink className="size-3.5" />
          Acessar
        </a>
      ) : null}
    </div>
  )
}

function CaseStudyModal({
  project,
  caseStudy,
}: {
  project: Project
  caseStudy: ProjectCaseStudy
}) {
  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
        >
          Leia mais
        </button>
      </CenterMorphModalTrigger>
      <CenterMorphModalContent
        ariaLabel={`Case study: ${project.name}`}
        className="max-w-xl"
      >
        <div className="p-6 pt-12 sm:p-8 sm:pt-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground">
            <Lightbulb className="size-3" aria-hidden="true" />
            Case study
          </span>
          <div className="mt-3 flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {project.name}
            </h3>
            {project.language ? (
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                {project.language}
              </span>
            ) : null}
          </div>

          <dl className="mt-5 space-y-4 text-sm leading-6 text-muted-foreground">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-foreground/70">
                O problema
              </dt>
              <dd className="mt-1">{caseStudy.problem}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-foreground/70">
                A abordagem
              </dt>
              <dd className="mt-1">{caseStudy.approach}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-wide text-foreground/70">
                O resultado
              </dt>
              <dd className="mt-1">{caseStudy.result}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-border pt-4">
            <ProjectLinks project={project} />
          </div>
        </div>
      </CenterMorphModalContent>
    </CenterMorphModal>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { caseStudy } = project

  return (
    <article
      className={
        caseStudy
          ? "flex h-full flex-col justify-between gap-4 rounded-2xl border border-foreground/15 bg-card p-5 shadow-sm transition-colors hover:border-foreground/25"
          : "flex h-full flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
      }
    >
      <div>
        {caseStudy ? (
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-2.5 py-1 text-[11px] font-medium text-foreground">
            <Lightbulb className="size-3" aria-hidden="true" />
            Case study
          </span>
        ) : null}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-foreground">{project.name}</h3>
          {project.language ? (
            <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {project.language}
            </span>
          ) : null}
        </div>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        {caseStudy ? (
          <div className="mt-2">
            <CaseStudyModal project={project} caseStudy={caseStudy} />
          </div>
        ) : null}

        {project.topics.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="border-t border-border pt-3">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projetos" className="relative px-6 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Trabalhos
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Projetos recentes
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Uma seleção de produtos, APIs e experimentos que já publiquei — do
              back-end em Java e Python ao front-end em React.
            </p>
          </div>
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
            Ver todos no GitHub
          </MagneticButton>
        </div>

        <div
          aria-label="Lista de projetos"
          className="mt-10 columns-1 gap-5 sm:columns-2"
        >
          {PROJECTS.map((project) => (
            <div key={project.slug} className="mb-5 break-inside-avoid">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Isso é tudo por aqui — mais em{" "}
          <a
            href="https://github.com/vhlima1008"
            target="_blank"
            rel="noreferrer noopener"
            className="underline underline-offset-2 hover:text-foreground"
          >
            github.com/vhlima1008
          </a>
        </p>
      </div>
    </section>
  )
}
