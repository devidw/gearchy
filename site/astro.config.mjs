import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import svelte from '@astrojs/svelte'
import UnoCss from 'unocss/astro'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), image(), UnoCss()],
  output: 'server',
  adapter: vercel(),
})
