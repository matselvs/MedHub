import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from '@/pages/login/index'
import Home from '@/pages/home/home'
import Spinner from '@/components/Spinner'

export default function AppRouter() {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                onLogin={function (email: string, password: string): void {
                  throw new Error('Function not implemented.')
                }}
              />
            }
          />
          <Route path="/home" element={<Home />} />
          {}
        </Routes>
      </Router>
    </Suspense>
  )
}
