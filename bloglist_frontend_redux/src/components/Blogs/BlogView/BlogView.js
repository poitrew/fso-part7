import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import CommentForm from './CommentForm'

import { updateBlog, removeBlog } from '../../../reducers/blogReducer'

import blogService from '../../../services/blogs'

const BlogView = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id

  const blog = blogs.find((blog) => blog.id === id)

  if (!blog) {
    return null
  }

  console.log(blog)

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
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="blogView">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={updateLikes}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>comments</h3>
      <CommentForm id={blog.id} />
      <ul>
        {blog.comments.map((cmt, index) => (
          <li key={index}>{cmt}</li>
        ))}
      </ul>
      <button onClick={deleteBlog}>remove</button>
    </div>
  )
}

export default BlogView
