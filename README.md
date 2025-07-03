# Panbo Daily

A full-stack team task tracker and accountability platform built with Next.js, blending features from Asana and BeReal with AI-powered capabilities for automated newsletter generation.

## 🌟 Project Origin

Since I was now focusing on Panbo full-time I needed to upgrade my application development skills. Particularly in full-stack development. Previously all of my applications were created using Firebase which was client-side rendered and had no backend (all of my api keys were public... I know crazy right!). I also wanted to reduce my reliance on Google who's tools got very expensive. Anyways I decided to learn Next.js to finally upgrade my skills so I could consider myself a real software engineer and also make our applications more efficient and resilient.

So I developed a custom full-stack team task tracker, blending features from Asana and BeReal, with AI-powered capabilities. Each Panbo co-founder updates their account daily, sharing their plans for the day, reflecting on their mindset, and listing the tasks they aim to complete. Throughout the day, they update their progress by marking tasks as 'completed.' At the end of each week, content from all team members is analyzed by an LLM, generating concise summaries for newsletters, weekly team meetings, and archiving for future reference. The theory is building in public and keeping the world up to date with Panbo activity.

Since its completion on August 1, 2024 we have used Panbo Daily every week meaning 400+ reflections and 1700+ tasks completed.

## 🚀 Features

### Core Features
- **Daily Cadence**: Team members reflect and plan ahead with their daily objectives and tasks
- **Build in Public**: Contribute to public discourse and maintain transparency for trust
- **Progress Tracking**: Watch language, ideas, and feelings evolve over time as the team responds and adapts to circumstances
- **Task Management**: Create, update, and mark tasks as completed throughout the day
- **Visual Journaling**: Upload photos with daily posts for visual context
- **Individual Profiles**: Dedicated pages for each team member showing their journey

### AI-Powered Automation
- **Newsletter Generation**: LLM analysis of weekly content creates concise summaries
- **Meeting Summaries**: Automated generation of content for weekly team meetings
- **Archive System**: Content archiving for future reference and historical tracking

### Technical Features
- **Full-Stack Architecture**: Server-side rendering with proper backend functionality
- **Secure Authentication**: Protected API routes and user sessions
- **Image Upload**: Integrated photo sharing with UploadThing
- **Responsive Design**: Mobile-friendly interface with modern UI components
- **Database Relations**: Proper relational database design with PostgreSQL

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: JavaScript/TypeScript
- **Styling**: TailwindCSS with Shadcn/ui components
- **Authentication**: NextAuth.js with credential-based login
- **Database**: PostgreSQL with Prisma ORM
- **File Upload**: UploadThing for image handling
- **Validation**: Zod for form validation
- **Deployment**: Netlify

## 🏗️ Database Schema

The application uses a PostgreSQL database with three main models:

- **Author**: Team members with profiles and authentication
- **Post**: Daily reflections and updates with optional photos
- **Task**: Individual tasks linked to posts with progress tracking

## 📁 Project Structure

```
src/
├── app/
│   ├── actions/          # Server actions for posts, tasks, and weekly summaries
│   ├── api/              # API routes including UploadThing configuration
│   ├── author/           # Individual author profile pages
│   ├── about/            # About page explaining the project
│   └── layout.tsx        # Root layout with navigation
├── components/           # Reusable UI components
├── db/                   # Database configuration and example data
├── lib/                  # Utility functions and authentication setup
└── prisma/              # Database schema and migrations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- UploadThing account for image uploads

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd panbo-daily
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Configure the following variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `UPLOADTHING_SECRET` - UploadThing secret key
- `UPLOADTHING_APP_ID` - UploadThing app ID

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📝 Usage

1. **Daily Check-ins**: Team members log in each day to create posts with their plans and reflections
2. **Task Creation**: Add tasks to daily posts and update their status throughout the day
3. **Progress Tracking**: Mark tasks as completed and view progress over time
4. **Photo Sharing**: Upload photos to provide visual context to daily updates
5. **Weekly Reviews**: Use the AI-powered weekly summary feature for newsletter content

## 🏢 About Panbo

Panbo Daily serves as the primary accountability tool for Panbo co-founders, helping track the journey of building our organization. Started in Philadelphia on August 9, 2024, this tool embodies our commitment to transparency and continuous improvement.

## 📊 Stats

- **Launch Date**: August 1, 2024
- **Active Since**: August 9, 2024
- **Total Reflections**: 400+
- **Total Tasks Completed**: 1700+
- **Team Members**: Ethan, Melissa, Turner

## 🤝 Contributing

This is an internal tool for Panbo, but the code serves as a learning resource for full-stack Next.js development with modern best practices.

## 📄 License

This project is proprietary to Panbo. All rights reserved.

---

Built with ❤️ by the Panbo team in Philadelphia