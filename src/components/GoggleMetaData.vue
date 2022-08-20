<template>
  <div class="space-y-2">
    <q-input v-model="metaData!.name" type="text" label="Name" />
    <q-input
      v-model="metaData!.description"
      type="text"
      label="Description"
      autogrow
    />
    <div class="flex">
      <div class="w-1/3 pr-3">
        <q-select
          v-model="metaData!.public"
          :options="typeOptions"
          emit-value
          map-options
          dropdown-icon="eva-arrow-down-outline"
        >
          <q-tooltip anchor="top middle" :offset="[0, 50]">
            This only affects the visibility of the goggle, not the visibility
            of the gist.
            <br />
            Private gists can be made public on GitHub.
            <br />
            To make a public gist private again, it has to be deleted and
            recreated.
          </q-tooltip>
        </q-select>
      </div>
      <div class="w-2/3 pl-3">
        <q-input v-model="metaData!.author" type="text" label="Author" />
      </div>
    </div>
    <div v-if="pref.editor.showAdvanced">
      <q-input v-model="metaData!.avatar">
        <template v-slot:append>
          <q-icon name="eva-color-picker-outline" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-color flat v-model="metaData!.avatar" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="metaData!.homepage" type="text" label="Homepage" />
      <q-input v-model="metaData!.issues" type="text" label="Issues" />
      <q-input v-model="metaData!.license" type="text" label="License" />
      <q-input
        v-model="metaData!.transferred_to"
        type="text"
        label="Transferred to"
      />
    </div>
    <div class="flex justify-between space-x-2 pt-4">
      <div class="flex items-center text-xs text-gray">
        <q-checkbox
          class="g-advanced-toggle"
          size="30px"
          v-model="pref.editor.showAdvanced"
          :label="pref.editor.showAdvanced ? 'Hide advanced' : 'Show advanced'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePrefStore } from 'stores/pref'

const { pref } = usePrefStore()

const props = defineProps({
  metaData: Object,
})

const metaData = ref(props.metaData)

const typeOptions = [
  { value: true, label: 'Public' },
  { value: false, label: 'Private' },
]
</script>

<style lang="sass">
.g-advanced-toggle > .q-checkbox__inner
  @apply hidden
</style>
