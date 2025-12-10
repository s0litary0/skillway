import classes from "./Registration.module.css"
import { useState } from "react";
import Button from '../../UI/Button/Button.jsx'
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService.js";
export default function Registration() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',    
    password2: '',    
  })
  const [errorMessage, setErrorMessage] = useState("")

  let handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting")

    try {
      await AuthService.register(formData.username, formData.email, formData.password, formData.password2)
      navigate("/profile")
    } catch (e) {
      setErrorMessage(e.message)
      console.error(errorMessage)
    }
  }

  return (
    <div className={`${classes["grid-container"]}`}>
      <form className={`${classes["form-container"]}`} onSubmit={handleSubmit}>
        
        <div className={classes.welcome}>
          <h1 style={{fontSize: '2rem'}}>Welcome to SkillWay</h1>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>

        <label>
          <span>Username</span>
          <input type="text"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required 
          />
        </label>

        <label>
          <span>Email</span>
          <input type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required 
          />
        </label>

        <label>
          <span>Password</span>
          <input type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required 
          />
        </label>

        <label>
          <span>Confirm your password</span>
          <input type="password"
            value={formData.password2}
            name="password2"
            onChange={handleChange}
            required 
          />
        </label>

        <div className={classes["btn-container"]}>
          <p>By creating an account. you agree to the <a>Terms of use</a> and <a>Privacy Policy.</a></p>
          <Button className={classes.btn}>Register</Button>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
        {errorMessage && <p className={classes["error-message"]}>{ errorMessage }</p>}
      </form>

      <img className={`${classes.img}`} src="imgs/pexels-olly-3762800.jpg" alt="student"/>

    </div>
  )
}