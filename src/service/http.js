import axios from 'axios'
import Mgr from 'plugins/security-oidc'

const $axios = axios.create({
  baseURL: `${process.env.API}`
})

$axios.interceptors.request.use(function (config) {
  let user = new Mgr()
  return user.getUser()
    .then((res) => {
      config.headers.Authorization = `Bearer ${res.id_token}`
      return config
    }, (err) => {
      console.log(err)
    })
}, function (error) {
  return Promise.reject(error)
})

export default $axios
