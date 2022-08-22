import { defineConfig } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'

export default defineConfig({
  presets: [presetUno(), presetAttributify({})],
  transformers: [transformerDirective()],
})
