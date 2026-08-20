export type NpmDownloadPeriod = "last-day" | "last-week" | "last-month" | "last-year"

export type NpmDownloads = {
  package: string
  downloads: number
  start: string
  end: string
}

export async function getNpmDownloads(
  packageName: string,
  period: NpmDownloadPeriod = "last-month",
): Promise<NpmDownloads> {
  const encodedName = packageName.startsWith("@")
    ? packageName.replace("/", "%2F")
    : packageName

  const response = await fetch(
    `https://api.npmjs.org/downloads/point/${period}/${encodedName}`,
  )

  if (!response.ok) {
    throw new Error(
      `Failed to fetch npm downloads for "${packageName}": ${response.status}`,
    )
  }

  return response.json()
}
