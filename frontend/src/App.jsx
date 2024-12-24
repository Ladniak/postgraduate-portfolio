import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import NotFound from './pages/NotFound/NotFound'
import Layout from './components/Layout/Layout'
import { Suspense } from 'react'
import UserPage from './pages/UserPage/UserPage'
import PostPage from './pages/PostPage/PostPage'

function App() {

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
