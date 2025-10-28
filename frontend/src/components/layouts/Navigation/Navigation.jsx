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
            <span className={`${classes.login}`}><a href="">Login</a></span>
            <span className={`${classes["sign-up"]}`}><a href="">Sign up</a></span>
          </li>
        </ul>
      </nav>
    </header>
  )
}