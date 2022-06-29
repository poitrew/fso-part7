import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearUser } from '../../reducers/userReducer'

const Nav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <nav className="flex justify-between">
      <ul className="flex gap-4 underline">
        <li>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="users">Users</Link>
        </li>
      </ul>
      <div className="flex gap-4">
        <p className="font-semibold">{user.name}</p>
        <button
          onClick={handleLogout}
          className="border-solid border-slate-800 border px-2 rounded-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Nav
