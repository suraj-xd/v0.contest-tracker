// Service Worker for handling background notifications

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})

// Listen for push notifications
self.addEventListener("push", (event) => {
  if (!event.data) return

  try {
    const data = event.data.json()

    const options = {
      body: data.body,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: {
        url: data.url,
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  } catch (error) {
    console.error("Error showing notification:", error)
  }
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(clients.openWindow(event.notification.data.url))
  }
})

// Handle scheduled notifications
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SCHEDULE_NOTIFICATION") {
    const { contest, reminderTime } = event.data

    const notificationTime = new Date(contest.startTime).getTime() - reminderTime * 60 * 1000
    const now = Date.now()

    if (notificationTime > now) {
      const timeUntilNotification = notificationTime - now

      setTimeout(() => {
        self.registration.showNotification(`Contest Reminder: ${contest.title}`, {
          body: `The contest starts in ${reminderTime} minutes on ${contest.platform}`,
          icon: "/favicon.ico",
          data: {
            url: contest.url,
          },
        })
      }, timeUntilNotification)
    }
  }
})

