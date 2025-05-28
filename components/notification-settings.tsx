"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Calendar, AlertTriangle } from "lucide-react"
import { saveNotificationSettings, getNotificationSettings } from "@/lib/notification-service"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Contest } from "@/types/contest"

interface NotificationSettingsProps {
  isOpen: boolean
  onClose: () => void
  upcomingContests: Contest[]
}

export default function NotificationSettings({ isOpen, onClose, upcomingContests }: NotificationSettingsProps) {
  const [notificationsSupported, setNotificationsSupported] = useState(false)
  const [notificationsPermission, setNotificationsPermission] = useState<NotificationPermission | null>(null)
  const [browserNotificationsEnabled, setBrowserNotificationsEnabled] = useState(false)
  const [reminderTime, setReminderTime] = useState("60")
  const [email, setEmail] = useState("")
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false)
  const [selectedContests, setSelectedContests] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("browser")

  // Check if notifications are supported and get permission status
  useEffect(() => {
    const supported = "Notification" in window
    setNotificationsSupported(supported)

    if (supported) {
      setNotificationsPermission(Notification.permission)
    }

    // Load saved settings
    const settings = getNotificationSettings()
    setBrowserNotificationsEnabled(settings.browserEnabled)
    setReminderTime(settings.reminderTime.toString())
    setEmail(settings.email)
    setEmailNotificationsEnabled(settings.emailEnabled)
    setSelectedContests(settings.selectedContests)
  }, [])

  // Request notification permission
  const requestPermission = async () => {
    if (!notificationsSupported) return

    try {
      const permission = await Notification.requestPermission()
      setNotificationsPermission(permission)

      if (permission === "granted") {
        setBrowserNotificationsEnabled(true)
        // Show a test notification
        new Notification("Contest Tracker", {
          body: "Notifications are now enabled!",
          icon: "/favicon.ico",
        })
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }

  // Save notification settings
  const saveSettings = () => {
    saveNotificationSettings({
      browserEnabled: browserNotificationsEnabled,
      reminderTime: Number.parseInt(reminderTime),
      email,
      emailEnabled: emailNotificationsEnabled,
      selectedContests,
    })

    // Schedule notifications for selected contests if browser notifications are enabled
    if (browserNotificationsEnabled && notificationsPermission === "granted") {
      scheduleNotifications()
    }

    onClose()
  }

  // Schedule notifications for selected contests
  const scheduleNotifications = () => {
    if (!("serviceWorker" in navigator)) return

    const reminderTimeMs = Number.parseInt(reminderTime) * 60 * 1000 // Convert minutes to milliseconds

    upcomingContests.forEach((contest) => {
      if (selectedContests.includes(contest.id)) {
        const notificationTime = new Date(contest.startTime.getTime() - reminderTimeMs)

        // Only schedule if the notification time is in the future
        if (notificationTime > new Date()) {
          // We'll use the service worker to schedule the notification
          // This is a simplified approach - in a real app, you'd use a more robust solution
          const timeUntilNotification = notificationTime.getTime() - Date.now()

          setTimeout(() => {
            new Notification(`Contest Reminder: ${contest.title}`, {
              body: `The contest starts in ${reminderTime} minutes on ${contest.platform}`,
              icon: "/favicon.ico",
            })
          }, timeUntilNotification)
        }
      }
    })
  }

  // Generate Google Calendar event URL
  const generateGoogleCalendarUrl = (contest: Contest) => {
    const startTime = contest.startTime.toISOString().replace(/-|:|\.\d+/g, "")
    const endTime = contest.endTime.toISOString().replace(/-|:|\.\d+/g, "")

    const reminderMinutes = Number.parseInt(reminderTime)

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.title)}&details=${encodeURIComponent(`${contest.platform} Contest\n${contest.description || ""}\n\nURL: ${contest.url}`)}&location=${encodeURIComponent(contest.url)}&dates=${startTime}/${endTime}&reminders=popup,${reminderMinutes}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browser">Browser Notifications</TabsTrigger>
            <TabsTrigger value="calendar">Calendar Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="browser" className="space-y-4 py-4">
            {!notificationsSupported ? (
              <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded-md">
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm">Your browser doesn't support notifications.</p>
              </div>
            ) : notificationsPermission !== "granted" ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded-md">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="text-sm">You need to allow notifications to receive contest reminders.</p>
                </div>
                <Button onClick={requestPermission}>Allow Notifications</Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="browser-notifications"
                    checked={browserNotificationsEnabled}
                    onCheckedChange={setBrowserNotificationsEnabled}
                  />
                  <Label htmlFor="browser-notifications">Enable browser notifications</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Reminder time before contest</Label>
                  <Select value={reminderTime} onValueChange={setReminderTime}>
                    <SelectTrigger id="reminder-time">
                      <SelectValue placeholder="Select reminder time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="1440">1 day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select contests for notifications</Label>
                  <div className="border rounded-md p-2 max-h-40 overflow-y-auto space-y-2">
                    {upcomingContests.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No upcoming contests found.</p>
                    ) : (
                      upcomingContests.map((contest) => (
                        <div key={contest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`contest-${contest.id}`}
                            checked={selectedContests.includes(contest.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedContests([...selectedContests, contest.id])
                              } else {
                                setSelectedContests(selectedContests.filter((id) => id !== contest.id))
                              }
                            }}
                          />
                          <Label htmlFor={`contest-${contest.id}`} className="text-sm">
                            {contest.platform}: {contest.title}
                          </Label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4 py-4">
            <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-md">
              <Calendar className="h-5 w-5" />
              <p className="text-sm">Add contests to your calendar to receive notifications on all your devices.</p>
            </div>

            <div className="space-y-2">
              <Label>Upcoming Contests</Label>
              <div className="border rounded-md p-2 max-h-60 overflow-y-auto space-y-3">
                {upcomingContests.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No upcoming contests found.</p>
                ) : (
                  upcomingContests.map((contest) => (
                    <div key={contest.id} className="space-y-1">
                      <div className="text-sm font-medium">{contest.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {contest.platform} • {contest.startTime.toLocaleString()}
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-1" asChild>
                        <a
                          href={generateGoogleCalendarUrl(contest)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          <Calendar className="h-3 w-3" />
                          Add to Google Calendar
                        </a>
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email for calendar invites (optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This email is stored locally and used only for calendar invites.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={saveSettings}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

