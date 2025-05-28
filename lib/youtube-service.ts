// Function to search for YouTube videos related to a contest
export async function searchYouTubeSolutions(contest: {
  title: string
  platform: string
  startTime: Date
}): Promise<string | null> {
  try {
    // Format the contest date for better search results
    const dateStr = contest.startTime.toISOString().split("T")[0] // YYYY-MM-DD

    // Create a search query combining platform, contest name, and "solution"
    const searchQuery = encodeURIComponent(`${contest.platform} ${contest.title} ${dateStr} solution editorial`)

    // If we had a YouTube API key, we could use the official API
    // Since we don't, we'll return a search URL that users can click
    // In a production app, you would use the YouTube Data API with your API key

    // For now, we'll simulate finding a video by constructing a search URL
    return `https://www.youtube.com/results?search_query=${searchQuery}`

    /* 
    // With a YouTube API key, you could do something like this:
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchQuery}&type=video&key=${API_KEY}`
    );
    
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    */
  } catch (error) {
    console.error("Error searching YouTube:", error)
    return null
  }
}

// Function to extract video ID from YouTube URL
export function extractYouTubeVideoId(url: string): string | null {
  // Handle youtube.com/watch?v= format
  let match = url.match(/youtube\.com\/watch\?v=([^&]+)/)
  if (match) return match[1]

  // Handle youtu.be/ format
  match = url.match(/youtu\.be\/([^?]+)/)
  if (match) return match[1]

  return null
}

// Function to get YouTube thumbnail from video ID
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

