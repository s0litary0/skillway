import axios from "axios";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", 
  headers: {
    "Content-Type": "application/json",
  },
});


export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Authorization header set:", api.defaults.headers.common.Authorization);
  } else {
    delete api.defaults.headers.common["Authorization"];
    console.log("Authorization header removed");
  }
};

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refresh");

    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      // Call refresh endpoint
      const { data } = await api.post("accounts/token/refresh/", {
        refresh: refreshToken,
      });

      // Save new access token
      localStorage.setItem("access", data.access);
      setAuthToken(data.access);

      // Retry original request with new token
      originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
