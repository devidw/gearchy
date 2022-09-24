import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import svelte from '@astrojs/svelte'
import UnoCss from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), image(), UnoCss()],
})
