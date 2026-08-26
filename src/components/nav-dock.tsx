import {
  BookOpenText,
  FolderGit2,
  Home,
  Mail,
  Route,
  UserRound,
} from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import {
  ExpandableTabs,
  type ExpandableTabsItem,
} from "@/components/motion/expandable-tabs"
import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { navigateTo } from "@/lib/navigation"

type NavSection = {
  id: string
  label: string
  icon: ReactNode
  preview: string
}

const MAIN_NAV_SECTIONS: NavSection[] = [
  {
    id: "hero",
    label: "Início",
    icon: <Home className="size-4" aria-hidden="true" />,
    preview: "Voltar para o topo da página.",
  },
  {
    id: "sobre",
    label: "Sobre",
    icon: <UserRound className="size-4" aria-hidden="true" />,
    preview: "Quem é Victor Hugo e como ele trabalha.",
  },
  {
    id: "experiencia",
    label: "Experiência",
    icon: <Route className="size-4" aria-hidden="true" />,
    preview: "Trajetória profissional, acadêmica e de pesquisa.",
  },
  {
    id: "projetos",
    label: "Projetos",
    icon: <FolderGit2 className="size-4" aria-hidden="true" />,
    preview: "Uma seleção de produtos, APIs e experimentos.",
  },
  {
    id: "contato",
    label: "Contato",
    icon: <Mail className="size-4" aria-hidden="true" />,
    preview: "Fale sobre o próximo projeto do seu negócio.",
  },
]

const BLOG_NAV_SECTIONS: NavSection[] = [
  {
    id: "blog",
    label: "Blog",
    icon: <BookOpenText className="size-4" aria-hidden="true" />,
    preview: "Abrir textos técnicos em uma página dedicada.",
  },
]

function createItems(sections: NavSection[]): ExpandableTabsItem[] {
  return sections.map((section) => ({
    id: section.id,
    label: section.label,
    icon: section.icon,
    content: (
      <div className="w-56 px-1 py-0.5">
        <p className="text-sm font-semibold text-foreground">{section.label}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {section.preview}
        </p>
      </div>
    ),
  }))
}

export function NavDock() {
  const { scrollTo } = useSmoothScroll()
  const [activeMain, setActiveMain] = useState<string | null>(null)
  const [activeBlog, setActiveBlog] = useState<string | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const handleValueChange = useCallback(
    (id: string | null) => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
      setActiveMain(id)
      if (!id) return
      scrollTo(`#${id}`, { duration: 1.1 })
      closeTimerRef.current = window.setTimeout(() => setActiveMain(null), 2200)
    },
    [scrollTo]
  )

  const handleBlogValueChange = useCallback((id: string | null) => {
    setActiveBlog(id)
    if (!id) return
    window.setTimeout(() => setActiveBlog(null), 220)
    navigateTo("/blog")
  }, [])

  const mainItems = createItems(MAIN_NAV_SECTIONS)
  const blogItems = createItems(BLOG_NAV_SECTIONS)

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-4"
    >
      <div className="flex items-center gap-2">
        <ExpandableTabs
          items={mainItems}
          value={activeMain}
          onValueChange={handleValueChange}
          className="shadow-lg shadow-black/10"
        />
        <ExpandableTabs
          items={blogItems}
          value={activeBlog}
          onValueChange={handleBlogValueChange}
          className="shadow-lg shadow-black/10"
        />
      </div>
    </nav>
  )
}
