# Polly - Interactive Polling Platform

A modern, responsive polling application built with Next.js 15, TypeScript, and Shadcn UI components.

## 🚀 Features

- **User Authentication**: Login and registration with secure authentication
- **Poll Creation**: Easy-to-use interface for creating custom polls
- **Real-time Voting**: Interactive voting with instant results
- **Dashboard**: Comprehensive dashboard showing poll statistics
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS

## 📁 Project Structure

```
alx-polly/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── (dashboard)/             # Dashboard routes group
│   │   ├── dashboard/           # Main dashboard
│   │   ├── polls/               # Polls listing and detail
│   │   │   └── [id]/           # Individual poll page
│   │   └── create-poll/         # Poll creation page
│   ├── api/                     # API routes
│   │   ├── auth/               # Authentication endpoints
│   │   ├── polls/              # Poll management endpoints
│   │   └── votes/              # Voting endpoints
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # React components
│   ├── ui/                     # Shadcn UI components
│   ├── auth/                   # Authentication components
│   ├── polls/                  # Poll-related components
│   └── layout/                 # Layout components
├── lib/                        # Utilities and configurations
│   ├── auth/                   # Authentication utilities
│   ├── db/                     # Database utilities
│   └── utils.ts                # General utilities
├── types/                      # TypeScript type definitions
│   └── index.ts                # Shared types
└── components.json             # Shadcn UI configuration
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Icons**: Lucide React (via Shadcn)
- **Fonts**: Geist Sans & Geist Mono

## 📋 TODO: Implementation Checklist

### Authentication
- [ ] Choose and integrate authentication provider (NextAuth.js, Clerk, Auth0, etc.)
- [ ] Implement login/logout functionality
- [ ] Add session management
- [ ] Set up protected routes

### Database
- [ ] Choose database (PostgreSQL, MongoDB, etc.)
- [ ] Set up database schema
- [ ] Implement user management
- [ ] Add poll and vote models
- [ ] Set up migrations

### Core Features
- [ ] Complete poll creation functionality
- [ ] Implement voting system
- [ ] Add real-time updates (WebSockets/Server-Sent Events)
- [ ] Build poll analytics and statistics
- [ ] Add poll sharing capabilities

### Additional Features
- [ ] Email notifications
- [ ] Poll templates
- [ ] Export functionality (CSV, PDF)
- [ ] Advanced poll types (ranked choice, multiple selection)
- [ ] User profiles and settings
- [ ] Poll comments and discussions

### Deployment
- [ ] Set up environment variables
- [ ] Configure production database
- [ ] Deploy to Vercel/Netlify/other platform
- [ ] Set up monitoring and analytics

## 🚦 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🎨 Components Overview

### Authentication Components
- `LoginForm` - User login form with validation
- `RegisterForm` - User registration form with validation

### Poll Components
- `CreatePollForm` - Poll creation interface
- `PollDetail` - Individual poll view with voting
- `PollsList` - Grid/list view of all polls
- `DashboardStats` - Statistics cards for dashboard
- `RecentPolls` - Recent polls component

### Layout Components
- `DashboardHeader` - Navigation header for authenticated users

## 🔧 Customization

### Adding New Components
Use Shadcn CLI to add more components:
```bash
npx shadcn@latest add [component-name]
```

### Styling
- Global styles: `app/globals.css`
- Component styles: Use Tailwind CSS classes
- Custom utilities: `lib/utils.ts`

## 📝 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your_database_url"

# Authentication
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"

# Additional environment variables as needed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
