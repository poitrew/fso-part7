import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { clearUser } from '../../reducers/userReducer'

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    dispatch(clearUser())
  }

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="/blogs">blogs</Link>
        </li>
        <li>
          <Link to="users">users</Link>
        </li>
      </ul>
      <div>
        {`${user.name} logged in`}
        <button onClick={handleLogout}>log out</button>
      </div>
    </div>
  )
}

export default Nav
