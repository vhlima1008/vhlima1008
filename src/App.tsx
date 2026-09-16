import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState, type ReactNode } from "react"
import { flushSync } from "react-dom"
import { SmoothScroll, useSmoothScroll } from "@/components/motion/smooth-scroll"
import { NavDock } from "@/components/nav-dock"
import { Blog } from "@/components/pages/blog"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"
import { getCurrentPath, onRouteChange } from "@/lib/navigation"
import { inject } from "@vercel/analytics"
inject()

const SITE_URL = "https://vhlima.com.br"

const routeMetadata: Record<
  "home" | "blog",
  { title: string; description: string; path: string }
> = {
  home: {
    title: "Victor Hugo Lima Monteiro | Desenvolvedor Full-stack",
    description:
      "Victor Hugo — desenvolvedor full-stack (Java Spring Boot & React TypeScript). Projetos, experiência profissional e contato.",
    path: "/",
  },
  blog: {
    title: "Blog | Victor Hugo Lima Monteiro",
    description:
      "Textos técnicos de Victor Hugo Lima Monteiro sobre desenvolvimento, arquitetura, Java Spring Boot, React TypeScript e boas práticas web.",
    path: "/blog",
  },
}

function setMetaAttribute(
  selector: string,
  attribute: "content" | "href",
  value: string,
) {
  document.querySelector(selector)?.setAttribute(attribute, value)
}

function updateDocumentMetadata(pathname: string) {
  const metadata = pathname === "/blog" ? routeMetadata.blog : routeMetadata.home
  const url = `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`

  document.title = metadata.title
  setMetaAttribute('meta[name="description"]', "content", metadata.description)
  setMetaAttribute('link[rel="canonical"]', "href", url)
  setMetaAttribute('meta[property="og:url"]', "content", url)
  setMetaAttribute('meta[property="og:title"]', "content", metadata.title)
  setMetaAttribute(
    'meta[property="og:description"]',
    "content",
    metadata.description,
  )
  setMetaAttribute('meta[name="twitter:title"]', "content", metadata.title)
  setMetaAttribute(
    'meta[name="twitter:description"]',
    "content",
    metadata.description,
  )
}

function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
      <NavDock />
    </>
  )
}

function PageTransition({
  routeKey,
  children,
}: {
  routeKey: string
  children: ReactNode
}) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduce ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function RouteScrollReset({ pathname }: { pathname: string }) {
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    scrollTo(0, { immediate: true })
  }, [pathname, scrollTo])

  return null
}

export function App() {
  const [pathname, setPathname] = useState(getCurrentPath)

  useEffect(
    () => onRouteChange(() => flushSync(() => setPathname(getCurrentPath()))),
    [],
  )

  useEffect(() => {
    updateDocumentMetadata(pathname)
  }, [pathname])

  return (
    <SmoothScroll>
      <RouteScrollReset pathname={pathname} />
      <PageTransition routeKey={pathname === "/blog" ? "blog" : "home"}>
        {pathname === "/blog" ? <Blog /> : <HomePage />}
      </PageTransition>
    </SmoothScroll>
  )
}

export default App
