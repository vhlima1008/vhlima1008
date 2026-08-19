export type ExperienceKind = "work" | "education" | "research" | "volunteer"

export type ExperienceEntry = {
  id: string
  kind: ExperienceKind
  /** Short label used as the accordion title — must stay truncation-safe on mobile. */
  short: string
  organization: string
  role: string
  period: string
  bullets: string[]
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "leste-telecom",
    kind: "work",
    short: "Leste Telecom",
    organization: "Leste Telecom",
    role: "Estagiário de Desenvolvimento",
    period: "Março 2026 – Atual",
    bullets: [
      "Desenvolve e mantém 3 aplicações corporativas em Java Spring Boot e React TypeScript, usadas diariamente por cerca de 150 colaboradores.",
      "Refatora estruturas de banco de dados MySQL e otimiza queries, reduzindo em 50% o tempo médio de resposta de APIs Node.js em produção.",
      "Resolveu um gargalo arquitetural em componente de listagem aninhada, reduzindo o tempo de resposta em 75% sem alterar o escopo funcional.",
      "Documenta o front-end para o setor de TI, apoiando a modernização do ecossistema interno da empresa.",
    ],
  },
  {
    id: "ventrium",
    kind: "work",
    short: "Ventrium",
    organization: "Ventrium Aceleradora de Crescimento",
    role: "Desenvolvedor Júnior (Contrato)",
    period: "Setembro 2025 – Fevereiro 2026",
    bullets: [
      "Implementou interfaces em React e TypeScript aplicando clean code e padrões reutilizáveis.",
      "Introduziu o Mantine UI nos projetos da empresa, reduzindo em ~50% o tempo de desenvolvimento de novas telas.",
      "Projetou protótipos interativos no Figma, alinhando requisitos funcionais e implementação técnica.",
      "Reestruturou fluxos de navegação aplicando as Heurísticas de Nielsen.",
    ],
  },
  {
    id: "ifrj-bacharelado",
    kind: "education",
    short: "IFRJ",
    organization: "Instituto Federal do Rio de Janeiro (IFRJ)",
    role: "Bacharelado em Engenharia da Computação",
    period: "Abril 2025 – Atual",
    bullets: [
      "Formação em andamento com foco em engenharia de software, algoritmos e sistemas.",
    ],
  },
  {
    id: "cnpq",
    kind: "research",
    short: "CNPq",
    organization: "CNPq",
    role: "Bolsista de Iniciação Científica Júnior",
    period: "Maio 2024 – Agosto 2024",
    bullets: [
      "Desenvolveu um aplicativo móvel de educação financeira com React Native, Node.js e Supabase.",
      "Integrou uma API externa de cotação de dólar comercial em tempo real.",
      "Projetou interfaces no Figma seguindo boas práticas de UI/UX.",
    ],
  },
  {
    id: "faperj",
    kind: "research",
    short: "FAPERJ",
    organization: "FAPERJ",
    role: "Bolsista Jovem Talento",
    period: "Julho 2023 – Dezembro 2024",
    bullets: [
      "Desenvolveu o MVP da plataforma #MostraTech (WordPress + Elementor), centralizando as bolsas de pesquisa do IFRJ campus Niterói — cerca de 10 projetos submetidos.",
      "Estruturou a base de conhecimento da plataforma via Echo Knowledge Base, com apoio de JavaScript para as ações do usuário.",
    ],
  },
  {
    id: "aluno-monitor",
    kind: "volunteer",
    short: "IFRJ — Monitoria",
    organization: "IFRJ — Educação Popular no IFRJ",
    role: "Aluno Monitor (voluntário)",
    period: "Fevereiro 2023 – Dezembro 2023",
    bullets: [
      "Ministrou aulas de apoio em Programação, Desenvolvimento Web, Banco de Dados e Algoritmos para turmas de 15 a 20 alunos do Técnico em Informática.",
    ],
  },
]
