import axios from 'axios'

const service = axios.create({
  baseURL: 'https://rickandmortyapi.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use((config) => {
  return config;
}, (error) => Promise.reject(error))

service.interceptors.response.use((response) => {
  return response
})

export default service