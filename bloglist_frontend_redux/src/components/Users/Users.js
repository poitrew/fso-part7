import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <h2 className="text-center text-3xl my-8 font-bold">Users</h2>
      <div>
        <div className="text-right font-light">Blogs created</div>
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="flex justify-between text-lg">
              <div className="font-bold">{user.name}</div>
              <div className="font-semibold">{user.blogs.length}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Users
