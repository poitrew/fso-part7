// HOOKS
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import Blog from './Blog/Blog'
import BlogForm from './BlogForm/BlogForm'
import Togglable from '../Togglable'

// SERVICES
import blogService from '../../services/blogs'

// ACTION CREATORS
import { appendBlog } from '../../reducers/blogReducer'
import { setMessage, clearMessage } from '../../reducers/notificationReducer'

const Blogs = () => {
  const toggleRef = useRef()
  const dispatch = useDispatch()
  const { blogs, user } = useSelector((state) => state)
  const renderBlogs = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => <Blog key={blog.id} blog={blog} />)

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      dispatch(appendBlog(savedBlog))
      dispatch(
        setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
      )
      setTimeout(() => dispatch(clearMessage()), 5000)
      toggleRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user !== null && (
        <>
          <h2 className="text-center text-3xl my-8 font-bold">Blogs</h2>
          <div className="border-b border-slate-300 pb-4">
            <Togglable buttonLabel="Create" ref={toggleRef}>
              <BlogForm create={addBlog} />
            </Togglable>
          </div>
          <div className="flex flex-col gap-8 mt-12">{renderBlogs}</div>
        </>
      )}
    </>
  )
}

export default Blogs
