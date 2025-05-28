"use client"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import type { Contest } from "@/types/contest"
import { downloadICalendarFile, generateGoogleCalendarUrl } from "@/lib/notification-service"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

interface CalendarExportButtonProps {
  contest: Contest
  reminderMinutes?: number
}

export default function CalendarExportButton({ contest, reminderMinutes = 60 }: CalendarExportButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
          </svg>
          <span>Add to Calendar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a
            href={generateGoogleCalendarUrl(contest, reminderMinutes)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-4 h-4 relative">
              <Image
                src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_10_2x.png"
                alt="Google Calendar"
                width={16}
                height={16}
              />
            </div>
            <span>Google Calendar</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => downloadICalendarFile(contest, reminderMinutes)}>
          <Download className="h-4 w-4 mr-2" />
          <span>Download .ics File</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

