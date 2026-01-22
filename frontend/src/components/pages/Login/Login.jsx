import { useState } from "react";
import classes from './Login.module.css';
import Button from '../../UI/Button/Button.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../hooks";
import Spinner from "../../UI/Spinner/Spinner.jsx";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const { loginUser, loading, error } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await loginUser(formData.email, formData.password);
    navigate("/profile");
  }

  return (
    <div className={`${classes.container}`}>
      <img src="imgs/pexels-pixabay-159711.jpg" className={`${classes["bg-img"]}`} alt="" />
      <div className={`${classes["form-container"]}`}>

        <form className={`${classes["form"]}`} onSubmit={handleSubmit}>
          <img src="icons/skillway_logo.png" style={{ width: '3rem', height: '3rem' }} alt="" />
          <div className={`${classes.welcome}`}>
            <h1 className={`${classes.title}`}>{t("login")}</h1>
            <p>
              {t("dont_have_account")} <Link to="/register">{t("sign_up")}</Link>
            </p>
          </div>

          <div className={`${classes.line}`} />

          <input
            type="text"
            placeholder={t("email_or_username")}
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder={t("password")}
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
          <Button className={classes.btn}>{t("login")}</Button>
          {error && <p className={classes["error-message"]}>{error}</p>}
          {loading && <Spinner />}
        </form>
      </div>
    </div>
  );
}
