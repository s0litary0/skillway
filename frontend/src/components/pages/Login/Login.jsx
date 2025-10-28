import { useState } from "react";


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
    <form onSubmit={handleSubmit}>
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
      <button onClick={handleSubmit}>Login</button>
    </form>
  )
}