import axios from 'axios'

axios.interceptors.request.use(
  config => {
    const token = (() => window.localStorage.getItem('token'))()
    return Object.assign({}, config, { headers: { Authorization: token } })
  },
  error => {
    if (error.response.message === 'Network Error') Promise.reject(error.response)
    else {
      Promise.reject(error.response.data.data)
    }
  }
)

export default axios
