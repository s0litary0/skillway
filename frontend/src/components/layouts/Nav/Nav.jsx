import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
import { useAuth } from "../../../hooks";
import { useTranslation } from "react-i18next";
import Theme from "../../UI/Theme/Theme"


export default function Nav() {
  const { user, profile, logoutUser } = useAuth();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className={`${classes.container}`}>
      <nav className={`${classes["nav-bar"]} text`}>
        <ul className={`${classes["nav-list"]} header-link`}>
          <li className={`${classes.item}`}>
            <Link className={classes["logo-container"]} to="/">
              <img
                className={classes.logo}
                src="icons/skillway_logo.png"
                alt={t("logo_alt")}
              />
              <span className={`${classes.title}`}>{t("skillway")}</span>
            </Link>
          </li>
          <li className={`${classes.menu}`}>
            <span>
              <Link to="/courses">{t("courses")}</Link>
            </span>
            <span>
              <Link to="/dashboard">{t("dashboard")}</Link>
            </span>
            <span>
              <Link to="/leaderboards">{t("leaderboards")}</Link>
            </span>
            <span>
              <Link to="/achievements">{t("achievements")}</Link>
            </span>
            <span>
              <Link to="/groups">{t("groups")}</Link>
            </span>
            <span>
              <Link to="/about">{t("about")}</Link>
            </span>
          </li>
          <li className={`${classes.profile}`}>
            {!user ? (
              <>
                {/* Language dropdown */}
                <select
                  className={classes.langSelect}
                  value={i18n.language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">EN</option>
                  <option value="ru">RU</option>
                </select>
                <span className={`${classes.login}`}>
                  <Link to="/login">{t("login")}</Link>
                </span>
                <span className={`${classes["sign-up"]}`}>
                  <Link to="/register">{t("sign_up")}</Link>
                </span>
                <Theme />
              </>
            ) : (
              <>
                <span className={`${classes["user"]}`}>
                  <Link to="/profile" className={`${classes["username"]}`}>
                    <img
                      src={profile.avatar_base64}
                      alt={t("user_avatar_alt")}
                      className={`${classes["user-img"]}`}
                    />
                    <span>{user.username}</span>
                  </Link>
                </span>

                {/* Language dropdown */}
                <select
                  className={classes.langSelect}
                  value={i18n.language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">EN</option>
                  <option value="ru">RU</option>
                </select>
                <Theme />

                <span onClick={logoutUser} className={`${classes["logout"]}`}>
                  {t("logout")}
                </span>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
