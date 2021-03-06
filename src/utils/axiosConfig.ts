import axios from 'axios'

axios.interceptors.request.use(
  config => {
    const token = (() => window.localStorage.getItem('token'))()
    return Object.assign({}, config, { headers: { Authorization: token } })
  },
  error => Promise.reject(error)
)

export default axios
