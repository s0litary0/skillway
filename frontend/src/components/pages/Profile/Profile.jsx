import { useAuth } from "../../../hooks";
import Spinner from "../../UI/Spinner/Spinner";
import Block from "../../UI/Block/Block";
import "./Profile.css";
import api from "../../../services/api";
import { useState, useEffect } from "react";
import { fileToBase64 } from "../../../utils";
import LangSwitch from "../../UI/LangSwitch/LangSwitch";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
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

  return (
    <div className="profile-page">
      <Block className="username-block">
        <label htmlFor="avatarInput">
          {avatarPreview ? (
            <img src={avatarPreview} />
          ) : (
            <img src="icons/add.svg" className="add-avatar" />
          )}
          <input type="file" accept="image/*" onChange={handleFile} id="avatarInput"/>
        </label>
        <h2>{user.username}</h2>
      </Block>

      <Block className="user-info">
        <h2>{t("user_info")}</h2>
        <ul>
          <li>{t("email")}: {user.email}</li>
          <li>{t("first_name")}: {user.first_name}</li>
          <li>{t("last_name")}: {user.last_name}</li>
          <li>{t("courses_in_progress")}: {stats.courses_in_progress}</li>
          <li>{t("courses_completed")}: {stats.courses_completed}</li>
          <li>{t("date_joined")}: {new Date(user.date_joined).toDateString()}</li>
        </ul>
      </Block>

      <Block className="achievements-block">
        <h2>{t("language")}</h2>
        <LangSwitch />
      </Block>
    </div>
  );
}
