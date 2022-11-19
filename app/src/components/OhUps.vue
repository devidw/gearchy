<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    a?: string
    b?: string
  }>(),
  {
    a: 'a',
    b: 'b',
  },
)

defineExpose({
  _stories: {
    someO: {
      props: {
        noCaps: false,
        color: 'primary',
        size: 'lg',
      },
      slots: {
        default: 'default slot',
      },
    },
    otherStory: {
      props: {
        color: 'secondary',
        size: 'sm',
        square: true,
      },
      slots: {
        default: 'some text',
      },
    },
  },
})
</script>

<template>
  <q-btn> <slot /> </q-btn>
</template>
