import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { useGitHubStore } from 'stores/github'

export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    const { accessToken } = useGitHubStore()

    if (!accessToken && !['/quickstart', '/settings'].includes(to.fullPath)) {
      // Only warn when we are not comming from the root page
      if (from.fullPath !== '/') {
        Notify.create({
          message: 'Set your token to be able to access this page',
          type: 'negative',
          timeout: 2000,
        })
      }

      return {
        path: ['/quickstart', '/settings'].includes(from.fullPath)
          ? from.fullPath
          : '/quickstart',
      }
    }

    // Once token set quickstart is not accessible anymore
    if (accessToken && to.fullPath === '/quickstart') {
      return { path: '/settings' }
    }
  })
})
