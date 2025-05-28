"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import NotificationSettings from "./notification-settings"
import type { Contest } from "@/types/contest"

interface NotificationButtonProps {
  upcomingContests: Contest[]
}

export default function NotificationButton({ upcomingContests }: NotificationButtonProps) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setShowSettings(true)} className="flex items-center gap-1">
        <Bell className="h-4 w-4" />
        <span>Notifications</span>
      </Button>

      <NotificationSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        upcomingContests={upcomingContests}
      />
    </>
  )
}

