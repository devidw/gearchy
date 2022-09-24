<script lang="ts">
  import { Goggle } from 'goggledy'
  import hljs from 'highlight.js/lib/core'
  import hljsGoggles from 'highlightjs-goggles'
  import 'highlight.js/styles/github-dark-dimmed.css'

  hljs.registerLanguage('goggles', hljsGoggles)

  let goggle = `! name: Goggle
! description: This is a goggle
! public: true

open-source$boost=3,inurl`
  let parsed: Goggle | undefined
  let jsonStringfied: string | undefined
  let highlighted: string | undefined
  let error: Error | undefined

  $: {
    highlighted = hljs.highlight('goggles', goggle).value
    try {
      parsed = Goggle.parse(goggle)
      jsonStringfied = JSON.stringify(parsed.lines, null, 2)
      error = undefined
    } catch (e) {
      parsed = undefined
      jsonStringfied = undefined
      error = e as Error
    }
  }
</script>

<main class="h-screen grid grid-cols-2">
  <div class="left">
    {#if error}
      <pre class="bg-red">{error.message}</pre>
    {:else if parsed}
      <pre class="bg-green">{jsonStringfied}</pre>
    {/if}
  </div>

  <div class="right font-mono text-gray-3 relative">
    <textarea
      class="bg-transparent text-transparent caret-white block resize-none
    outline-none z-0"
      spellcheck="false"
      bind:value={goggle}
    />
    {#if highlighted}
      <pre class="-z-1"><code>{@html highlighted}</code></pre>
    {/if}
  </div>
</main>

<style lang="stylus">
  .left pre
    @apply h-screen p-5 text-dark break-all whitespace-pre-wrap overflow-y-auto

  .right > *
    @apply p-5 absolute top-0 left-0 w-full h-full
</style>
