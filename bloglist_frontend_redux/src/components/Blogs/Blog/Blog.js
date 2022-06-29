import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div>
      <Link to={`/blogs/${blog.id}`}>
        <div className="p-6 rounded-md bg-slate-800 text-gray-100">
          {blog.title} {blog.author}{' '}
        </div>
      </Link>
    </div>
  )
}

export default Blog
