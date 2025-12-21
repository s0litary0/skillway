import api from "./api"
import { jwtDecode } from "jwt-decode"


export default class AuthService {
    static async login(email, password) {
        const response = await fetch("http://localhost:8000/api/accounts/token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: email,
              password: password
            })
          })
    
          const tokens = await response.json()
          if (response.ok) {
            localStorage.setItem("access", tokens["access"]);
            localStorage.setItem("refresh", tokens["refresh"]);
            console.log("Logined");
    
          } else {
            throw Error(tokens.detail);
          }
    
    }

    static logout() {
        localStorage.setItem("access", "");
        localStorage.setItem("refresh", "");
    }

    static async register(username, email, password, confirmPassword) {
        const response = await fetch("http://localhost:8000/api/accounts/register/", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
              password2: confirmPassword,
            })
          })
    
        if (response.status === 201) {
            console.log("Registered")
        } else {
            const data = await response.json();
            console.log(data);
            throw Error(data);
        }
    }

    static checkUserState() {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getitem("refresh");
      if (access && refresh) {
        return true;
      }
      return false;
    }

    static async loginApi(data) {
      const response = await api.post("accounts/token/", data);
      return response.data; // contains access & refresh tokens
    }

    static async registerApi(data) {
      const response = await api.post("accounts/register/", data);
      return response.data;
    }

    static async refreshToken(refresh) {
      console.log("refreshing token")
      const response = await fetch("http://127.0.0.1:8000/api/accounts/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      });
      return response.data.access;
    }

    static async getMeApi(token) {
      console.log("decoding")
      const decoded = jwtDecode(token)
      const response = await fetch("http://127.0.0.1:8000/api/accounts/users/" + decoded.user_id)
      return response
    }
    static async getUser(userId) {
      const response = await api.get(`accounts/users/${userId}`)
      console.log("User", response.data)
      return response.data
    }
}