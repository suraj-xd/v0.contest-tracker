# V0.Contest Tracker

A modern, feature-rich contest tracking application for competitive programmers, built in response to [Priyansh Agarwal's (TLE Eliminators) weekend project challenge](https://www.linkedin.com/posts/priyansh-agarwal_here-is-a-mini-project-you-can-make-over-activity-7306362529453064192-m-Ce/).

🚀 **Live Demo**: [https://tle-contest-tracker-v0.vercel.app/](https://tle-contest-tracker-v0.vercel.app/)

## 🎯 Project Origin

This project was inspired by a job description posted by Priyansh Agarwal from TLE Eliminators, challenging developers to build a comprehensive contest tracker over a weekend. The original JD outlined specific requirements for fetching contests from multiple platforms, implementing filters, bookmarks, and notification systems.

**Development Approach**: Built using AI-assisted development with v0.dev and Claude, demonstrating rapid prototyping capabilities while maintaining code quality and modern development practices.

## ✨ Features

### Core Requirements (JD Implementation)
- ✅ **Multi-Platform Contest Fetching**: Displays upcoming contests from Codeforces, CodeChef, LeetCode, and AtCoder
- ✅ **Time Management**: Shows contest dates and countdown timers for upcoming events
- ✅ **Historical Data**: Displays past contests from the last week
- ✅ **Platform Filtering**: Filter contests by one or multiple platforms
- ✅ **Contest Bookmarking**: Save favorite contests for quick access
- ✅ **Solution Link Management**: Add YouTube solution links to past contests

### Bonus Features Implemented
- 🔥 **AI-Powered Contest Analysis**: LLM-generated contest summaries and insights
- ⚡ **Cmd+K Navigation**: Instant search and navigation with keyboard shortcuts
- 📅 **Calendar Integration**: One-click Google Calendar sync for contests
- 🔔 **Smart Notifications**: Browser notifications with customizable reminder times
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark/Light Theme**: System-aware theme switching
- 📊 **Calendar View**: Visual calendar layout for contest planning
- 🎯 **Auto Solution Finder**: Intelligent YouTube solution link discovery

### Advanced UI/UX Features
- **Instant Search**: Real-time contest filtering
- **Platform Icons**: Visual platform identification
- **Contest Cards**: Rich information display with countdown timers
- **Bookmark Management**: Visual bookmark indicators and filtering
- **Export Functionality**: Calendar event generation
- **Loading States**: Smooth loading animations and skeleton screens

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and concurrent rendering
- **TypeScript** - Type-safe development

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Theme management

### Data & State Management
- **Google Calendar API** - Contest data source
- **Local Storage** - Client-side data persistence
- **React Hooks** - State management and side effects

### Development Tools
- **v0.dev** - AI-powered component generation
- **Claude (Sonnet)** - AI development assistance
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🏗️ Architecture

### Data Flow
```
Google Calendar API → Contest Service → React Components → Local Storage
```

### Key Components
- **Contest Service**: Fetches and parses contest data from Google Calendar API
- **Storage Service**: Manages bookmarks, settings, and solution links
- **Notification Service**: Handles browser notifications and reminders
- **Platform Service**: Manages platform-specific styling and icons

### Component Structure
```
app/
├── page.tsx              # Main application component
├── search.tsx            # Command palette (Cmd+K)
└── layout.tsx            # App layout and providers

components/
├── contest-card.tsx      # Individual contest display
├── contest-list.tsx      # Contest grid/list views
├── calendar-view.tsx     # Calendar layout
├── notification-*.tsx    # Notification system
└── ui/                   # Reusable UI components
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd contest-tracker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
pnpm build
pnpm start
```

## 📱 Usage

### Basic Navigation
- **Search**: Use the search bar or press `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- **Filter**: Select platforms using the filter buttons
- **Bookmark**: Click the star icon on any contest card
- **View Modes**: Switch between list and calendar views

### Notifications
1. Click the notification bell icon
2. Allow browser notifications when prompted
3. Select contests and reminder timing
4. Notifications will appear before contest start times

### Calendar Integration
- Click "Add to Calendar" on any upcoming contest
- Automatically generates Google Calendar events with reminders

## 🎨 Design Philosophy

### User Experience
- **Minimal Cognitive Load**: Clean, intuitive interface
- **Information Hierarchy**: Important details prominently displayed
- **Responsive Design**: Consistent experience across devices
- **Accessibility**: ARIA labels and keyboard navigation

### Performance
- **Optimized Rendering**: React 19 concurrent features
- **Efficient Data Fetching**: Cached API responses
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Tree-shaking and code splitting

## 🔮 Future Enhancements

### Planned Features
- [ ] **Email Notifications**: SMTP integration for email reminders
- [ ] **Contest Analytics**: Performance tracking and statistics
- [ ] **Team Management**: Shared bookmarks and team calendars
- [ ] **Mobile App**: React Native companion app
- [ ] **API Integration**: Direct platform APIs for real-time updates

### Technical Improvements
- [ ] **Service Worker**: Offline functionality and background sync
- [ ] **Database Integration**: Persistent user data and preferences
- [ ] **Authentication**: User accounts and cross-device sync
- [ ] **Real-time Updates**: WebSocket integration for live data

## 🤝 Contributing

This project demonstrates rapid AI-assisted development capabilities. Contributions are welcome for:

- Bug fixes and performance improvements
- New platform integrations
- UI/UX enhancements
- Documentation improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Priyansh Agarwal** and **TLE Eliminators** for the inspiring project challenge
- **v0.dev** for enabling rapid UI development
- **Claude (Anthropic)** for AI development assistance
- **Vercel** for seamless deployment platform
- **Google Calendar API** for contest data source

---

**Note**: This project was built as a demonstration of AI-assisted development capabilities and modern web technologies. It showcases how complex applications can be rapidly prototyped while maintaining code quality and user experience standards.

*Built with ❤️ using AI-powered development tools* # v0.contest-tracker
