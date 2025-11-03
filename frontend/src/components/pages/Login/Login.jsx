import { useState } from "react";
import classes from './Login.module.css'
import Button from '../../UI/Button/Button.jsx'
import { Link } from 'react-router-dom'


export default function Login() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8000/api/accounts/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      })

      const tokens = await response.json()
      if (response.ok) {
        localStorage.setItem("access", tokens["access"]);
        localStorage.setItem("refresh", tokens["refresh"]);
        console.log("Logined");
      } else {
        console.error("Error", tokens)
      }

      
    } catch (e) {
      console.error("Error", e)
    }
  }

  return (
    <div className={`${classes.container}`}>
      <img src="imgs/pexels-pixabay-159711.jpg" className={`${classes["bg-img"]}`} alt="" />
      <div className={`${classes["form-container"]}`}>

        <form onSubmit={handleSubmit}>
          <img src="icons/skillway_logo.png" style={{width: '3rem', height: '3rem'}} alt="" />
          <div className={`${classes.welcome}`}>
            <h1 className={`${classes.title}`}>Log in</h1>
            <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          </div>

          <div className={`${classes.line}`}/>

          <input type="text"
            placeholder="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required 
          />
          <input type="password"
            placeholder="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required 
          />
          <Button onClick={handleSubmit}>Login</Button>
        </form>


      </div>
    </div>
  )
}