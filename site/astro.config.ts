import { defineConfig } from 'astro/config'
// import image from '@astrojs/image'
import svelte from '@astrojs/svelte'
import UnoCss from 'unocss/astro'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: "https://gearchy.wolf.gdn",
  integrations: [
    svelte(),
    // image(),
    UnoCss(),
    sitemap(),
  ],
})
