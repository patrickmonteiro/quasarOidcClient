<template>
    <q-page>
      <div class="fixed-center text-center">
        <p>
          <q-icon name="person" size="8em" color="grey-5" />
        </p>
        <p class="text-faded">Estamos preparando sua sessão.</p>
        <p class="text-faded"><strong>Aguarde enquanto configuramos suas informações...</strong></p>
      </div>
    </q-page>
</template>

<script>
import Oidc from 'oidc-client'

export default {
  mounted () {
    var mgr = new Oidc.UserManager({userStore: new Oidc.WebStorageStateStore()})
    // let self = this
    mgr.getUser().then(function (user) {
      // window.location.href = '../index.html'
      // self.$router.push('/')
      console.log('SILENT RENEW', user)
    }).catch(function (err) {
      console.log(err)
    })
    // mgr.signinSilent().then(function (user) {
    //   console.log('Renewed', user)
    //   self.token_renew_tries = 0
    // }).catch(function (err) {
    //   console.log(err)
    //   self.awaiting_token = false
    //   self.handleSilentTimeout()
    // })
  }
}
</script>
