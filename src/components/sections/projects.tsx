import {
  CircleDot,
  ExternalLink,
  Eye,
  GitFork,
  Loader2,
  Pin,
  Star,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { GithubMark } from "@/components/icons/github-mark"
import { ButtonLink } from "@/components/motion/button/base"
import { MagneticButton } from "@/components/motion/button/magnetic"
import {
  CenterMorphModal,
  CenterMorphModalContent,
  CenterMorphModalTrigger,
} from "@/components/motion/center-morph-modal"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getGithubReadme, parseGithubRepo } from "@/lib/github-readme"
import {
  getGithubProjectsPage,
  GITHUB_PROJECTS_PAGE_SIZE,
  type Project,
} from "@/lib/projects"
import { cn } from "@/lib/utils"

const NUMBER_FORMATTER = new Intl.NumberFormat("pt-BR")
const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  year: "numeric",
})

function formatCount(value: number | undefined) {
  if (value === undefined) return "—"
  return NUMBER_FORMATTER.format(value ?? 0)
}

function formatUpdatedAt(value: string | undefined) {
  if (!value) return null
  return DATE_FORMATTER.format(new Date(value))
}

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
        Repositório
      </a>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground"
        >
          <ExternalLink className="size-3.5" />
          Ver projeto
        </a>
      ) : null}
    </div>
  )
}

function resolveImageSrc(
  src: string | undefined,
  owner: string,
  repo: string,
) {
  if (!src) return src
  if (/^https?:\/\//i.test(src) || src.startsWith("data:")) return src
  return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${src.replace(/^\.?\//, "")}`
}

function createReadmeComponents(owner: string, repo: string): Components {
  return {
    h1: ({ children }) => (
      <h4 className="mt-6 text-base font-bold text-foreground first:mt-0">
        {children}
      </h4>
    ),
    h2: ({ children }) => (
      <h4 className="mt-6 text-base font-bold text-foreground first:mt-0">
        {children}
      </h4>
    ),
    h3: ({ children }) => (
      <h5 className="mt-5 text-sm font-semibold text-foreground">
        {children}
      </h5>
    ),
    h4: ({ children }) => (
      <h5 className="mt-4 text-sm font-semibold text-foreground">
        {children}
      </h5>
    ),
    p: ({ children }) => (
      <p className="mt-3 text-sm leading-6 text-muted-foreground first:mt-0">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="font-medium text-foreground underline underline-offset-2 hover:text-muted-foreground"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/50">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-6">{children}</li>,
    code: ({ className, children }) => {
      const isBlock = className?.includes("language-")
      if (isBlock) {
        return (
          <code className={cn("font-mono text-xs", className)}>
            {children}
          </code>
        )
      }
      return (
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="mt-3 overflow-x-auto rounded-xl bg-muted p-3 text-xs">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <img
        src={resolveImageSrc(typeof src === "string" ? src : undefined, owner, repo)}
        alt={alt ?? ""}
        loading="lazy"
        className="mt-3 max-w-full rounded-xl border border-border"
      />
    ),
    hr: () => <hr className="my-5 border-border" />,
    blockquote: ({ children }) => (
      <blockquote className="mt-3 border-l-2 border-border pl-3 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border px-2 py-1.5 text-left text-xs font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-2 py-1.5 align-top text-muted-foreground">
        {children}
      </td>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  }
}

type ReadmeState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; markdown: string }

function ReadmeSkeleton() {
  return (
    <div className="mt-3 space-y-2" aria-hidden="true">
      <div className="h-3 w-3/4 animate-pulse rounded-full bg-muted" />
      <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
      <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted" />
      <div className="h-3 w-2/3 animate-pulse rounded-full bg-muted" />
    </div>
  )
}

function ReadmeBody({ project }: { project: Project }) {
  const [state, setState] = useState<ReadmeState>({ status: "loading" })

  useEffect(() => {
    let cancelled = false

    getGithubReadme(project.repoUrl)
      .then((markdown) => {
        if (!cancelled) setState({ status: "ready", markdown })
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Não foi possível carregar o README.",
          })
        }
      })

    return () => {
      cancelled = true
    }
  }, [project.repoUrl])

  if (state.status === "loading") return <ReadmeSkeleton />

  if (state.status === "error") {
    return <p className="mt-3 text-sm text-destructive">{state.message}</p>
  }

  const ref = parseGithubRepo(project.repoUrl)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={
        ref ? createReadmeComponents(ref.owner, ref.repo) : undefined
      }
    >
      {state.markdown}
    </ReactMarkdown>
  )
}

function ProjectStats({ project }: { project: Project }) {
  const updatedAt = formatUpdatedAt(project.updatedAt)
  const stats = [
    {
      label: "Estrelas",
      value: formatCount(project.stars),
      icon: Star,
    },
    {
      label: "Forks",
      value: formatCount(project.forks),
      icon: GitFork,
    },
    {
      label: "Observadores",
      value: formatCount(project.watchers),
      icon: Eye,
    },
    {
      label: "Issues abertas",
      value: formatCount(project.openIssues),
      icon: CircleDot,
    },
  ]

  return (
    <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-border bg-muted/40 p-3"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <stat.icon className="size-3.5" aria-hidden="true" />
            {stat.label}
          </div>
          <p className="mt-1 text-sm font-semibold tabular-nums text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
      {updatedAt ? (
        <p className="col-span-2 text-xs text-muted-foreground sm:col-span-4">
          Atualizado em {updatedAt}
        </p>
      ) : null}
    </div>
  )
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="p-6 pt-12 sm:p-8 sm:pt-12">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold tracking-tight text-foreground text-balance">
              {project.name}
            </h3>
            {project.isPinned ? <PinnedBadge /> : null}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {project.description}
          </p>
        </div>
        {project.language ? (
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
            {project.language}
          </span>
        ) : null}
      </div>

      <ProjectStats project={project} />

      {project.topics.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      <div className="mt-6 border-t border-border pt-4">
        <ProjectLinks project={project} />
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <h4 className="text-sm font-semibold text-foreground">README</h4>
        <ReadmeBody project={project} />
      </div>
    </div>
  )
}

function PinnedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-foreground/20 bg-foreground/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground">
      <Pin className="size-3" aria-hidden="true" />
      Fixado
    </span>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <CenterMorphModal>
      <CenterMorphModalTrigger>
        <button
          type="button"
          className={cn(
            "flex h-full w-full touch-manipulation flex-col justify-between gap-4 rounded-2xl border bg-card p-5 text-left transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            project.isPinned
              ? "border-foreground/20 bg-foreground/[0.025] shadow-sm shadow-foreground/5"
              : "border-border",
          )}
        >
          <div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="break-words font-medium text-foreground">
                  {project.name}
                </h3>
                {project.isPinned ? (
                  <div className="mt-1.5">
                    <PinnedBadge />
                  </div>
                ) : null}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                {project.language ? (
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {project.language}
                  </span>
                ) : null}
              </div>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>

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
          <span className="border-t border-border pt-3 text-xs font-medium text-foreground underline underline-offset-2">
            Abrir detalhes
          </span>
        </button>
      </CenterMorphModalTrigger>
      <CenterMorphModalContent
        ariaLabel={`Projeto: ${project.name}`}
        className="max-w-xl"
      >
        <ScrollArea className="h-[min(75vh,40rem)]">
          <ProjectDetails project={project} />
        </ScrollArea>
      </CenterMorphModalContent>
    </CenterMorphModal>
  )
}

