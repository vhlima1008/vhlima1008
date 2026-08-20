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
    caseStudy: {
      problem:
        "Replicar o Google Forms como estudo de caso exigia sustentar formulários com múltiplas seções e perguntas de tipos variados, além de separar claramente a área autenticada de quem cria formulários da área pública de quem apenas responde.",
      approach:
        "Modelei o domínio em um schema MySQL com sete entidades (usuários, formulários, seções, perguntas, opções e respostas) usando UUID como chave primária, e separei rotas privadas de criação/edição das rotas públicas de resposta por slug no back-end em Spring Boot, consumido por um front-end em React e TypeScript.",
      result:
        "MVP funcional orquestrado via Docker Compose, com back-end e front-end rodando de forma independente e um modelo de dados documentado (MER) cobrindo toda a estrutura de formulários, seções, perguntas e respostas.",
    },
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
    caseStudy: {
      problem:
        "Protótipo educacional para praticar arquitetura em camadas — a lógica de domínio bancário (login, saldo, depósitos, saques, financiamento) precisava ficar isolada da camada de apresentação, em vez de misturada com o código da interface.",
      approach:
        "Isolei a lógica de negócio em Python puro e agnóstico de framework, dentro de um pacote core (User, Transaction, Extract, Financing), e usei o Streamlit apenas para consumir esse domínio via páginas multipage, incluindo simulação de financiamento pelo sistema PRICE com cálculo de CET.",
      result:
        "Aplicação publicada no Streamlit Community Cloud, com fluxo completo de login mock, operações de saldo, depósito e saque, e extrato renderizado a partir da própria saída do domínio.",
    },
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
