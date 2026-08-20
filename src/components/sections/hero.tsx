import { ArrowDown, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { MagneticButton } from "@/components/motion/button/magnetic"
import { ChromaticTextReveal } from "@/components/motion/chromatic-text-reveal"
import { ShaderBackground } from "@/components/motion/shader-background"
import { useSmoothScroll } from "@/components/motion/smooth-scroll"

export function Hero() {
  const { scrollTo } = useSmoothScroll()
  const sectionRef = useRef<HTMLElement>(null)
  // The shader keeps its WebGL render loop going every frame regardless of
  // scroll position — measured as ~8s of continuous main-thread long tasks
  // over an 8s window. Unmounting it once the hero scrolls out of view stops
  // that loop entirely; a matching static gradient keeps the background from
  // flashing while it's paused.
  const [heroInView, setHeroInView] = useState(true)

  useEffect(() => {
    const node = sectionRef.current
    if (!node || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="dark relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#bbfbff] via-[#8dd8ff] to-[#5409da]"
      />
      {heroInView ? (
        <ShaderBackground
          variant="mesh-gradient"
          colors={["#bbfbff", "#8dd8ff", "#4e71ff", "#5409da"]}
          distortion={0.6}
          swirl={0.5}
          speed={0.3}
          // Blurred, distortion-heavy gradient — full 2-3x device pixel
          // density is wasted work here. Capping it is the single biggest
          // lever on the shader's per-frame cost (measured ~2.5s of main
          // thread blocking while it's on screen).
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
          className="absolute inset-0"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img
            src="https://avatars.githubusercontent.com/u/116356507?v=4"
            alt="Foto de perfil de Victor Hugo"
            width={56}
            height={56}
            loading="lazy"
            className="size-14 rounded-full border border-foreground/20 object-cover"
          />
          <span className="text-sm font-medium text-foreground/80">
            Victor Hugo
          </span>
        </div>

        <div className="flex w-full justify-center [container-type:inline-size]">
          <ChromaticTextReveal
            prefix="Eu construo"
            words={[
              "produtos digitais.",
              "interfaces performáticas.",
              "experiências sob medida.",
            ]}
            startOnView={false}
            className="shrink-0 flex-col items-center gap-1 font-bold tracking-[-0.04em] text-foreground [font-size:clamp(1rem,6cqw,3rem)]"
          />
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <MagneticButton
            size="lg"
            onClick={() => scrollTo("#projetos", { duration: 1.1 })}
          >
            Ver projetos
          </MagneticButton>
          <MagneticButton
            size="lg"
            variant="outline"
            onClick={() => {
              window.location.href = "mailto:vhlima1008@gmail.com"
            }}
          >
            <Mail className="size-4" />
            Falar comigo
          </MagneticButton>
        </div>
      </div>

      <button
        type="button"
        aria-label="Rolar para a próxima seção"
        onClick={() => scrollTo("#sobre", { duration: 1.1 })}
        className="absolute bottom-8 z-10 text-foreground/60 transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
