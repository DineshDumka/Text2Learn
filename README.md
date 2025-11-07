# 🎓 Text2Learn - AI-Powered Course Generator

> Transform any topic into a complete, interactive online course using AI

## 📋 Overview

Text2Learn is a production-grade web application that uses AI to automatically generate structured courses with modules, lessons, videos, quizzes, and Hinglish narration.

## 🏗️ Project Structure

```
text2learn/
├── client/          # React + Vite + TypeScript frontend
├── server/          # Node.js + Express + TypeScript backend
└── README.md        # This file
```

## 💻 Tech Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Routing:** React Router v6
- **PDF Export:** html2canvas + jsPDF

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT
- **AI Engine:** Google Gemini API
- **Video API:** YouTube Data API v3

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Google Gemini API key
- YouTube Data API key

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd text2learn
```

2. **Setup Backend**
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your credentials
npx prisma generate
npx prisma db push
npm run dev
```

3. **Setup Frontend**
```bash
cd client
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

## 🎯 Features

- ✅ **AI Course Generation** - Generate complete courses from any topic
- ✅ **Structured Lessons** - Rich content with headings, paragraphs, code blocks
- ✅ **YouTube Integration** - Relevant video suggestions for each lesson
- ✅ **Interactive Quizzes** - Auto-generated MCQs with instant feedback
- ✅ **Hinglish Narration** - Text-to-speech in Hinglish
- ✅ **PDF Export** - Download lessons as PDF
- ✅ **User Authentication** - Secure JWT-based auth
- ✅ **Course Management** - Save and revisit courses anytime
- ✅ **Multi-Language Translation** - Translate courses to Hindi, Spanish, French, German
- ✅ **Course Sharing** - Share courses publicly via unique links
- ✅ **Search Functionality** - Quickly find courses in your dashboard
- ✅ **Dark ChatGPT Theme** - Modern, sleek dark interface

## 📚 API Documentation

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Course Generation
- `POST /api/generate/course` - Generate course outline
- `POST /api/generate/lesson` - Generate lesson content

### Course Management
- `GET /api/courses` - Get user's courses (supports `?q=search` query)
- `GET /api/courses/:id` - Get specific course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/share` - Generate public share link
- `POST /api/courses/:id/translate?language=hi` - Translate course to another language
- `GET /api/courses/share/:shareId` - Get publicly shared course (no auth required)

### YouTube
- `GET /api/youtube/search` - Search YouTube videos

### New Features Usage

#### 🌐 Translate a Course
1. Open any saved course
2. Click the "🌍 Translate" button in the header
3. Select your target language (English, Hindi, Spanish, French, German)
4. The entire course will be translated using AI

#### 🔗 Share a Course
1. In your dashboard, hover over a course card
2. Click the share icon
3. Copy the generated public link
4. Share with anyone - no login required to view

#### 🔍 Search Courses
- Use the search bar in the dashboard sidebar
- Search by course title or description
- Results filter in real-time

## 🔐 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/text2learn
JWT_SECRET=your-secret-key
GEMINI_API_KEY=your-gemini-key
YOUTUBE_API_KEY=your-youtube-key
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Deployment

### Backend (Render)
1. Create new Web Service
2. Connect repository
3. Set build command: `cd server && npm install && npx prisma generate`
4. Set start command: `cd server && npm start`
5. Add environment variables

### Frontend (Vercel)
1. Connect repository
2. Set root directory: `client`
3. Framework preset: Vite
4. Add environment variables

## 🛠️ Development

### Run Tests
```bash
# Backend
cd server && npm test

# Frontend
cd client && npm test
```

### Code Quality
```bash
# Linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Production Deployment

Text2Learn is production-ready and can be deployed to professional cloud platforms.

### Quick Deploy

**Backend:** [Render](https://render.com) (Free tier available)  
**Database:** [Neon](https://neon.tech) (Serverless PostgreSQL)  
**Frontend:** [Vercel](https://vercel.com) (Free tier available)

### Deployment Files

- `render.yaml` - Render configuration
- `vercel.json` - Vercel configuration
- `DEPLOYMENT.md` - Complete deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `.github/workflows/deploy.yml` - CI/CD automation

### One-Command Setup

```bash
chmod +x deploy.sh
./deploy.sh
```

### Environment Variables

**Backend (Render):**
```
DATABASE_URL=postgresql://...neon.tech/db?sslmode=require
JWT_SECRET=your-super-secure-secret
GEMINI_API_KEY=AIza...
YOUTUBE_API_KEY=AIza...
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Frontend (Vercel):**
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_CLIENT_URL=https://your-app.vercel.app
```

### Deployment Steps

1. **Database (Neon)** - 5 minutes
   - Create project
   - Copy connection string
   - Add `?sslmode=require`

2. **Backend (Render)** - 10 minutes
   - Connect GitHub repo
   - Set environment variables
   - Deploy!

3. **Frontend (Vercel)** - 5 minutes
   - Import repo
   - Set build directory to `client`
   - Deploy!

📖 **Full guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)  
✅ **Checklist:** See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

### CI/CD

- ✅ Automated builds on push to `main`
- ✅ Type checking and linting
- ✅ Auto-deploy to Render and Vercel
- ✅ GitHub Actions workflow included

### Docker Support

```bash
docker-compose up -d
```

