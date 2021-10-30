import axios from 'axios'
import interceptors from './interceptors'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

interceptors(instance)

export default instance
