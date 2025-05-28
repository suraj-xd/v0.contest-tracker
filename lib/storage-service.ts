import type { SolutionLink } from "@/types/contest"

// For storing bookmarked contests
export function getBookmarkedContests(): string[] {
  if (typeof window === "undefined") return []

  const bookmarks = localStorage.getItem("bookmarkedContests")
  return bookmarks ? JSON.parse(bookmarks) : []
}

export function toggleBookmarkedContest(contestId: string): string[] {
  const bookmarks = getBookmarkedContests()
  const index = bookmarks.indexOf(contestId)

  if (index === -1) {
    bookmarks.push(contestId)
  } else {
    bookmarks.splice(index, 1)
  }

  localStorage.setItem("bookmarkedContests", JSON.stringify(bookmarks))
  return bookmarks
}

// For storing platform filter preferences
export function getSelectedPlatforms(): string[] {
  if (typeof window === "undefined") return ["Codeforces", "CodeChef", "LeetCode"]

  const platforms = localStorage.getItem("selectedPlatforms")
  return platforms ? JSON.parse(platforms) : ["Codeforces", "CodeChef", "LeetCode"]
}

export function setSelectedPlatforms(platforms: string[]): void {
  localStorage.setItem("selectedPlatforms", JSON.stringify(platforms))
}

// For managing solution links
export function getSolutionLinks(): SolutionLink[] {
  if (typeof window === "undefined") return []

  const links = localStorage.getItem("solutionLinks")
  return links ? JSON.parse(links) : []
}

export function addSolutionLink(contestId: string, youtubeUrl: string): void {
  const links = getSolutionLinks()
  links.push({ contestId, youtubeUrl })
  localStorage.setItem("solutionLinks", JSON.stringify(links))
}

