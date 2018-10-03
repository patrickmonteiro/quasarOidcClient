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
    mgr.signinRedirectCallback().then(function (user) {
      window.location.href = process.env.REDIRECT_CALLBACK
      // self.$router.push('/')
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>
