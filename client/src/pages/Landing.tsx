/**
 * Landing Page
 * Marketing page with features and CTA
 */

import { Link } from 'react-router-dom'
import { BookOpen, Zap, Video, Brain, CheckCircle, ArrowRight } from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">Text2Learn</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Transform Any Topic Into a
          <span className="text-primary-600"> Complete Course</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          AI-powered course generation that creates structured lessons, interactive quizzes, 
          and curated video content in seconds.
        </p>
        <Link to="/signup" className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2">
          Start Learning Free
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Text2Learn?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-primary-600" />}
            title="Instant Generation"
            description="Create complete courses in seconds with AI-powered content generation"
          />
          <FeatureCard
            icon={<BookOpen className="w-10 h-10 text-primary-600" />}
            title="Structured Learning"
            description="Organized modules and lessons that build on each other logically"
          />
          <FeatureCard
            icon={<Video className="w-10 h-10 text-primary-600" />}
            title="Video Integration"
            description="Curated YouTube videos for every lesson to enhance understanding"
          />
          <FeatureCard
            icon={<Brain className="w-10 h-10 text-primary-600" />}
            title="Interactive Quizzes"
            description="Test your knowledge with auto-generated MCQs and instant feedback"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 bg-white rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <Step
            number={1}
            title="Enter a Topic"
            description="Type any subject you want to learn - from 'React Hooks' to 'Machine Learning Basics'"
          />
          <Step
            number={2}
            title="AI Generates Course"
            description="Our AI creates a structured course with modules, lessons, videos, and quizzes"
          />
          <Step
            number={3}
            title="Start Learning"
            description="Follow the curriculum, watch videos, complete quizzes, and master the topic"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="card max-w-3xl mx-auto bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn Anything?</h2>
          <p className="text-lg mb-6 text-primary-100">
            Join thousands of learners who are mastering new skills with AI-powered courses
          </p>
          <Link to="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors inline-block">
            Create Your First Course Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 Text2Learn. Built with AI for learners worldwide.</p>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="card text-center hover:shadow-lg transition-shadow">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const Step = ({ number, title, description }: { number: number, title: string, description: string }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default Landing
