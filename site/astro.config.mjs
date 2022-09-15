import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import UnoCss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [image(), UnoCss()],
})
