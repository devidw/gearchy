<template>
  <div class="g-box p-5">
    <div class="flex">
      <q-input
        v-model="goggle.metaData.name"
        type="text"
        placeholder="Name"
        borderless
        autogrow
        class="tracking-wider w-full font-(extrabold [heading]) text-3xl"
        input-class="!leading-snug !pt-0 !text-stone-3"
      >
        <template v-slot:prepend>
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
        class="!text-stone-4"
        input-class="leading-snug !pt-0"
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

      <div v-if="pref.editor.showAdvanced" class="space-y-2 mt-6">
        <q-input
          v-model="goggle.metaData.avatar"
          label="Avatar"
          borderless
          class="-ml-8.5"
        >
          <template v-slot:prepend>
            <q-icon name="eva-color-picker-outline" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color flat v-model="goggle.metaData.avatar" />
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
      <div class="flex justify-between space-x-2 pt-4">
        <div class="flex items-center text-xs text-gray">
          <q-checkbox
            class="g-advanced-toggle"
            size="30px"
            v-model="pref.editor.showAdvanced"
            :label="
              pref.editor.showAdvanced ? 'Hide advanced' : 'Show advanced'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import { usePrefStore } from 'stores/pref'

const { pref } = usePrefStore()
const { goggle } = storeToRefs(useGoggleStore())
</script>

<style lang="sass">
.g-advanced-toggle > .q-checkbox__inner
  @apply hidden
</style>
