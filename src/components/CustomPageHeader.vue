<template>
  <div text="gray" class="flex justify-between mb-8">
    <div class="font-(bold [heading]) text-(3xl) tracking-wide">
      <slot name="title" />
    </div>
    <div class="space-x-1">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
