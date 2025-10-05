import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import QuestionPage from './pages/QuestionPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import Admin from './pages/Admin'
import QuestionsPage from './pages/QuestionsPage'
import About from './pages/About'
import Disclaimer from './pages/Disclaimer'
import { useAppStore } from './store/useAppStore'

/**
 * The main application component defines the client-side routes and invokes
 * initialization when the app mounts. It also watches for auth changes and
 * redirects to login when appropriate. All pages share the same basic
 * layout defined in Home and other pages.
 */
export default function App() {
  const { init, user } = useAppStore((state) => ({ init: state.init, user: state.user }))
  const location = useLocation()

  useEffect(() => {
    init()
  }, [init])

  // If not authenticated and not on login or signup pages, redirect to login
  if (!user && !['/login', '/signup'].includes(location.pathname)) {
    return <Navigate to="/login" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/question/:id" element={<QuestionPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
