import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(({ router }) => {
  router.beforeEach((to, from) => {
    const authToken = LocalStorage.getItem('authToken')

    if (!authToken && !['/auth', '/auth',].includes(to.fullPath)) {
      return { path: '/auth' }
    }
  })
})
