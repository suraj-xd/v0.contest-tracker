import type { Contest } from "@/types/contest"

// Fetch contests from Google Calendar API
export async function fetchContests(): Promise<Contest[]> {
  // Define time range - current date to 30 days in future, and past 7 days
  const now = new Date()
  const timeMin = new Date(now)
  timeMin.setDate(now.getDate() - 7) // Past week

  const timeMax = new Date(now)
  timeMax.setDate(now.getDate() + 30) // Next month

  // Format dates for API
  const timeMinStr = encodeURIComponent(timeMin.toISOString())
  const timeMaxStr = encodeURIComponent(timeMax.toISOString())

  // Fetch from Google Calendar API
  const response = await fetch(
    `https://clients6.google.com/calendar/v3/calendars/iu1iul1u3n8ic3s78f4df15u4o%40group.calendar.google.com/events?calendarId=iu1iul1u3n8ic3s78f4df15u4o%40group.calendar.google.com&singleEvents=true&eventTypes=default&timeZone=Asia%2FKolkata&maxResults=250&timeMin=${timeMinStr}&timeMax=${timeMaxStr}&key=AIzaSyDOtGM5jr8bNp1utVpG2_gSRH03RNGBkI8`,
  )

  const data = await response.json()
  return parseContests(data.items)
}

// Parse raw contest data into structured format
function parseContests(items: any[]): Contest[] {
  return items.map((item) => {
    // Extract platform from summary (e.g., "[Codeforces]", "[AtCoder]", etc.)
    const platformMatch = item.summary.match(/\[(.*?)\]/)
    let platform = "Other"

    if (platformMatch) {
      const fullPlatform = platformMatch[1]

      // Map to our targeted platforms
      if (fullPlatform.includes("Codeforces")) platform = "Codeforces"
      else if (fullPlatform.includes("CodeChef")) platform = "CodeChef"
      else if (fullPlatform.includes("LeetCode")) platform = "LeetCode"
      else if (fullPlatform.includes("AtCoder")) platform = "AtCoder"
      else platform = fullPlatform
    }

    // Clean up the title by removing the platform tag
    const title = item.summary.replace(/\[.*?\]\s*/, "").trim()

    // Check if contest is in the past
    const now = new Date()
    const endTime = new Date(item.end.dateTime)
    const isPast = endTime < now

    return {
      id: item.id,
      title,
      platform,
      startTime: new Date(item.start.dateTime),
      endTime,
      url: item.location || "",
      description: item.description || "",
      isPast,
      // Add a property to indicate if the description contains HTML
      hasHtmlDescription: item.description ? /<[a-z][\s\S]*>/i.test(item.description) : false,
    }
  })
}

