import { useAuth, useLocalStorage } from "../../../hooks"
import Spinner from "../../UI/Spinner/Spinner"
import Block from "../../UI/Block/Block"
import "./Profile.css"


export default function Profile() {
  const { user, profile, stats, loading } = useAuth()
  console.log(user)

  if (loading || !user) {
    return <Spinner />
  }
  console.log(user, profile, stats)
  return (
    <div className="profile-page">
      <Block className="username-block">
        <img src="" alt="profile-img" />
        <h2>{user.username}</h2>
      </Block>
      <Block className="user-info">
        <h2>User info</h2>
        <ul>
          <li>Email: {user.email}</li>
          <li>First name: {user.first_name}</li>
          <li>Last name: {user.last_name}</li>
          <li>Date joined: { new Date(user.date_joined).toDateString()}</li>
        </ul>
      </Block>
      <Block className="achievements-block">
        <h2>Achievements</h2>
        <p>...in progress</p>
      </Block>
      {/* <Spinner /> */}
    </div>
  )
}