import { Download } from "lucide-react"
import type { IconType } from "react-icons"
import { FaLinkedin } from "react-icons/fa6"
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
import meProfilePicture from "@/assets/me-profile-picture.png"
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
            src={meProfilePicture}
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
          
          {
            <TextReveal
              delay={2}
              stagger={0.012}
              text={[
                `Atualmente curso Bacharelado em Engenharia da Computação pelo Instituto Federal do Rio de Janeiro (IFRJ), desde abril de 2025, com atuação no desenvolvimento de soluções digitais utilizando as tecnologias Java (Spring Boot), Node.js, Python e React (TypeScript). Tenho interesse particular em aplicações personalizadas e em arquiteturas escaláveis e performáticas.`,
                " ",
                `Meu envolvimento com pesquisa e desenvolvimento teve início ainda durante a formação técnica, por meio da bolsa Jovem Talento concedida pela FAPERJ (julho de 2023 a dezembro de 2024), período em que desenvolvi o MVP da plataforma #MostraTech em WordPress com Elementor, responsável por centralizar as bolsas de pesquisa do IFRJ – campus Niterói, reunindo aproximadamente dez projetos submetidos. Em 2024, fui reconhecido com o prêmio de Solução em Destaque (Top 15) na Olimpíada de Inovação do Agronegócio (OiAgro) pela solução TilApp e, na sequência, tornei-me Bolsista de Iniciação Científica Júnior pelo CNPq (maio a agosto de 2024), atuando no desenvolvimento de um aplicativo móvel de educação financeira com React Native, Node.js e Supabase.`,
                " ",
                `Profissionalmente, atuo desde março de 2026 como Estagiário de Desenvolvimento na Leste Telecom, onde desenvolvo e mantenho aplicações corporativas em Java Spring Boot e React TypeScript, utilizadas diariamente por cerca de 150 colaboradores. Anteriormente, atuei como Desenvolvedor Júnior na Ventrium Aceleradora de Crescimento (setembro de 2025 a fevereiro de 2026), onde implementei interfaces em React e TypeScript aplicando boas práticas de código reutilizável.`,
              ]}
            />
          }
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
          <MagneticButton
            variant="outline"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/vhlima1008",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <FaLinkedin className="size-4" />
            Ver perfil no LinkedIn
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
