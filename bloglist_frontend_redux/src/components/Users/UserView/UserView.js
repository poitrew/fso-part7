import { useParams } from 'react-router-dom'

const UserView = ({ users }) => {
  const user = users.find((u) => u.id === useParams().id)

  if (!user) {
    return null
  }

  return (
    <div className="user">
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
