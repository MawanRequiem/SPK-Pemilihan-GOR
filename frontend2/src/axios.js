import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true // ⬅️ penting untuk cookie!
})

export default api
