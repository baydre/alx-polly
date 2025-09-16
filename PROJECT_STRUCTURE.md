# Polly - Interactive Polling Platform

A modern, responsive polling application built with Next.js 15, TypeScript, Prisma, and Shadcn UI components with QR code sharing capabilities.

## 🚀 Features

- **User Authentication**: Secure login and registration with NextAuth.js
- **Poll Creation & Management**: Easy-to-use interface for creating, editing, and deleting polls
- **Anonymous & Authenticated Voting**: Support for both registered users and anonymous voting
- **QR Code Sharing**: Generate QR codes for easy poll sharing
- **Real-time Results**: Interactive voting with instant results and statistics
- **Public Poll Access**: Share polls via unique URLs accessible to anyone
- **Dashboard**: Comprehensive dashboard showing poll statistics and management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Shadcn UI components and Tailwind CSS

## 📁 Project Structure

```
alx-polly/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes group
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── dashboard/           # Main dashboard
│   │   ├── create-poll/         # Poll creation page
│   │   └── polls/               # Dashboard poll management
│   │       └── [id]/
│   │           └── edit/        # Poll editing page
│   ├── polls/                   # Public poll routes
│   │   └── [id]/               # Public poll viewing and voting
│   ├── api/                     # API routes
│   │   ├── auth/               # NextAuth authentication endpoints
│   │   ├── polls/              # Poll CRUD endpoints
│   │   │   └── [id]/
│   │   │       ├── edit/       # Poll update endpoint
│   │   │       └── stats/      # Poll statistics endpoint
│   │   └── votes/              # Voting endpoints (supports anonymous)
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Landing page
├── components/                  # React components
│   ├── ui/                     # Shadcn UI components
│   ├── auth/                   # Authentication components
│   │   ├── login-form.tsx      # Login form
│   │   └── register-form.tsx   # Registration form
│   ├── polls/                  # Poll-related components
│   │   ├── create-poll-form.tsx # Poll creation form
│   │   ├── poll-detail.tsx     # Poll viewing and voting (with QR codes)
│   │   ├── poll-actions.tsx    # Poll edit/delete actions
│   │   ├── polls-list.tsx      # Poll listing component
│   │   └── recent-polls.tsx    # Recent polls widget
│   └── layout/                 # Layout components
│       └── dashboard-header.tsx # Dashboard navigation
├── lib/                        # Utilities and configurations
│   ├── auth/                   # NextAuth configuration
│   │   └── config.ts          # Auth provider settings
│   ├── data/                   # Data access layer
│   │   └── database-store.ts   # Database operations
│   ├── database.ts             # Prisma client configuration
│   └── utils.ts                # General utilities
├── prisma/                     # Database schema and migrations
│   ├── schema.prisma           # Database schema definition
│   ├── migrations/             # Database migrations
│   └── seed.ts                 # Database seeding script
├── types/                      # TypeScript type definitions
│   └── index.ts                # Shared types
├── middleware.ts               # Route protection middleware
└── components.json             # Shadcn UI configuration
```

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM with SQLite (configurable)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **QR Codes**: react-qr-code
- **Icons**: Lucide React (via Shadcn)
- **Fonts**: Geist Sans & Geist Mono

## ✅ Implemented Features

### Authentication
- ✅ NextAuth.js integration with credentials provider
- ✅ User registration and login
- ✅ Session management
- ✅ Protected routes with middleware
- ✅ User profile in session

### Database
- ✅ Prisma ORM with SQLite database
- ✅ User, Poll, PollOption, and Vote models
- ✅ Database migrations and seeding
- ✅ Foreign key relationships
- ✅ Anonymous voting support (no user constraint)

### Core Poll Features
- ✅ Poll creation with multiple options
- ✅ Poll editing (owner only)
- ✅ Poll deletion (owner only)
- ✅ Poll listing and filtering
- ✅ Poll statistics and analytics
- ✅ Vote counting and percentage calculation

### Voting System
- ✅ Authenticated user voting
- ✅ Anonymous user voting via public URLs
- ✅ Duplicate vote prevention
- ✅ Real-time vote count updates
- ✅ User-friendly error handling

### Sharing & Access
- ✅ Public poll URLs for anonymous access
- ✅ QR code generation for poll sharing
- ✅ Shareable links display
- ✅ Mobile-friendly QR code scanning

### UI/UX
- ✅ Responsive design for all screen sizes
- ✅ Modern Shadcn UI components
- ✅ Dashboard with statistics
- ✅ Error handling with user feedback
- ✅ Loading states and form validation

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database
npx prisma db seed
```

## 🚦 Getting Started

1. **Clone and install:**
   ```bash
   git clone [repository-url]
   cd alx-polly
   npm install
   ```

2. **Set up the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma database browser
- `npx prisma migrate dev` - Run database migrations

## 🎯 User Flows

### Poll Creator Flow
1. Register/Login → Dashboard
2. Create Poll → Add options → Save
3. Share poll via QR code or URL
4. Monitor results in real-time
5. Edit/Delete polls as needed

### Voter Flow (Anonymous)
1. Scan QR code or click shared link
2. View poll question and options
3. Select option and vote
4. See live results immediately

### Voter Flow (Authenticated)
1. Login → Browse polls
2. Vote on polls
3. View voting history
4. Create own polls

## 🔒 Security Features

- **Route Protection**: Middleware protects dashboard routes
- **Ownership Verification**: Users can only edit/delete their polls
- **Duplicate Vote Prevention**: IP + User Agent hashing for anonymous users
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **CSRF Protection**: NextAuth.js built-in protection

## 🎨 Component Architecture

### Reusable UI Components
- Form components with validation
- Card layouts for polls and stats
- Button variants and states
- Alert messages for user feedback

### Feature Components
- **PollDetail**: Handles voting, QR codes, and results display
- **CreatePollForm**: Multi-option poll creation with validation
- **PollActions**: Edit/delete dropdown for poll owners
- **DashboardStats**: Real-time statistics cards

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **QR Code Scanning**: Mobile-friendly QR code generation
- **Touch Interactions**: Proper touch targets for mobile voting
- **Responsive Layouts**: Flexbox and grid layouts adapt to screen size

## 🔄 Future Enhancements

- [ ] Real-time updates with WebSockets
- [ ] Poll templates and categories
- [ ] Advanced poll types (ranked choice, multiple selection)
- [ ] Email notifications for poll updates
- [ ] Export functionality (CSV, PDF)
- [ ] Poll scheduling and expiration
- [ ] User avatars and profiles
- [ ] Poll comments and discussions
- [ ] Analytics dashboard
- [ ] Social media integration

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
