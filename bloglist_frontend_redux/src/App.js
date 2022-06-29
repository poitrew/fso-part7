// HOOKS
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

// ROUTERS
import { Routes, Route } from 'react-router-dom'

// SERVICES
import userService from './services/users'
import blogService from './services/blogs'

// COMPONENTS
import Blogs from './components/Blogs/Blogs'
import BlogView from './components/Blogs/BlogView/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users/Users'
import UserView from './components/Users/UserView/UserView'

import { setBlogs } from './reducers/blogReducer'

const App = () => {
  const { blogs } = useSelector((state) => state)
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    userService.getAll().then((data) => setUsers(data))
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  // ----------------------- EVENT HANDLERS ------------------------

  return (
    <div className="bg-gray-100 h-screen text-slate-800 p-4">
      <div>
        <Notification />
        <LoginForm />
      </div>
      <div className="max-w-6xl py-8 mx-auto">
        <Routes>
          <Route path="/users/:id" element={<UserView users={users} />} />
          <Route path="/blogs/:id" element={<BlogView blogs={blogs} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/" element={<Blogs />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
