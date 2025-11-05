/**
 * Dashboard Page - Main interface for course generation
 * ChatGPT-style interface with sidebar
 */

import { useState, FormEvent, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCourse } from '../context/CourseContext'
import { BookOpen, LogOut, Plus, Trash2, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { courses, currentCourse, generateCourse, saveCourse, fetchCourses, deleteCourse, loading } = useCourse()
  const [topic, setTopic] = useState('')
  const [error, setError] = useState('')
  const [generatedOutline, setGeneratedOutline] = useState<any>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    setError('')
    setGeneratedOutline(null)

    try {
      const outline = await generateCourse(topic)
      setGeneratedOutline(outline)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    }
  }

  const handleSave = async () => {
    if (!generatedOutline) return

    try {
      const saved = await saveCourse(generatedOutline)
      setGeneratedOutline(null)
      setTopic('')
      navigate(`/course/${saved.id}/module/0/lesson/0`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  const handleDelete = async (courseId: string) => {
    if (confirm('Delete this course?')) {
      try {
        await deleteCourse(courseId)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Delete failed')
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-primary-600" />
            <span className="font-bold text-lg">Text2Learn</span>
          </div>
          <div className="text-sm text-gray-600">
            {user?.name}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Your Courses</h3>
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer mb-1"
              onClick={() => navigate(`/course/${course.id}/module/0/lesson/0`)}
            >
              <span className="text-sm truncate flex-1">{course.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(course.id)
                }}
                className="p-1 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <button onClick={logout} className="btn-secondary w-full flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-8">
          {!generatedOutline ? (
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">What do you want to learn today?</h1>
                <p className="text-gray-600">Enter any topic and I'll generate a complete course for you</p>
              </div>

              <form onSubmit={handleGenerate} className="card">
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="E.g., React Hooks, Machine Learning Basics, Spanish for Beginners..."
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 outline-none"
                  disabled={loading}
                />
                {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || !topic.trim()}
                  className="btn-primary mt-4 w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Generate Course
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="card">
                <h2 className="text-3xl font-bold mb-2">{generatedOutline.title}</h2>
                <p className="text-gray-600 mb-6">{generatedOutline.description}</p>

                <div className="space-y-4">
                  {generatedOutline.modules?.map((module: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        Module {idx + 1}: {module.title}
                      </h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {module.lessons?.map((lesson: string, lessonIdx: number) => (
                          <li key={lessonIdx}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <button onClick={handleSave} className="btn-primary flex-1">
                    Save & Start Learning
                  </button>
                  <button onClick={() => setGeneratedOutline(null)} className="btn-secondary">
                    Generate New
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
