import { useState } from "react";
import classes from './Login.module.css'
import Button from '../../UI/Button/Button.jsx'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../../../services/authService.js";

export default function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState("")

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      await AuthService.login(formData.email, formData.password);
      navigate("/profile")
    } catch (e) {
      console.error("Error occured: ", e.message)
      setErrorMessage(e.message)
    }
  }

  return (
    <div className={`${classes.container}`}>
      <img src="imgs/pexels-pixabay-159711.jpg" className={`${classes["bg-img"]}`} alt="" />
      <div className={`${classes["form-container"]}`}>

        <form className={`${classes["form"]}`} onSubmit={handleSubmit}>
          <img src="icons/skillway_logo.png" style={{width: '3rem', height: '3rem'}} alt="" />
          <div className={`${classes.welcome}`}>
            <h1 className={`${classes.title}`}>Log in</h1>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>

          <div className={`${classes.line}`}/>

          <input type="text"
            placeholder="Email or username"
            value={formData.email}
            name="email"
            onChange={handleChange}
            required 
          />
          <input type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required 
          />
          <Button className={classes.btn}>Login</Button>
          {errorMessage && <p className={classes["error-message"]}>{ errorMessage }</p>}
        </form>
      </div>
    </div>
  )
}