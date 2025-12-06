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

    static getUser(username) {
      
    }
}