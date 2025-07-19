import axios from "axios"

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
})
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  console.log("Attaching token:", token) // optional log
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => Promise.reject(error))


export default instance
