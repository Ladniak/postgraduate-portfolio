import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import NotFound from './pages/NotFound/NotFound'
import Layout from './components/Layout/Layout'
import UserPage from './pages/UserPage/UserPage'
import PostPage from './pages/PostPage/PostPage'
import AddPostPage from './pages/AddPostPage/AddPostPage'

import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAuthMe } from './redux/users/operations'
import { Route, Routes } from 'react-router-dom'
import EditPostPage from './pages/EditPostPage/EditPostPage'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user-page" element={<UserPage />} />
          <Route path="/new-post" element={<AddPostPage />} />
          <Route path="/my-posts" element={<AddPostPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
