import {
  defineConfig,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    'g-heading': 'font-(bold [heading]) text-(3xl gray) tracking-wide',
    'g-box': 'bg-stone-8 rounded-4',
  },
})
