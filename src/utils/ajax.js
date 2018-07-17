import axios from 'axios'
import router from '../router'

export default {
  post (url, params, origin) {
    return new Promise ((resolve, reject) => {
      axios.post(url, params)
           .then(res => {
            const result = res.data
            if (!origin && result.status === 0) {
              reject && reject(result.msg)
            }
            if (!origin && result.status === -1) {
              window.localStorage.removeItem('login')
              router.replace({ name: 'login' })
              reject && reject(result.msg)
            }
            resolve && resolve(result)
           })
           .catch(err => {
            reject && reject(err.toString())
           })
    })
  },

  get (url, params, origin) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params })
           .then(res => {
            const result = res.data
            if (!origin && result.status === 0) {
              reject && reject(result.msg)
            }
            if (!origin && result.status === -1) {
              window.localStorage.removeItem('login')
              router.replace({ name: 'login' })
              reject && reject(result.msg)
            }
            resolve && resolve(res.data)
           })
           .catch(err => {
            reject && reject(err.toString())
           })
    })
  },

  auto (url, params, origin) {
    return window.environment === 'production' ? this.post(url, params, origin) : this.get(url, params, origin)
  }
}