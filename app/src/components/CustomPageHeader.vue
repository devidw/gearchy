<script setup lang="ts"></script>

<template>
  <div class="flex justify-between mb-8 text-(gray)">
    <div class="g-heading">
      <slot name="title" />
    </div>
    <div class="space-x-1">
      <slot name="actions" />
    </div>
  </div>
</template>
