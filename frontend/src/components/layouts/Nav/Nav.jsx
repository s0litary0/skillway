import { Link } from 'react-router-dom'
import classes from './Nav.module.css'


export default function Nav() {
  return (
    <div className={`${classes.container}`}>
      <nav className={`${classes["nav-bar"]} text`}>
        <ul className={`${classes["nav-list"]} header-link`}>
            <li className={`${classes.item}`}>
              <Link className={classes["logo-container"]}to="/dashboard">
                <img className={classes.logo} src="icons/skillway_logo.png" alt="Logo" />
                <span className={`${classes.title}`}>Skill Way</span>
              </Link>
            </li>
            <li className={`${classes.menu}`}>
              <Link>Courses</Link>
              <Link>Dashboard</Link>
              <Link>Leaderboards</Link>
              <Link>Achievements</Link>
              <Link>Groups</Link>
              <Link>About</Link>
            </li>
            <li className={`${classes.profile}`}>
              
              <span className={`${classes.login}`}><Link to="/login">Login</Link></span>
              <span className={`${classes["sign-up"]}`}><Link to="/register">Sign up</Link></span>
            </li>
        </ul>
      </nav>
    </div>
  )
}