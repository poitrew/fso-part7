import { useParams } from 'react-router-dom'

const UserView = ({ users }) => {
  const user = users.find((u) => u.id === useParams().id)

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col my-16">
      <h2 className="text-3xl">{user.name}</h2>
      <p className="font-light my-4">Added blogs</p>
      <ul className="flex flex-col">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="border-b p-2 ">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
