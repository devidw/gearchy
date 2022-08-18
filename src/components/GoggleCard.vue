<template>
  <div
    class="g-card mb-5 px-7 py-4 rounded-4 flex justify-between min-h-12"
    bg="stone-800"
  >
    <div class="g-card__meta w-2/3">
      <div
        class="tracking-wide mb-1 font-heading"
        text="xl stone-300"
        font="bold"
      >
        {{ files[0].name }}
      </div>
      <div v-if="description" text="stone-400">
        {{ description }}
      </div>
    </div>
    <div class="g-card__actions transition-all flex items-center space-x-1">
      <q-btn
        round
        flat
        icon="eva-edit-outline"
        class="color-gray"
        :to="`/goggle/${name}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['name', 'description', 'files'])
</script>

<style lang="sass">
.g-card:not(:hover)
  .g-card__actions
    @apply md:hidden
</style>
