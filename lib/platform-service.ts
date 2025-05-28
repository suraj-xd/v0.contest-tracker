// Platform-related functionality
import type { PlatformIcon } from "@/types/contest"

// Platform icons
const platformIcons: PlatformIcon[] = [
  {
    platform: "LeetCode",
    iconUrl: "https://img.icons8.com/?size=160&id=wDGo581Ea5Nf&format=png",
  },
  {
    platform: "Codeforces",
    iconUrl: "https://img.icons8.com/?size=160&id=jldAN67IAsrW&format=png",
  },
  {
    platform: "AtCoder",
    iconUrl:
      "https://d1q9av5b648rmv.cloudfront.net/v3/1024x1024/sticker/m/white/front/6242844/1614660290-967x954.png.webp?h=508214e01a4eb6c5b734533da4420fed45bffa88&printed=true",
  },
  {
    platform: "CodeChef",
    iconUrl: "/placeholder.svg?height=160&width=160",
  },
]

// Get platform icon
export function getPlatformIcon(platform: string): string {
  const icon = platformIcons.find((p) => p.platform === platform)
  return icon?.iconUrl || "/placeholder.svg?height=160&width=160"
}

// Get platform color
export function getPlatformColor(platform: string): string {
  switch (platform) {
    case "Codeforces":
      return "#1890FF"
    case "CodeChef":
      return "#5CB85C"
    case "LeetCode":
      return "#FFA116"
    case "AtCoder":
      return "#6E56CF" // Changed from #222222 to a more visible purple
    default:
      return "#6366F1"
  }
}

// Get all platforms
export function getAllPlatforms(): string[] {
  return platformIcons.map((p) => p.platform)
}

