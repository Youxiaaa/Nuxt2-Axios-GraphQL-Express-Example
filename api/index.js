import axios from 'axios'

const service = axios.create({
  baseURL: 'https://rickandmortyapi.com/',
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use((config) => {
  console.log('送出前攔截測試')
  return config;
}, (error) => Promise.reject(error))

service.interceptors.response.use((response) => {
  console.log('攔截測試')
  return response
})

export default service