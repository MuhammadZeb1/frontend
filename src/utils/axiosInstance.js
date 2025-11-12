// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1212",
  // baseURL: "https://backend-p-ppcl-n7axh8bv2-muhammad-zebs-projects.vercel.app/",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ✅ localStorage سے لو
  console.log("token", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
