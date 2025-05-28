import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Bell, Bookmark, Calendar, Search, Youtube, Command, Star, ExternalLink } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Contest Tracker</span>
      </Link>

      <div className="space-y-6">
        <h1 className="text-4xl font-bold">About Contest Tracker</h1>
        <p className="text-xl text-muted-foreground">
          Contest Tracker helps competitive programmers stay organized and never miss a coding contest.
        </p>
      </div>

      <div className="grid gap-8 mt-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>

          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              icon={<Calendar className="h-5 w-5 text-primary" />}
              title="Contest Calendar"
              description="View upcoming and past contests from multiple platforms in list or calendar view."
            />

            <FeatureCard
              icon={<Bell className="h-5 w-5 text-primary" />}
              title="Notifications"
              description="Get browser notifications for upcoming contests and never miss a competition."
            />

            <FeatureCard
              icon={<Bookmark className="h-5 w-5 text-primary" />}
              title="Bookmarking"
              description="Bookmark important contests to keep track of the ones you're interested in."
            />

            <FeatureCard
              icon={<Youtube className="h-5 w-5 text-primary" />}
              title="Solution Links"
              description="Add YouTube solution links to past contests for future reference."
            />

            <FeatureCard
              icon={<Search className="h-5 w-5 text-primary" />}
              title="Search & Filter"
              description="Quickly find contests by name or platform with instant search."
            />

            <FeatureCard
              icon={<Command className="h-5 w-5 text-primary" />}
              title="Command Menu"
              description="Use Cmd+K to quickly navigate and find contests from anywhere."
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">How to Use</h2>

          <div className="space-y-8">
            <HowToCard
              number="01"
              title="Bookmark Important Contests"
              description="Click the star icon on any contest card to bookmark it for quick access later."
              icon={<Star className="h-5 w-5" />}
            />

            <HowToCard
              number="02"
              title="Set Up Notifications"
              description="Click the 'Notifications' button and enable browser notifications to get reminders before contests start."
              icon={<Bell className="h-5 w-5" />}
            />

            <HowToCard
              number="03"
              title="Add to Calendar"
              description="Use the 'Add to Calendar' button on any contest to add it to Google Calendar or download an .ics file."
              icon={<Calendar className="h-5 w-5" />}
            />

            <HowToCard
              number="04"
              title="Find Solutions"
              description="For past contests, use the 'Find Solution on YouTube' button to search for editorial videos."
              icon={<Youtube className="h-5 w-5" />}
            />

            <HowToCard
              number="05"
              title="Add Your Own Solutions"
              description="Click 'Add YouTube Solution' to add your own solution links to past contests."
              icon={<ExternalLink className="h-5 w-5" />}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Supported Platforms</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <PlatformCard name="Codeforces" color="#1890FF" />
            <PlatformCard name="LeetCode" color="#FFA116" />
            <PlatformCard name="AtCoder" color="#6E56CF" />
            <PlatformCard name="CodeChef" color="#5CB85C" />
          </div>
        </section>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to track your contests?</h2>
        <Link href="/" passHref>
          <Button size="lg" className="mt-2">
            Go to Contest Tracker
          </Button>
        </Link>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function HowToCard({
  number,
  title,
  description,
  icon,
}: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

function PlatformCard({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="p-4 rounded-lg border flex items-center justify-center h-24 font-medium text-lg"
      style={{ borderColor: color, color }}
    >
      {name}
    </div>
  )
}

