import { boot } from 'quasar/wrappers'
import hljs from 'highlight.js/lib/core'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github-dark-dimmed.css'
import goggles from 'highlightjs-goggles'

hljs.registerLanguage('goggle', goggles)

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.use(hljsVuePlugin)
})
