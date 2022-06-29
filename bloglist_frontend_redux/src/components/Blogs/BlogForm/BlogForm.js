import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../../../services/blogs'

import { appendBlog } from '../../../reducers/blogReducer'
import { setMessage, clearMessage } from '../../../reducers/notificationReducer'

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const dispatch = useDispatch()

  const handleChange = (event) => {
    setNewBlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog)
      dispatch(appendBlog(savedBlog))
      dispatch(
        setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
      )
      setTimeout(() => dispatch(clearMessage()), 5000)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <label>
          title
          <input
            id="blog-title"
            type="text"
            name="title"
            // eslint-disable-next-line quotes
            placeholder={"blog's title"}
            value={newBlog.title}
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <label>
          author
          <input
            id="blog-author"
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <label>
          url
          <input
            id="blog-url"
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleChange}
          ></input>
        </label>
        <br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm
