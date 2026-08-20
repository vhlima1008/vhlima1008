import { Download } from "lucide-react"
import type { IconType } from "react-icons"
import {
  SiDocker,
  SiFigma,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { GithubMark } from "@/components/icons/github-mark"
import { ButtonLink } from "@/components/motion/button/base"
import { MagneticButton } from "@/components/motion/button/magnetic"
import { Magnetic } from "@/components/motion/magnetic"
import { CylinderCarousel } from "../motion/cylinder-carousel"
import { TextReveal } from "../motion/text-reveal"

const SKILLS: { name: string; icon: IconType; color: string }[] = [
  { name: "Java", icon: SiOpenjdk, color: "#437291" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6DB33F" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
]

function SkillBall({
  name,
  icon: Icon,
  color,
}: {
  name: string
  icon: IconType
  color: string
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3">
      <Icon className="size-8" style={{ color }} />
      <span className="text-[11px] font-medium text-muted-foreground">
        {name}
      </span>
    </div>
  )
}

export function About() {
  return (
    <section id="sobre" className="relative px-6 py-24 sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Sobre
        </p>
        <div className="mt-4 flex items-center gap-4 sm:gap-5">
          <img
            src="https://avatars.githubusercontent.com/u/116356507?v=4"
            alt="Foto de perfil de Victor Hugo"
            width={80}
            height={80}
            loading="lazy"
            className="size-16 shrink-0 rounded-full border border-border object-cover sm:size-20"
          />
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Victor Hugo
            </h2>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              Desenvolvedor Full-stack | Java Spring Boot & TypeScript React
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
          <TextReveal 
            text={"Apaixonado por criar produtos inovadores de ponta a ponta, minha especialidade é entregar soluções robustas e performáticas."}          
          />
        </div>

        <div className="relative mt-8">
          <div className="p-2">
            <CylinderCarousel
              itemSize={96}
              visibleItems={5}
              minScale={0.65}
              autoRotate
              autoRotateSpeed={0.3}
            >
              {SKILLS.map((skill) => (
                <SkillBall key={skill.name} {...skill} />
              ))}
            </CylinderCarousel>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent sm:w-20" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton
            variant="outline"
            onClick={() =>
              window.open(
                "https://github.com/vhlima1008",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <GithubMark className="size-4" />
            Ver perfil no GitHub
          </MagneticButton>
          <Magnetic strength={0.25}>
            <ButtonLink
              href="/curriculo-victor-hugo.pdf"
              download="Victor-Hugo-Lima-Monteiro-Curriculo.pdf"
              variant="outline"
            >
              <Download className="size-4" />
              Baixar currículo
            </ButtonLink>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
