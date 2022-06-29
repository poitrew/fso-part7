import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  return (
    <div className="px-2 bg-green-300">
      <p>{message}</p>
    </div>
  )
}

export default Notification
