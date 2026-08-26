const markdownFiles = import.meta.glob<string>("./blog-content/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
})

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string
}

function createSlug(path: string) {
  return path
    .split("/")
    .pop()
    ?.replace(/\.md$/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function stripMarkdown(value: string) {
  return value
    .replace(/^#{1,6}\s+/g, "")
    .replace(/`{1,3}/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/g, "")
    .replace(/^[-*+]\s+/g, "")
    .replace(/^\d+\.\s+/g, "")
    .trim()
}

function parseBlogPost(path: string, content: string): BlogPost {
  const lines = content.split(/\r?\n/)
  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line.trim()))
  const title =
    titleIndex >= 0
      ? stripMarkdown(lines[titleIndex])
      : createSlug(path)?.replace(/-/g, " ") || "Sem título"

  const bodyLines = lines
    .slice(titleIndex >= 0 ? titleIndex + 1 : 0)
    .filter((line) => !/^#{1,6}\s+/.test(line.trim()))
    .filter((line) => !/^```/.test(line.trim()))
    .filter((line) => !/^\|/.test(line.trim()))
    .map(stripMarkdown)
    .filter(Boolean)
    .filter((line) => !/^\|?\s*-{3,}/.test(line))
    .slice(0, 2)

  return {
    slug: createSlug(path) || title.toLowerCase().replace(/\s+/g, "-"),
    title,
    excerpt: bodyLines.join(" "),
    content,
  }
}

export function getBlogPosts(): BlogPost[] {
  return Object.entries(markdownFiles)
    .map(([path, content]) => parseBlogPost(path, content))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
}
