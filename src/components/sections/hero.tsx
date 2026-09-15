import { ArrowDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import vhLogo from "@/assets/VH.svg"
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
      onContextMenu={(event) => event.preventDefault()}
      className="dark relative flex min-h-svh flex-col items-center justify-center overflow-hidden border-b border-border bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#bbfbff] via-[#8dd8ff] via-55% to-[#5409da]"
      />
      {heroInView ? (
        <ShaderBackground
          variant="mesh-gradient"
          colors={["#bbfbff", "#8dd8ff", "#4e71ff", "#5409da"]}
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#06142a]/70 via-[#06142a]/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5409da]/25 via-[#4e71ff]/10 to-[#0b2447]/70"
      />

      <div className="relative z-10 flex min-h-svh w-full flex-col justify-center overflow-hidden px-0">
        <div className="relative flex flex-1 items-end justify-center">
          <h1 className="sr-only">Victor Hugo</h1>

          <img
            src={vhLogo}
            alt=""
            aria-hidden="true"
            draggable={false}
            fetchPriority="high"
            className="media-reveal pointer-events-none absolute bottom-24 left-1/2 z-20 w-[min(88vw,22rem)] -translate-x-1/2 select-none object-contain opacity-95 mix-blend-screen brightness-125 drop-shadow-[0_0_2.5rem_rgba(165,215,232,0.34)] sm:bottom-auto sm:top-[42%] sm:z-0 sm:w-[min(112vw,78rem)] sm:-translate-y-1/2 lg:top-[45%] lg:w-[min(86vw,88rem)]"
          />

          <img
            src={mePicture}
            alt=""
            aria-hidden="true"
            draggable={false}
            fetchPriority="high"
            className="media-reveal relative z-10 h-[88svh] max-w-none translate-x-0 object-contain object-bottom drop-shadow-2xl sm:h-auto sm:max-h-[78svh] sm:max-w-[112vw] lg:max-h-[86svh]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[15] h-[34svh] bg-gradient-to-t from-[#020817]/80 via-[#020817]/38 to-transparent sm:hidden"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-b from-transparent via-background/60 to-background sm:hidden"
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
