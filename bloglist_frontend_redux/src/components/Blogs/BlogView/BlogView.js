import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import CommentForm from './CommentForm'

import { updateBlog, removeBlog } from '../../../reducers/blogReducer'

import blogService from '../../../services/blogs'

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  const updateLikes = async () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }
    try {
      const newBlog = await blogService.update(blog.id, likedBlog)
      dispatch(updateBlog({ id: blog.id, newBlog }))
    } catch (error) {
      console.log(error)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        dispatch(removeBlog({ id: blog.id }))
        navigate('/blogs')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="flex flex-col my-8 gap-4">
      <h2 className="text-lg font-bold">{blog.title}</h2>
      <a className="underline" href={blog.url}>
        {blog.url}
      </a>
      <div>
        <span className="font-semibold">{blog.likes}</span> likes
        <button
          className="ml-4 px-2 bg-slate-800 text-gray-100 rounded"
          onClick={updateLikes}
        >
          Like
        </button>
      </div>
      <p>
        added by <span className="font-semibold">{blog.user.name}</span>
      </p>
      <div className="border-y border-slate-800 flex flex-col gap-4 py-4">
        <p className="font-semibold">Comments</p>
        <CommentForm id={blog.id} />
        <ul className="ml-4">
          {blog.comments.map((cmt, index) => (
            <li key={index} className="border-b py-2">
              {cmt}
            </li>
          ))}
        </ul>
      </div>
      <button
        className="rounded bg-red-400 py-2 font-bold"
        onClick={deleteBlog}
      >
        Remove
      </button>
    </div>
  )
}

export default BlogView
