<template>
  <q-page padding class="flex justify-center items-center">
    <div class="space-y-6 text-(center)">
      <div class="g-heading">Mhm, looks pretty empty here, huh?</div>
      <div class="lt-md:space-y-1 md:space-x-2 text-(xs sky)">
        <q-btn flat rounded no-caps to="/" label="Go home" />
        <span class="text-(gray) lt-md:block">or</span>
        <q-btn
          flat
          rounded
          no-caps
          :href="searchUrl"
          target="_blank"
          label="Search gist.github.com"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'

const { login } = storeToRefs(useGistStore())

const searchUrl = computed(() => {
  return `https://gist.github.com/search?q=filename%3A.goggle${
    login.value ? `+user%3A${login.value}` : ''
  }`
})
</script>
