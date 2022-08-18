<template>
  <div
    class="g-card min-h-20 mb-5 px-7 py-4 rounded-4 flex justify-between min-h-12"
    bg="stone-800"
  >
    <div class="g-card__meta flex items-center w-2/3">
      <div
        class="tracking-wide mb-1 font-heading"
        text="xl stone-300"
        font="bold"
      >
        {{ description || '…' }}
      </div>
    </div>
    <div class="g-card__actions flex items-center transition-all space-x-1">
      <q-btn
        round
        flat
        icon="eva-edit-outline"
        class="color-gray"
        :to="`/goggle/${id}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['id', 'description'])
</script>

<style lang="sass">
.g-card:not(:hover)
  .g-card__actions
    @apply md:hidden
</style>
