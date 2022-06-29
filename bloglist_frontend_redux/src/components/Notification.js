import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification)

  return (
    <div className="noti">
      <p>{message}</p>
    </div>
  )
}

export default Notification
