import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
