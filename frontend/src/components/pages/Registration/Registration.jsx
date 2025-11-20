import classes from "./Registration.module.css"
import { useState } from "react";
import Button from '../../UI/Button/Button.jsx'
import { Link, useNavigate } from "react-router-dom";


export default function Registration() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',    
    password2: '',    
  })

  let handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting")

    if (formData.password !== formData.password2) {
      console.error("passwords doesn't match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/accounts/register/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2
        })
      })

      if (response.status === 201) {
        console.log("Registered")
        navigate("/dashboard", {replace: true})
      } else {
        const data = await response.json();
        console.log(data);
      }

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={`${classes["grid-container"]}`}>
      <form className={`${classes["form-container"]}`}>
        
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
          <Button onClick={handleSubmit} className={classes.btn}>Register</Button>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </form>

      <img className={`${classes.img}`} src="imgs/pexels-olly-3762800.jpg" alt="student"/>

    </div>
  )
}