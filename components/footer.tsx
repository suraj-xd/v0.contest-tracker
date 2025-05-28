import Link from "next/link"
import { Github, Linkedin, Info, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="mt-16 py-6 border-t">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground font-heading">
          © {new Date().getFullYear()} Contest Tracker. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </Link>

          <a
            href="https://www.linkedin.com/in/gaudsuraj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <Linkedin className="h-4 w-4" />
            <span>Vibe Coded by Suraj Gaud</span>
          </a>

          <a
            href="https://twitter.com/notsurajgaud"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <Twitter className="h-4 w-4" />
            <span>@notsurajgaud</span>
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

