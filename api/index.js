import axios from 'axios'

const service = axios.create({
  baseUrl: 'http:localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use((config) => {
  return config;
}, (error) => Promise.reject(error))

export default service