function ProjectCardSkeleton() {
  return (
    <article
      className="mb-5 break-inside-avoid rounded-2xl border border-border bg-card p-5"
      aria-hidden="true"
    >
      <div className="h-4 w-1/2 animate-pulse rounded-full bg-muted" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="mt-4 flex gap-1.5">
        <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
        <div className="h-5 w-20 animate-pulse rounded-full bg-muted" />
      </div>
    </article>
  )
}

type GithubLoadStatus = "loading" | "ready" | "loading-more" | "error"

function useGithubProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [status, setStatus] = useState<GithubLoadStatus>("loading")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getGithubProjectsPage(1)
      .then((response) => {
        if (cancelled) return
        setProjects(response.projects)
        setHasMore(response.hasMore)
        setPage(1)
        setStatus("ready")
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os projetos do GitHub.",
        )
        setHasMore(false)
        setStatus("error")
      })

    return () => {
      cancelled = true
    }
  }, [])

  const loadMore = useCallback(async () => {
    if (!hasMore || status === "loading" || status === "loading-more") return

    const nextPage = page + 1
    setStatus("loading-more")

    try {
      const response = await getGithubProjectsPage(nextPage)
      setProjects((currentProjects) => [
        ...currentProjects,
        ...response.projects,
      ])
      setHasMore(response.hasMore)
      setPage(nextPage)
      setStatus("ready")
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível carregar mais projetos.",
      )
      setStatus("error")
    }
  }, [hasMore, page, status])

  return { projects, hasMore, status, errorMessage, loadMore }
}

export function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false)
  const {
    projects,
    hasMore,
    status,
    errorMessage,
    loadMore,
  } = useGithubProjects()
  const isInitialLoading = status === "loading"
  const isLoadingMore = status === "loading-more"
  const hasHiddenMobileProjects = !showAllProjects && projects.length > 3
  const canLoadMore = hasHiddenMobileProjects || hasMore

  const handleShowMore = useCallback(() => {
    setShowAllProjects(true)
    if (hasMore) void loadMore()
  }, [hasMore, loadMore])

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
              Uma seleção de produtos, APIs e experimentos publicados no
              GitHub, com repositórios fixados em destaque.
            </p>
          </div>
          <ButtonLink
            variant="outline"
            href="https://github.com/vhlima1008"
            target="_blank"
            rel="noreferrer noopener"
          >
            Ver todos no GitHub
          </ButtonLink>
        </div>

        <div
          aria-label="Lista de projetos"
          aria-busy={isInitialLoading || isLoadingMore}
          aria-live="polite"
          className="mt-10 columns-1 gap-5 sm:columns-2"
        >
          {isInitialLoading
            ? Array.from({ length: GITHUB_PROJECTS_PAGE_SIZE }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            : projects.map((project, index) => (
                <div
                  key={project.slug}
                  className={cn(
                    "mb-5 break-inside-avoid",
                    !showAllProjects && index >= 3 && "hidden sm:block",
                  )}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
        </div>

        {errorMessage ? (
          <p className="mt-4 text-center text-xs text-destructive">
            {errorMessage}
          </p>
        ) : null}

        {canLoadMore ? (
          <div
            className={cn(
              "mt-6 flex justify-center",
              hasHiddenMobileProjects && !hasMore && "sm:hidden",
            )}
          >
            <MagneticButton
              variant="outline"
              aria-controls="projetos"
              aria-expanded={showAllProjects}
              disabled={isLoadingMore}
              onClick={handleShowMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Carregando…
                </>
              ) : hasHiddenMobileProjects ? (
                "Mostrar mais"
              ) : (
                "Carregar mais"
              )}
            </MagneticButton>
          </div>
        ) : null}

        <p
          className={cn(
            "mt-4 text-center text-xs text-muted-foreground",
            canLoadMore && "hidden",
          )}
        >
          Isso é tudo por aqui. Veja mais em{" "}
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
