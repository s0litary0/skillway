import { useAuth } from "../../../hooks";
import Spinner from "../../UI/Spinner/Spinner";
import Block from "../../UI/Block/Block";
import "./Profile.css";
import api from "../../../services/api";
import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils";
import LangSwitch from "../../UI/LangSwitch/LangSwitch";


export default function Profile() {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { user, profile, stats, loading } = useAuth();

  useEffect(() => {
    if (!profile) return;
    if (profile.avatar_base64) {
      setAvatarPreview(profile.avatar_base64);
      console.log("image set");
    }
  }, [profile]);

  if (loading || !user) {
    return <Spinner />;
  }

  const handleFile = async (e) => {
    const f = e.target.files[0];
    if (!f) return;

    setAvatarPreview(URL.createObjectURL(f));

    const base64 = await fileToBase64(f);

    const res = await api.patch("accounts/profile/", {
      avatar_base64: base64,
      user_id: user.id,
    });

    console.log("Avatar updated:", res.data);
  }

  console.log(user, profile, stats);
  return (
    <div className="profile-page">
      <Block className="username-block">
        <label htmlFor="avatarInput">
          {avatarPreview ? <img src={avatarPreview}/> : <img src="icons/add.svg" className="add-avatar" />}
          <input type="file" accept="image/*" onChange={handleFile} id="avatarInput"/>
        </label>
        <h2>{user.username}</h2>
      </Block>
      <Block className="user-info">
        <h2>User info</h2>
        <ul>
          <li>Email: {user.email}</li>
          <li>First name: {user.first_name}</li>
          <li>Last name: {user.last_name}</li>
          <li>Courses in progress: {stats.courses_in_progress}</li>
          <li>Courses completed: {stats.courses_completed}</li>
          <li>Date joined: {new Date(user.date_joined).toDateString()}</li>
        </ul>
      </Block>
      <Block className="achievements-block">
        <h2>Language</h2>
        {/* <p>...in progress</p> */}
        <LangSwitch />
      </Block>
      {/* <Spinner /> */}
    </div>
  );
}
