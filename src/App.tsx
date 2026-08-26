import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState, type ReactNode } from "react"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
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

export function App() {
  const [pathname, setPathname] = useState(getCurrentPath)

  useEffect(() => onRouteChange(() => setPathname(getCurrentPath())), [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname])

  return (
    <SmoothScroll>
      <PageTransition routeKey={pathname === "/blog" ? "blog" : "home"}>
        {pathname === "/blog" ? <Blog /> : <HomePage />}
      </PageTransition>
    </SmoothScroll>
  )
}

export default App
