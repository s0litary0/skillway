import { useState } from "react";
import classes from './Login.module.css'
import Button from '../../UI/Button/Button.jsx'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {

  const navigate = useNavigate();

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
        navigate("/dashboard", {replace: true})

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
            placeholder="Email or username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required 
          />
          {/* <span>
            <svg className={classes["hide-icon"]} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            Hide
          </span> */}
          <input type="password"
            placeholder="Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required 
          />
          <Button className={classes.btn} onClick={handleSubmit}>Login</Button>
        </form>


      </div>
    </div>
  )
}