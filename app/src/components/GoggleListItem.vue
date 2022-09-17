<template>
  <div
    @click="$router.push(`/goggle/${gist.id}`)"
    class="g-box px-7 py-4 min-h-20 cursor-pointer tracking-wide font-(bold [heading]) text-(xl stone-3) transition grid grid-cols-[2.5rem_1fr]"
  >
    <div class="flex items-center">
      <q-icon
        :name="gist.public ? 'eva-eye-outline' : 'eva-eye-off-outline'"
        class="mr-3 opacity-50"
      />
    </div>
    <div class="flex items-center">
      {{ gist.description || 'Untitled' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Gist } from 'src/types'

defineProps<{
  gist: Gist
}>()
</script>
