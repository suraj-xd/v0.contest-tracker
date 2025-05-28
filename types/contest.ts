export interface Contest {
  id: string
  title: string
  platform: string
  startTime: Date
  endTime: Date
  url: string
  description: string
  isPast: boolean
  hasHtmlDescription?: boolean
}

export interface SolutionLink {
  contestId: string
  youtubeUrl: string
}

export interface PlatformIcon {
  platform: string
  iconUrl: string
}

