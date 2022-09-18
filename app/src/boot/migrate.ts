import { boot } from 'quasar/wrappers'
import { useStorage } from '@vueuse/core'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  const version = useStorage('version', process.env.VERSION)

  if (version.value === process.env.VERSION) {
    return
  }

  // function migrateFromTo(from: string, to: string, fn: () => void) {
  //   if (version.value === from) {
  //     fn()
  //     version.value = to
  //   }
  // }

  // migrateFromTo('0.1.0', 'x.x.x', () => {
  //   localStorage.removeItem('old-key')
  // })
})
