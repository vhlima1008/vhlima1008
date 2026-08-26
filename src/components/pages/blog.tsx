import { ArrowLeft, ChevronUp, Home } from "lucide-react"
import { useState } from "react"
import ReactMarkdown, { type Components } from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"

import { MagneticButton } from "@/components/motion/button/magnetic"
import {
  ExpandableTabs,
  type ExpandableTabsItem,
} from "@/components/motion/expandable-tabs"
import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { getBlogPosts, type BlogPost } from "@/lib/blog"
import { navigateTo } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const blogPosts = getBlogPosts()

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-xl font-semibold text-foreground">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 text-lg font-semibold text-foreground">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mt-4 text-base leading-8 text-muted-foreground">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-8 text-muted-foreground marker:text-muted-foreground/50">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-8 text-muted-foreground marker:text-muted-foreground/50">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-border pl-5 text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-")

    if (isBlock) {
      return (
        <code className={cn("font-mono text-sm leading-7", className)}>
          {children}
        </code>
      )
    }

    return (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="mt-5 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-sm">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <img
      src={src ?? ""}
      alt={alt ?? ""}
      loading="lazy"
      className="mt-6 w-full rounded-lg border border-border object-cover"
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border bg-muted px-3 py-2 text-left font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-3 py-2 align-top leading-6 text-muted-foreground last:border-b-0">
      {children}
    </td>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <a
      href={`#${post.slug}`}
      onClick={(event) => {
        event.preventDefault()
        document.getElementById(post.slug)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }}
      className="block h-full min-w-0 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/20"
    >
      <article className="flex h-full min-w-0 flex-col justify-between gap-4">
        <div className="min-w-0">
          <h2 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
            {post.title}
          </h2>
          <p className="mt-3 [display:-webkit-box] overflow-hidden text-sm leading-6 text-muted-foreground [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {post.excerpt}
          </p>
        </div>
        <span className="text-xs font-medium text-foreground underline underline-offset-2">
          Ler conteúdo
        </span>
      </article>
    </a>
  )
}

const topDockItems: ExpandableTabsItem[] = [
  {
    id: "top",
    label: "Topo",
    icon: <ChevronUp className="size-4" aria-hidden="true" />,
    content: (
      <div className="w-44 px-1 py-0.5">
        <p className="text-sm font-semibold text-foreground">Topo</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Voltar para a listagem de textos.
        </p>
      </div>
    ),
  },
]

function BlogReadingDock() {
  const { scrollTo } = useSmoothScroll()
  const [active, setActive] = useState<string | null>(null)

  return (
    <nav
      aria-label="Navegação de leitura"
      className="fixed right-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50"
    >
      <ExpandableTabs
        items={topDockItems}
        value={active}
        onValueChange={(id) => {
          setActive(id)
          if (!id) return
          scrollTo(0, { duration: 1.1 })
          window.setTimeout(() => setActive(null), 1600)
        }}
        className="shadow-lg shadow-black/10"
      />
    </nav>
  )
}

export function Blog() {
  return (
    <main className="min-h-svh overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border px-6 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-3xl min-w-0 items-center justify-between gap-4">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault()
              navigateTo("/")
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-muted-foreground"
          >
            <Home className="size-4" aria-hidden="true" />
            Victor Hugo
          </a>
          <MagneticButton
            variant="outline"
            onClick={() => {
              navigateTo("/")
            }}
          >
            <ArrowLeft className="size-4" />
            Voltar
          </MagneticButton>
        </div>
      </header>

      <section className="relative overflow-x-clip px-6 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-3xl min-w-0">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Blog
          </p>

          <div className="mt-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Minhas produções
            </h1>
          </div>

          <div
            aria-label="Lista de textos do blog"
            className="mt-10 min-w-0 columns-1 gap-5 sm:columns-2"
          >
            {blogPosts.map((post) => (
              <div key={post.slug} className="mb-5 break-inside-avoid">
                <BlogCard post={post} />
              </div>
            ))}
          </div>

          <div className="mt-14 min-w-0 space-y-16 border-t border-border pt-12">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                id={post.slug}
                className="min-w-0 scroll-mt-10 border-b border-border pb-12"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeSanitize]}
                  components={markdownComponents}
                >
                  {post.content}
                </ReactMarkdown>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BlogReadingDock />
    </main>
  )
}
