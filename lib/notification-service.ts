import type { Contest } from "@/types/contest"

export interface NotificationSettings {
  browserEnabled: boolean
  reminderTime: number // in minutes
  email: string
  emailEnabled: boolean
  selectedContests: string[]
}

// Default notification settings
const defaultSettings: NotificationSettings = {
  browserEnabled: false,
  reminderTime: 60, // 1 hour
  email: "",
  emailEnabled: false,
  selectedContests: [],
}

// Save notification settings to localStorage
export function saveNotificationSettings(settings: NotificationSettings): void {
  if (typeof window === "undefined") return
  localStorage.setItem("notificationSettings", JSON.stringify(settings))
}

// Get notification settings from localStorage
export function getNotificationSettings(): NotificationSettings {
  if (typeof window === "undefined") return defaultSettings

  const settings = localStorage.getItem("notificationSettings")
  return settings ? JSON.parse(settings) : defaultSettings
}

// Generate iCalendar (.ics) file content for a contest
export function generateICalendarFile(contest: Contest, reminderMinutes: number): string {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const start = contest.startTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const end = contest.endTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  // Generate a unique ID for the event
  const eventId = `contest-${contest.id}@contesttracker.app`

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Contest Tracker//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTAMP:${now}
DTSTART:${start}
DTEND:${end}
SUMMARY:${contest.title}
DESCRIPTION:${contest.platform} Contest\\n${contest.description || ""}\\n\\nURL: ${contest.url}
LOCATION:${contest.url}
URL:${contest.url}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder for ${contest.title}
TRIGGER:-PT${reminderMinutes}M
END:VALARM
UID:${eventId}
END:VEVENT
END:VCALENDAR`
}

// Download iCalendar file
export function downloadICalendarFile(contest: Contest, reminderMinutes: number): void {
  const icsContent = generateICalendarFile(contest, reminderMinutes)
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${contest.platform}-${contest.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Generate URL for adding to Google Calendar
export function generateGoogleCalendarUrl(contest: Contest, reminderMinutes: number): string {
  const startTime = contest.startTime.toISOString().replace(/-|:|\.\d+/g, "")
  const endTime = contest.endTime.toISOString().replace(/-|:|\.\d+/g, "")

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.title)}&details=${encodeURIComponent(`${contest.platform} Contest\n${contest.description || ""}\n\nURL: ${contest.url}`)}&location=${encodeURIComponent(contest.url)}&dates=${startTime}/${endTime}&reminders=popup,${reminderMinutes}`
}

// Check if browser notifications are supported
export function areBrowserNotificationsSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window
}

// Request permission for browser notifications
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!areBrowserNotificationsSupported()) {
    return "denied"
  }

  return await Notification.requestPermission()
}

// Schedule a browser notification
export function scheduleNotification(contest: Contest, reminderMinutes: number): void {
  if (!areBrowserNotificationsSupported() || Notification.permission !== "granted") {
    return
  }

  const notificationTime = new Date(contest.startTime.getTime() - reminderMinutes * 60 * 1000)
  const now = new Date()

  if (notificationTime > now) {
    const timeUntilNotification = notificationTime.getTime() - now.getTime()

    setTimeout(() => {
      new Notification(`Contest Reminder: ${contest.title}`, {
        body: `The contest starts in ${reminderMinutes} minutes on ${contest.platform}`,
        icon: "/favicon.ico",
      })
    }, timeUntilNotification)
  }
}

// Register service worker for background notifications
export async function registerNotificationServiceWorker(): Promise<void> {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/notification-worker.js")
      console.log("Notification service worker registered:", registration)
    } catch (error) {
      console.error("Error registering notification service worker:", error)
    }
  }
}

