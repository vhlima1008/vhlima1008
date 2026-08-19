export type ProjectCaseStudy = {
  problem: string
  approach: string
  result: string
}

export type Project = {
  slug: string
  name: string
  description: string
  language?: string
  topics: string[]
  repoUrl: string
  liveUrl?: string
  caseStudy?: ProjectCaseStudy
}

export const PROJECTS: Project[] = [
  {
    slug: "escreveaqui",
    name: "Escreve Aqui",
    description:
      "Editor de texto online, anônimo e open source, feito no Brasil.",
    topics: [],
    repoUrl: "https://github.com/vhlima1008/escreveaqui",
    liveUrl: "https://escreveaqui.com.br",
  },
  {
    slug: "data-formatters",
    name: "Data Formatters",
    description:
      "Biblioteca utilitária para formatação de dados com base na API Intl, publicada no npm.",
    language: "TypeScript",
    topics: [],
    repoUrl: "https://github.com/vhlima1008/data-formatters",
    liveUrl: "https://www.npmjs.com/package/data-formatters",
    caseStudy: {
      problem:
        "Formatar datas, moedas e números de forma consistente entre ambientes JavaScript diferentes (navegador, Node, runtimes de edge) normalmente significa reescrever a mesma lógica em cada projeto ou puxar uma dependência pesada só para isso.",
      approach:
        "Construí uma biblioteca enxuta e sem dependências externas em cima da API Intl nativa do JavaScript, garantindo que o comportamento seja previsível independentemente de onde o código roda.",
      result:
        "Publicada como pacote open-source no npm, com testes automatizados e um pipeline de CI via GitHub Actions rodando a cada push — para pegar qualquer regressão de formatação antes que chegue a produção.",
    },
  },
  {
    slug: "form-builder",
    name: "Form Builder",
    description:
      "Estudo de caso replicando o funcionamento do Google Forms, com back-end em Java Spring Boot e front-end em React.",
    language: "JavaScript",
    topics: ["java", "spring-boot", "react", "typescript"],
    repoUrl: "https://github.com/vhlima1008/form-builder",
  },
  {
    slug: "job-manager-api",
    name: "Job Manager API",
    description:
      "API REST em Java, construída durante a formação completa em Java da Rocketseat.",
    language: "Java",
    topics: [],
    repoUrl: "https://github.com/vhlima1008/job-manager-api",
  },
  {
    slug: "taskflow-api",
    name: "TaskFlow API",
    description: "Serviço REST para gerenciamento de tarefas pessoais.",
    language: "Python",
    topics: ["api-rest", "django-rest-framework"],
    repoUrl: "https://github.com/vhlima1008/taskflow-api",
  },
  {
    slug: "bank-system",
    name: "Bank System",
    description:
      "Protótipo educacional de banco digital em Python com interface Streamlit: login, saldo, depósitos, saques e financiamento PRICE com CET.",
    language: "Python",
    topics: [],
    repoUrl: "https://github.com/vhlima1008/bank-system",
    liveUrl: "https://vhlima1008-bank-system.streamlit.app",
  },
  {
    slug: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    description: "Jogo da velha construído com React e TypeScript.",
    language: "TypeScript",
    topics: ["react", "typescript", "game"],
    repoUrl: "https://github.com/vhlima1008/tic-tac-toe",
    liveUrl:
      "https://codesandbox.io/p/github/Gannicos/Tic-Tac-Toe/main?import=true",
  },
  {
    slug: "calculus-api",
    name: "Calculus API",
    description: "API de estudo para operações matemáticas.",
    language: "JavaScript",
    topics: [],
    repoUrl: "https://github.com/vhlima1008/calculus-api",
  },
]
