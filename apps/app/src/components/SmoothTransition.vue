<template>
  <Transition
    enter-active-class="transition-(all duration-300)"
    leave-active-class="transition-(all)"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>

<script lang="ts"></script>
