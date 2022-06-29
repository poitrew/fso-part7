// HOOKS
import { useSelector } from 'react-redux'

// COMPONENTS
import Blog from './Blog/Blog'
import BlogForm from './BlogForm/BlogForm'
import Togglable from '../Togglable'

const Blogs = () => {
  const { blogs, user } = useSelector((state) => state)
  const renderBlogs = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => <Blog key={blog.id} blog={blog} />)

  return (
    <>
      {user !== null && (
        <>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <div className="blogs">{renderBlogs}</div>
        </>
      )}
    </>
  )
}

export default Blogs
