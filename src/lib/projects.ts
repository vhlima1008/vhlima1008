export type Project = {
  slug: string
  name: string
  description: string
  language?: string
  topics: string[]
  repoUrl: string
  liveUrl?: string
  isPinned?: boolean
  stars?: number
  forks?: number
  watchers?: number
  openIssues?: number
  updatedAt?: string
  isArchived?: boolean
}

export const GITHUB_OWNER = "vhlima1008"
export const GITHUB_PROJECTS_PAGE_SIZE = 5
const DEFAULT_PINNED_REPOS = "data-formatters,leetcode"
const PINNED_REPO_NAMES = new Set<string>(
  String(import.meta.env.VITE_GITHUB_PINNED_REPOS ?? DEFAULT_PINNED_REPOS)
    .split(",")
    .map((repo: string) => repo.trim().toLowerCase())
    .filter(Boolean),
)

type GithubRepo = {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics?: string[]
  fork: boolean
  archived: boolean
  stargazers_count: number
  forks_count: number
  watchers_count: number
  open_issues_count: number
  updated_at: string
}

export type GithubProjectsPage = {
  projects: Project[]
  hasMore: boolean
}

type GithubReposPage = {
  repos: GithubRepo[]
  hasMore: boolean
}

const githubProjectsCache = new Map<string, Promise<GithubProjectsPage>>()
const githubReposCache = new Map<string, Promise<GithubReposPage>>()
const PINNED_TOPICS = new Set(["featured", "pinned"])

function toTitle(name: string) {
  return name
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function toProject(repo: GithubRepo): Project {
  return {
    slug: repo.name,
    name: toTitle(repo.name),
    description: repo.description ?? "Repositório público no GitHub.",
    language: repo.language ?? undefined,
    topics: repo.topics ?? [],
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    isPinned: isPinnedRepo(repo),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    openIssues: repo.open_issues_count,
    updatedAt: repo.updated_at,
    isArchived: repo.archived,
  }
}

function parseLinkHeader(header: string | null) {
  if (!header) return new Set<string>()

  return new Set(
    header
      .split(",")
      .map((part) => part.match(/rel="([^"]+)"/)?.[1])
      .filter((rel): rel is string => Boolean(rel)),
  )
}

function isVisibleRepo(repo: GithubRepo) {
  return (
    !repo.fork &&
    !repo.archived &&
    repo.name.toLowerCase() !== GITHUB_OWNER.toLowerCase()
  )
}

function isPinnedRepo(repo: GithubRepo) {
  return (
    PINNED_REPO_NAMES.has(repo.name.toLowerCase()) ||
    (repo.topics ?? []).some((topic) =>
      PINNED_TOPICS.has(topic.toLowerCase()),
    )
  )
}

function compareRepos(a: GithubRepo, b: GithubRepo) {
  const pinnedA = isPinnedRepo(a)
  const pinnedB = isPinnedRepo(b)

  if (pinnedA !== pinnedB) return pinnedA ? -1 : 1

  const updatedOrder =
    new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  if (updatedOrder !== 0) return updatedOrder

  return a.name.localeCompare(b.name, "en", {
    sensitivity: "base",
  })
}

function hasFoundConfiguredPins(repos: GithubRepo[]) {
  if (PINNED_REPO_NAMES.size === 0) return true

  const repoNames = new Set(repos.map((repo) => repo.name.toLowerCase()))
  for (const pinnedRepoName of PINNED_REPO_NAMES) {
    if (!repoNames.has(pinnedRepoName)) return false
  }

  return true
}

function getGithubReposPage(
  page: number,
  perPage: number,
): Promise<GithubReposPage> {
  const cacheKey = `${page}:${perPage}`
  const cached = githubReposCache.get(cacheKey)
  if (cached) return cached

  const request = (async () => {
    const params = new URLSearchParams({
      sort: "updated",
      direction: "desc",
      type: "owner",
      per_page: String(perPage),
      page: String(page),
    })
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_OWNER}/repos?${params}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Não foi possível carregar os projetos do GitHub.`)
    }

    const repos = (await response.json()) as GithubRepo[]
    const rels = parseLinkHeader(response.headers.get("Link"))

    return {
      repos,
      hasMore: rels.has("next"),
    }
  })()

  request.catch(() => githubReposCache.delete(cacheKey))
  githubReposCache.set(cacheKey, request)
  return request
}

export function getGithubProjectsPage(
  page: number,
  perPage = GITHUB_PROJECTS_PAGE_SIZE,
): Promise<GithubProjectsPage> {
  const cacheKey = `${page}:${perPage}`
  const cached = githubProjectsCache.get(cacheKey)
  if (cached) return cached

  const request = (async () => {
    const visibleRepos: GithubRepo[] = []
    let rawPage = 1
    let hasMore = true
    const visibleEnd = page * perPage

    while (
      (visibleRepos.length < visibleEnd ||
        !hasFoundConfiguredPins(visibleRepos)) &&
      hasMore
    ) {
      const response = await getGithubReposPage(rawPage, perPage)
      visibleRepos.push(...response.repos.filter(isVisibleRepo))
      hasMore = response.hasMore
      rawPage += 1
    }

    const visibleStart = (page - 1) * perPage
    const pageRepos = visibleRepos
      .toSorted(compareRepos)
      .slice(visibleStart, visibleEnd)

    return {
      projects: pageRepos.map(toProject),
      hasMore: hasMore || visibleRepos.length > visibleEnd,
    }
  })()

  request.catch(() => githubProjectsCache.delete(cacheKey))
  githubProjectsCache.set(cacheKey, request)
  return request
}
