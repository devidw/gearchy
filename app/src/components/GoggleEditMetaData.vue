<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'

const { goggle } = storeToRefs(useGoggleStore())
</script>

<template>
  <div class="g-box p-5 h-full overflow-y-scroll">
    <div class="flex">
      <q-input
        v-model="goggle.metaData.name"
        type="text"
        placeholder="Name"
        borderless
        autogrow
        class="w-full"
        input-class="!pt-0 !leading-snug tracking-wider !text-(3xl stone-3) font-(extrabold [heading])"
      >
        <template #prepend>
          <q-icon
            class="cursor-pointer !mb-3"
            :name="
              goggle.metaData.public ? 'eva-eye-outline' : 'eva-eye-off-outline'
            "
            @click="() => (goggle.metaData.public = !goggle.metaData.public)"
          >
            <q-tooltip anchor="center left" self="center end">
              Click to make {{ goggle.metaData.public ? 'private' : 'public' }}
            </q-tooltip>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="-mt-2 ml-9">
      <q-input
        v-model="goggle.metaData.description"
        type="text"
        placeholder="Description"
        autogrow
        borderless
        input-class="leading-snug !pt-0 !text-stone-4"
      />
      <q-input
        v-model="goggle.metaData.author"
        type="text"
        placeholder="author"
        borderless
        prefix="by"
        class="sm:-mt-10"
        input-class="!text-stone-4"
      />

      <div class="space-y-2 mt-6">
        <q-input
          v-model="goggle.metaData.avatar"
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
                <q-color v-model="goggle.metaData.avatar" flat />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          v-model="goggle.metaData.homepage"
          type="text"
          label="Homepage"
          borderless
        />
        <q-input
          v-model="goggle.metaData.issues"
          type="text"
          label="Issues"
          borderless
        />
        <q-input
          v-model="goggle.metaData.license"
          type="text"
          label="License"
          borderless
        />
        <q-input
          v-model="goggle.metaData.transferred_to"
          type="text"
          label="Transferred to"
          borderless
        />
      </div>
    </div>
  </div>
</template>
