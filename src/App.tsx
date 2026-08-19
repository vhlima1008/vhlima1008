import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { NavDock } from "@/components/nav-dock"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { Projects } from "@/components/sections/projects"

export function App() {
  return (
    <SmoothScroll>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Footer />
      <NavDock />
    </SmoothScroll>
  )
}

export default App
