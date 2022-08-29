import { defineConfig } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import { promises as fs } from 'fs'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        g: {
          logo: () => fs.readFile('./src/assets/logo.svg', 'utf-8'),
        },
      },
    }),
  ],
  transformers: [transformerDirective(), transformerVariantGroup()],
})
