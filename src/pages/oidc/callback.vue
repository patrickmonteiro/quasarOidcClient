<template>
    <q-page>
      <div class="fixed-center text-center">
        <p>
          <q-icon name="person" size="8em" color="grey-5" />
        </p>
        <p class="text-faded">We're preparing your session.<p>
        <p class="text-faded"><strong>Please wait while we set up your information...</strong></p>
      </div>
    </q-page>
</template>

<script>
// import Oidc from 'oidc-client'

export default {
  mounted () {
    var mgr = this.$oidc
    mgr.signinRedirectCallback().then(function (user) {
      window.location.href = process.env.REDIRECT_CALLBACK
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>
