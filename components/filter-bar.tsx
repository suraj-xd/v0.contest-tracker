"use client"
import PlatformFilter from "./platform-filter"
import NotificationButton from "./notification-button"

interface FilterBarProps {
  platforms: string[]
  selectedPlatforms: string[]
  onTogglePlatform: (platform: string) => void
  upcomingContests: any[]
}

export default function FilterBar({
  platforms,
  selectedPlatforms,
  onTogglePlatform,
  upcomingContests,
}: FilterBarProps) {
  return (
    <div className="bg-muted/40 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="w-full">
          <h2 className="text-sm font-medium mb-2">Filter by Platform</h2>
          <PlatformFilter
            platforms={platforms}
            selectedPlatforms={selectedPlatforms}
            onTogglePlatform={onTogglePlatform}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <NotificationButton upcomingContests={upcomingContests} />
        </div>
      </div>
    </div>
  )
}

