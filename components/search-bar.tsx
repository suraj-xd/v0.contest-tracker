"use client"

import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  // Update search on query change
  useEffect(() => {
    // Debounce search to avoid too many updates
    const handler = setTimeout(() => {
      onSearch(query)
    }, 300)

    return () => clearTimeout(handler)
  }, [query, onSearch])

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search contests..."
          className="pl-10 pr-10 h-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full aspect-square rounded-l-none"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}

