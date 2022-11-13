<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import type { GoggleMetaData } from 'goggledy'

const props = defineProps<{
  modelValue: GoggleMetaData
}>()
const emit = defineEmits(['update:modelValue'])

const metaData = useVModel(props, 'modelValue', emit)
</script>

<template>
  <div class="g-box p-5 h-full overflow-y-scroll">
    <q-input
      v-model="metaData.name"
      type="text"
      placeholder="Name"
      borderless
      class="w-full"
      input-class="!pt-0 !leading-snug tracking-wider !text-(3xl stone-3) font-(extrabold [heading])"
    >
      <template #prepend>
        <q-icon
          class="cursor-pointer !mb-3"
          :name="metaData.public ? 'eva-eye-outline' : 'eva-eye-off-outline'"
          @click="() => (metaData.public = !metaData.public)"
        >
          <q-tooltip anchor="center left" self="center end">
            Click to make {{ metaData.public ? 'private' : 'public' }}
          </q-tooltip>
        </q-icon>
      </template>
    </q-input>
    <div class="ml-9">
      <q-input
        v-model="metaData.description"
        type="text"
        placeholder="Description"
        borderless
        input-class="leading-snug !pt-0 !text-stone-4"
      />
      <q-input
        v-model="metaData.author"
        type="text"
        placeholder="Author"
        borderless
        prefix="by"
        class="sm:-mt-10"
        input-class="!text-stone-4"
      />

      <div class="space-y-2 mt-6">
        <q-input
          v-model="metaData.avatar"
          label="Avatar"
          borderless
          class="-ml-8.5"
        >
          <template #prepend>
            <q-icon name="eva-color-picker-outline" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color v-model="metaData.avatar" flat />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="metaData.homepage"
          type="text"
          label="Homepage"
          borderless
        />
        <q-input
          v-model="metaData.issues"
          type="text"
          label="Issues"
          borderless
        />
        <q-input
          v-model="metaData.license"
          type="text"
          label="License"
          borderless
        />
        <q-input
          v-model="metaData.transferred_to"
          type="text"
          label="Transferred to"
          borderless
        />
      </div>
    </div>
  </div>
</template>
