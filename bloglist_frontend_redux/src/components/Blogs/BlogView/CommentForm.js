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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type something..."
        className="p-2 rounded-sm"
      />
      <button className="py-2 bg-blue-400 rounded-sm">Comment</button>
    </form>
  )
}

export default CommentForm
