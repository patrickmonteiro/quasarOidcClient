
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/oidc'),
    children: [
      { path: '/callback', component: () => import('pages/oidc/callback') },
      { path: '/accessdenied', component: () => import('pages/oidc/accessDenied') },
      { path: '/silentRenew', component: () => import('pages/oidc/silentRenew') }
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
