import { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginForm from '@/pages/login/index'
import Home from '@/pages/home/home'
import UsersPage from '@/pages/userspage/userspage'
import Planspage from '@/pages/planspage/planspage'
import Spinner from '@/components/Spinner'
import Especialitiespage from '@/pages/especialities/especialitiespage'
import Notificationspage from '@/pages/notifications/notificationspage'
import Faqpage from '@/pages/faq/faq'
import EditUserpage from '@/pages/edituser/edituserpage'

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
          <Route path="/userspage" element={<UsersPage />} />
          <Route path="/planspage" element={<Planspage />} />
          <Route path="/especialitiespage" element={<Especialitiespage />} />
          <Route path="/notificationspage" element={<Notificationspage />} />
          <Route path="/faqpage" element={<Faqpage />} />
          <Route path="/editUserpage" element={<EditUserpage />} />
        </Routes>
      </Router>
    </Suspense>
  )
}
