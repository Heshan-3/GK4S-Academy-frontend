import axios from "axios";

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:3000").replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

export default AxiosInstance;