<template>
  <div p="y2" class="transition" text="stone-3">
    <div
      class="min-h-20 px-7 py-4 rounded-4 flex items-center cursor-pointer tracking-wide font-heading"
      bg="stone-8"
      text="xl"
      font="bold"
      @click="$router.push(`/goggle/${id}`)"
    >
      <q-icon
        :name="public ? 'eva-eye-outline' : 'eva-eye-off-outline'"
        class="mr-3 opacity-50"
      />
      {{ description || '…' }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(['id', 'description', 'public'])
</script>
