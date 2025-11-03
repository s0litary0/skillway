import { Link } from 'react-router-dom'
import Registration from '../../pages/Registration/Registration'
import Login from '../../pages/Login/Login'

import classes from './Navigation.module.css'


export default function Navigation() {
  return (
    <header className={`${classes.container}`}>
      <nav className={`${classes["nav-bar"]} text`}>
        <ul className={`${classes["nav-list"]}`}>
          <a href="">
            <li className={`${classes.item}`}>
              <img className={classes.logo} src="icons/skillway_logo.png" alt="Logo" />
              <span>Skill Way</span>
            </li>
          </a>
          <li className={`${classes.item}`}>
            <span className={`${classes.login}`}><Link to="/login">Login</Link></span>
            <span className={`${classes["sign-up"]}`}><Link to="/register">Sign up</Link></span>
          </li>
        </ul>
      </nav>
    </header>
  )
}