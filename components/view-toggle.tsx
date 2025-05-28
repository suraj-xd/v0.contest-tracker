"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon, ListIcon } from "lucide-react"

interface ViewToggleProps {
  currentView: "list" | "calendar"
  onViewChange: (view: "list" | "calendar") => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentView === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("list")}
        className="flex items-center gap-2 h-9"
      >
        <ListIcon className="h-4 w-4" />
        <span>List</span>
      </Button>
      <Button
        variant={currentView === "calendar" ? "default" : "outline"}
        size="sm"
        onClick={() => onViewChange("calendar")}
        className="flex items-center gap-2 h-9"
      >
        <CalendarIcon className="h-4 w-4" />
        <span>Calendar</span>
      </Button>
    </div>
  )
}

