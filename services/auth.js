import axios from 'axios'
import Cookies from 'js-cookie'

const authService = {}
const tokenKey = 'token'

const api = axios.create({
  baseURL: 'https://reqres.in/api',
})

authService.login = (data) => {
  return api
    .post('/login', data)
    .then((res) => res.data)
    .catch((err) => {
      throw err
    })
}

authService.getToken = () => {
  return Cookies.get(tokenKey)
}

authService.setToken = (token) => {
  return Cookies.set(tokenKey, token)
}

authService.removeToken = () => {
  return Cookies.remove(tokenKey)
}

export default authService
