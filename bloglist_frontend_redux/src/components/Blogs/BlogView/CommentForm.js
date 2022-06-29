import { useState } from 'react'
import { useDispatch } from 'react-redux'

import blogService from '../../../services/blogs'

import { updateBlog } from '../../../reducers/blogReducer'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.addComment(id, { comment })
    dispatch(updateBlog({ id, newBlog }))
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button>add comment</button>
    </form>
  )
}

export default CommentForm
