import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: import.meta.env.VITE_BASE_URL, // Ensure this environment variable is correctly set
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // "Access-Control-Allow-Origin": "*"
    // "Access-Control-Allow-Headers": "Content-Type, Authorization"
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      // config.headers['Credentials'] = true;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
