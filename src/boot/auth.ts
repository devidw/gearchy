import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(({ router }) => {
  router.beforeEach((to) => {
    const authToken = LocalStorage.getItem('authToken')

    if (!authToken && !['/settings', '/settings'].includes(to.fullPath)) {
      return { path: '/settings' }
    }
  })
})
