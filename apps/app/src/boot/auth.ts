import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { useGitHubStore } from 'stores/github'

export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    const { accessToken } = useGitHubStore()

    if (
      accessToken === '' &&
      !['/quickstart', '/settings'].includes(to.fullPath)
    ) {
      Notify.create({
        message: 'Set your token to be able to access this page',
        type: 'negative',
        timeout: 2000,
      })
      return {
        path: ['/quickstart', '/settings'].includes(from.fullPath)
          ? from.fullPath
          : '/quickstart',
      }
    }

    if (accessToken !== '' && ['/quickstart'].includes(to.fullPath)) {
      return { path: '/settings' }
    }
  })
})
