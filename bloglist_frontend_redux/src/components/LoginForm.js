import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Nav from './Nav/Nav'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { setUser } from '../reducers/userReducer'
import { setMessage, clearMessage } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const loggedIn = user === null ? false : true

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(credentials)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (error) {
      dispatch(setMessage('Wrong username or password'))
      setTimeout(() => dispatch(clearMessage()), 5000)
    }
    setCredentials({
      username: '',
      password: '',
    })
  }

  const handleChange = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const render = loggedIn ? (
    <Nav />
  ) : (
    <>
      <h2 className="text-2xl mb-8">Login to blogs app</h2>
      <form
        onSubmit={handleLogin}
        className="flex flex-col w-4/5 mx-auto gap-4 items-center"
      >
        <input
          id="username"
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          className="p-2 rounded-md w-full"
        ></input>
        <input
          id="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="p-2 rounded-md w-full"
        ></input>
        <button
          type="submit"
          className="bg-slate-800 w-24 p-2 rounded-md text-gray-100"
        >
          Login
        </button>
      </form>
    </>
  )

  return render
}

export default LoginForm
