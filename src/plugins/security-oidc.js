import Oidc from 'oidc-client'
import { Dialog } from 'quasar'

let env = process.env
const mgr = new Oidc.UserManager({
  userStore: new Oidc.WebStorageStateStore({
    // prefix: 'oidc',
    store: window.localStorage
  }),
  authority: env.OIDC_AUTHORITY,
  client_id: env.OIDC_CLIENTID,
  redirect_uri: env.OIDC_REDIRECT_URI,
  response_type: 'id_token token',
  scope: env.OIDC_SCOPE, // 'openid profile',
  // post_logout_redirect_uri: 'http://w3as-serv-03/ssa',
  silent_redirect_uri: window.location.origin + env.OIDC_SILENT_REDIREC_URI,
  accessTokenExpiringNotificationTime: 2,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  clockSkew: 900,
  silentRequestTimeout: 2
})

Oidc.Log.logger = console
Oidc.Log.level = Oidc.Log.INFO

mgr.events.addUserLoaded(function (user) {
  console.log('New User Loaded：', arguments)
  console.log('Acess_token: ', user.access_token)
})

mgr.events.addAccessTokenExpiring(function () {
  console.log('AccessToken Expiring：', arguments)
})

mgr.events.addAccessTokenExpired(function () {
  console.log('AccessToken Expired：', arguments)
  // alert('Session expired. Going out!')
  Dialog.create({
    title: 'Session expired',
    message: 'Redirection to authenticate.',
    preventClose: true
  }).then(() => {
    mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp)
    }).catch(function (err) {
      console.log(err)
    })
  }).catch(function (err) {
    console.log(err)
  })
})

mgr.events.addSilentRenewError(function () {
  console.error('Silent Renew Error：', arguments)
})

mgr.events.addUserSignedOut(function () {
  mgr.removeUser().then(function (resp) {
    mgr.clearStaleState()
      .then(() => {
        mgr.signinRedirect()
      })
  })
})

export default class SecurityService {
  constructor () {
    console.log('Construtor')
  }

  getUser () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(null)
        } else {
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
  getSignedIn () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(true)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
  signIn () {
    mgr.signinRedirect().catch(function (err) {
      console.log(err)
    })
  }
  signOut () {
    // var self = this
    mgr.signoutRedirect().then(function (resp) {
      console.log('signed out', resp)
    }).catch(function (err) {
      console.log(err)
    })
  }

  getToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getProfile () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.profile)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getIdToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.id_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getSessionState () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.session_state)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getAcessToken () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.access_token)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getScopes () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.scopes)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }

  getRole () {
    let self = this
    return new Promise((resolve, reject) => {
      mgr.getUser().then(function (user) {
        if (user == null) {
          self.signIn()
          return resolve(false)
        } else {
          return resolve(user.profile.role)
        }
      }).catch(function (err) {
        console.log(err)
        return reject(err)
      })
    })
  }
}
