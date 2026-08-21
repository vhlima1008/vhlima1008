export type GithubRepoRef = {
  owner: string
  repo: string
}

export function parseGithubRepo(repoUrl: string): GithubRepoRef | null {
  const match = repoUrl.match(/github\.com\/([^/]+)\/([^/#?]+)/i)
  if (!match) return null
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") }
}

const readmeCache = new Map<string, Promise<string>>()

export function getGithubReadme(repoUrl: string): Promise<string> {
  const cached = readmeCache.get(repoUrl)
  if (cached) return cached

  const request = (async () => {
    const ref = parseGithubRepo(repoUrl)
    if (!ref) throw new Error("URL do repositório inválida.")

    const response = await fetch(
      `https://api.github.com/repos/${ref.owner}/${ref.repo}/readme`,
      { headers: { Accept: "application/vnd.github.raw+json" } },
    )

    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "Este repositório não possui um README."
          : `Não foi possível carregar o README (erro ${response.status}).`,
      )
    }

    return response.text()
  })()

  request.catch(() => readmeCache.delete(repoUrl))
  readmeCache.set(repoUrl, request)
  return request
}
