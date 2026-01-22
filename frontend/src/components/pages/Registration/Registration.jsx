import classes from "./Registration.module.css";
import { useState } from "react";
import Button from '../../UI/Button/Button.jsx';
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService.js";
import { useTranslation } from "react-i18next";

export default function Registration() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errorMessage, setErrorMessage] = useState("");

  let handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(formData.username, formData.email, formData.password, formData.password2);
    } catch (e) {
      setErrorMessage(e.message);
      console.error(errorMessage);
    }
    navigate("/profile");
  };

  return (
    <div className={`${classes["grid-container"]}`}>
      <form className={`${classes["form-container"]}`} onSubmit={handleSubmit}>
        <div className={classes.welcome}>
          <h1 style={{ fontSize: '2rem' }}>{t("welcome_to_skillway")}</h1>
          <p>
            {t("already_have_account")} <Link to="/login">{t("login")}</Link>
          </p>
        </div>

        <label>
          <span>{t("username")}</span>
          <input type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>{t("email")}</span>
          <input type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>{t("password")}</span>
          <input type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <span>{t("confirm_password")}</span>
          <input type="password"
            value={formData.password2}
            name="password2"
            onChange={handleChange}
            required
          />
        </label>

        <div className={classes["btn-container"]}>
          <p>
            {t("agree_terms")} <a>{t("terms_of_use")}</a> {t("and")} <a>{t("privacy_policy")}</a>.
          </p>
          <Button className={classes.btn}>{t("register")}</Button>
          <p>
            {t("already_have_account")} <Link to="/login">{t("login")}</Link>
          </p>
        </div>
        {errorMessage && <p className={classes["error-message"]}>{errorMessage}</p>}
      </form>

      <img className={`${classes.img}`} src="imgs/pexels-olly-3762800.jpg" alt="student" />
    </div>
  );
}
