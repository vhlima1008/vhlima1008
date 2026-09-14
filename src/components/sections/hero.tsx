import { ArrowDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import mePicture from "@/assets/me-picture.png"
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
      className="dark relative flex min-h-svh flex-col items-center justify-center overflow-hidden border-b border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#111827] to-[#1e1b4b]"
      />
      {heroInView ? (
        <ShaderBackground
          variant="mesh-gradient"
          colors={["#030712", "#0f172a", "#312e81", "#111827"]}
          distortion={0.45}
          swirl={0.35}
          speed={0.25}
          // Blurred, distortion-heavy gradient — full 2-3x device pixel
          // density is wasted work here. Capping it is the single biggest
          // lever on the shader's per-frame cost (measured ~2.5s of main
          // thread blocking while it's on screen).
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
          className="absolute inset-0"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/75" />

      <div className="relative z-10 flex min-h-svh w-full flex-col justify-center overflow-hidden px-0">
        <div className="relative flex flex-1 items-end justify-center">
          <h1
            aria-label="Victor Hugo"
            className="absolute left-1/2 top-[10%] w-full -translate-x-1/2 text-center font-heading text-[clamp(4.75rem,25vw,7rem)] font-black uppercase leading-[0.78] text-foreground/95 sm:top-[28%] sm:w-[118vw] sm:whitespace-nowrap sm:text-[clamp(5.5rem,15.5vw,17rem)] sm:leading-none"
          >
            <span className="block sm:hidden">Victor</span>
            <span className="block sm:hidden">Hugo</span>
            <span className="hidden sm:block">Victor Hugo</span>
          </h1>

          <img
            src={mePicture}
            alt=""
            aria-hidden="true"
            className="relative z-10 h-[88svh] max-w-none -translate-x-[11vw] object-contain object-bottom drop-shadow-2xl sm:h-auto sm:max-h-[78svh] sm:max-w-[112vw] sm:translate-x-0 lg:max-h-[86svh]"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent via-background/60 to-background sm:hidden"
      />

      <button
        type="button"
        aria-label="Rolar para a próxima seção"
        onClick={() => scrollTo("#sobre", { duration: 1.1 })}
        className="absolute bottom-6 left-1/2 z-30 flex size-11 -translate-x-1/2 items-center justify-center rounded-full bg-background/35 text-foreground/80 backdrop-blur-md transition-colors hover:text-foreground sm:hidden"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden="true" />
      </button>
    </section>
  )
}
