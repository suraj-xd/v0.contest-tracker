"use client"

import { useState, useEffect } from "react"
import { extractYouTubeVideoId, getYouTubeThumbnail } from "@/lib/youtube-service"
import { Card, CardContent } from "@/components/ui/card"
import { YoutubeIcon, ExternalLink } from "lucide-react"
import Image from "next/image"

interface YouTubePreviewProps {
  url: string
}

export default function YouTubePreview({ url }: YouTubePreviewProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [title, setTitle] = useState<string>("YouTube Solution")

  useEffect(() => {
    const id = extractYouTubeVideoId(url)
    setVideoId(id)

    // In a real app with API access, you could fetch the video title
    // For now, we'll just use a generic title
  }, [url])

  if (!videoId) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center gap-2 w-full justify-center"
      >
        <YoutubeIcon className="h-4 w-4" />
        Watch Solution on YouTube
      </a>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block hover:opacity-95 transition-opacity">
      <Card className="overflow-hidden">
        <div className="relative aspect-video w-full">
          <Image
            src={getYouTubeThumbnail(videoId) || "/placeholder.svg"}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/70 rounded-full p-3">
              <YoutubeIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <YoutubeIcon className="h-4 w-4 text-red-600 flex-shrink-0" />
            <p className="text-sm font-medium line-clamp-1">{title}</p>
            <ExternalLink className="h-3 w-3 ml-auto flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

