"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function CmdButton() {
  const [shortcut, setShortcut] = useState("⌘K")
  const isMobile = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    // Use Ctrl+K on Windows/Linux and ⌘K on macOS
    const isMac = navigator.userAgent.indexOf("Mac") !== -1
    setShortcut(isMac ? "⌘K" : "Ctrl+K")
  }, [])

  return (
    <Button
      variant="outline"
      size="sm"
      className={`relative h-9 ${isMobile ? "w-9 p-0" : "w-full justify-start text-muted-foreground md:w-40 lg:w-64"}`}
      onClick={() => {
        // Simulate pressing the shortcut
        const event = new KeyboardEvent("keydown", {
          key: "k",
          metaKey: true,
          bubbles: true,
        })
        document.dispatchEvent(event)
      }}
    >
      <Search className={`${isMobile ? "" : "mr-2"} h-4 w-4`} />
      {!isMobile && (
        <>
          <span className="hidden lg:inline-flex">Search contests...</span>
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
            {shortcut}
          </kbd>
        </>
      )}
    </Button>
  )
}

