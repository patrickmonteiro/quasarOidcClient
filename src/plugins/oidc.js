import 'babel-polyfill'
import Oidc from 'oidc-client'

export default ({ Vue }) => {
  const oidc = new Oidc.UserManager({userStore: new Oidc.WebStorageStateStore()})
  Vue.prototype.$oidc = oidc
}
