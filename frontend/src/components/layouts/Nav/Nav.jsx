import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
import { useAuth } from "../../../hooks";

export default function Nav() {
  const { user, logoutUser } = useAuth();

  return (
    <div className={`${classes.container}`}>
      <nav className={`${classes["nav-bar"]} text`}>
        <ul className={`${classes["nav-list"]} header-link`}>
          <li className={`${classes.item}`}>
            <Link className={classes["logo-container"]} to="/dashboard">
              <img
                className={classes.logo}
                src="icons/skillway_logo.png"
                alt="Logo"
              />
              <span className={`${classes.title}`}>Skill Way</span>
            </Link>
          </li>
          <li className={`${classes.menu}`}>
            <span><Link to="/courses">Courses</Link></span>
            <span><Link to="/dashboard">Dashboard</Link></span>
            <span><Link to="/leaderboards">Leaderboards</Link></span>
            <span><Link to="/achievements">Achievements</Link></span>
            <span><Link to="/groups">Groups</Link></span>
            <span><Link to="/about">About</Link></span> 
          </li>
          <li className={`${classes.profile}`}>
            {!user ? (
              <>
                <span className={`${classes.login}`}>
                  <Link to="/login">Login</Link>
                </span>
                <span className={`${classes["sign-up"]}`}>
                  <Link to="/register">Sign up</Link>
                </span>
              </>
            ) : (
              <>
                <span className={`${classes["user"]}`}>
                  <Link to="/profile" className={`${classes["username"]}`}>
                    <img
                      src=""
                      alt="img"
                      className={`${classes["user-img"]}`}
                    />
                    <span>{user.username}</span>
                  </Link>
                </span>
                <span onClick={logoutUser} className={`${classes["logout"]}`}>
                  Logout
                </span>
              </>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
