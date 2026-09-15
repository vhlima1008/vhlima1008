import {
  BookOpenText,
  FolderGit2,
  Home,
  Mail,
  Route,
  UserRound,
} from "lucide-react"
import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { FloatingDock } from "@/components/ui/floating-dock"
import { navigateTo } from "@/lib/navigation"

const iconClassName = "h-full w-full text-neutral-500 dark:text-neutral-300"

const navItems = [
  {
    title: "Início",
    icon: <Home className={iconClassName} aria-hidden="true" />,
    href: "#hero",
  },
  {
    title: "Sobre",
    icon: <UserRound className={iconClassName} aria-hidden="true" />,
    href: "#sobre",
  },
  {
    title: "Experiência",
    icon: <Route className={iconClassName} aria-hidden="true" />,
    href: "#experiencia",
  },
  {
    title: "Projetos",
    icon: <FolderGit2 className={iconClassName} aria-hidden="true" />,
    href: "#projetos",
  },
  {
    title: "Contato",
    icon: <Mail className={iconClassName} aria-hidden="true" />,
    href: "#contato",
  },
  {
    title: "Blog",
    icon: <BookOpenText className={iconClassName} aria-hidden="true" />,
    href: "/blog",
  },
]

export function NavDock() {
  const { scrollTo } = useSmoothScroll()

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex justify-end px-4 [view-transition-name:persistent-nav] md:justify-center"
    >
      <FloatingDock
        items={navItems}
        desktopClassName="shadow-lg shadow-black/10"
        mobileClassName="shadow-lg shadow-black/10"
        onNavigate={(href) => {
          if (href.startsWith("#")) {
            scrollTo(href, { duration: 1.05 })
            return
          }
          navigateTo(href)
        }}
      />
    </nav>
  )
}
