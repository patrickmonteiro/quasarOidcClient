# quasarOidcClient

Project Quasar Framework with oidc-client library

- Operating System Windows_NT(10.0.17134) - win32/x54
- [node](https://nodejs.org/en/) 8.9.3
- npm 5.5.1
- [quasar-cli](https://quasar-framework.org/guide/quasar-cli.html) 0.17.9
- [vue-cli](https://cli.vuejs.org/) 2.9.6


## Documentation
Oidc-Client:  https://github.com/IdentityModel/oidc-client-js/wiki

## Build Setup
``` bash
# install dependencies
npm install

```

##QUASAR.CONF
Set up routes for development and production
```javascript
build: {
      env: ctx.dev
        ? {
          OIDC_AUTHORITY: JSON.stringify('http://UrlProviderLocal/sso'),
          OIDC_CLIENTID: JSON.stringify('B5689B4A-C101-4FAC-B698-883D74F0566B'),
          OIDC_REDIRECT_URI: JSON.stringify('http://localhost:8080/#/callback#'),
          OIDC_RESPONSE_TYPE: JSON.stringify('id_token token'),
          OIDC_SCOPE: JSON.stringify('openid profile'),
          OIDC_SILENT_REDIRECT_URI: JSON.stringify('/silent-renew.html'),
          REDIRECT_CALLBACK: JSON.stringify('/'),
          API: JSON.stringify('http://localhost:9090/api/v1/'),
        }
        : {
          OIDC_AUTHORITY: JSON.stringify('http://UrlProviderProduction/sso'),
          OIDC_CLIENTID: JSON.stringify('19EF137E-54B7-4290-8691-4AD16BB32877'),
          OIDC_REDIRECT_URI: JSON.stringify('http://productionaddress/ssa/#/callback#'),
          OIDC_RESPONSE_TYPE: JSON.stringify('id_token token'),
          OIDC_SCOPE: JSON.stringify('openid profile'),
          OIDC_SILENT_REDIRECT_URI: JSON.stringify('/silent-renew.html'),
          REDIRECT_CALLBACK: JSON.stringify('/quasarOidcClient/'),
          API: JSON.stringify('http://production/api/v1/'),
        },
...
```
