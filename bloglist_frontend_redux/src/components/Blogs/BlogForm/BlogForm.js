import { useState } from 'react'

const BlogForm = ({ create }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChange = (event) => {
    setNewBlog((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const addBlog = (event) => {
    event.preventDefault()
    create(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <>
      <h2 className="text-center my-2 text-lg font-light">Create new</h2>
      <form
        onSubmit={addBlog}
        className="flex flex-col gap-4 my-8 items-center"
      >
        <input
          id="blog-title"
          type="text"
          name="title"
          placeholder="Blog's title"
          value={newBlog.title}
          onChange={handleChange}
          className="w-full p-2 rounded-sm"
        ></input>
        <input
          id="blog-author"
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleChange}
          placeholder="Author's name"
          className="w-full p-2 rounded-sm"
        ></input>
        <input
          id="blog-url"
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleChange}
          placeholder="Blog's name"
          className="w-full p-2 rounded-sm"
        ></input>
        <button
          type="submit"
          className="p-2 border border-slate-800 rounded-md font-bold w-24"
        >
          Create
        </button>
      </form>
    </>
  )
}

export default BlogForm
