import { useAuth, useLocalStorage } from "../../../hooks"
import Spinner from "../../UI/Spinner/Spinner"


export default function Profile() {
  const { user, profile, stats } = useAuth()
  console.log(user)
  return (
    <div>
      <ul>
        <li>{user}</li>
        <li>{profile}</li>
        <li>{stats}</li>
      </ul>
      <Spinner />
    </div>
  )
}