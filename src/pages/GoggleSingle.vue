<template>
  <q-page padding>
    <template v-if="!isLoading && goggle">
      <goggle-action-bar :gist="gist" class="mb-12">
        <div class="mb-10 px-2">
          <div
            font="extrabold [heading]"
            text="3xl stone-3"
            class="mb-2 tracking-wider"
          >
            {{ goggle.metaData.name || 'Untitled' }}
          </div>
          <div text="stone-4" class="leading-snug w-1/2">
            {{ goggle.metaData.description || 'No description' }}
          </div>
        </div>
      </goggle-action-bar>

      <div class="space-y-6 md:space-y-0 md:space-x-5 md:flex">
        <template v-for="(action, i) in filteredActions" :key="i">
          <div class="md:w-1/3">
            <q-expansion-item
              v-if="goggle.rules[action.key].length"
              :label="`${goggle.rules[action.key].length} ${action.key}${
                goggle.rules[action.key].length > 1 ? 's' : ''
              }`"
              :icon="action.icon"
              header-class="px-6 py-4 font-([heading] bold) text-(lg stone-3)
            tracking-wide capitalize"
              class="bg-stone-8 rounded-4 overflow-hidden"
              expand-icon="eva-plus-circle-outline"
              expanded-icon="eva-minus-circle-outline"
            >
              <goggle-single-rules-list :rules="goggle.rules[action.key]" />
            </q-expansion-item>
          </div>
        </template>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleSingleRulesList from 'components/GoggleSingleRulesList.vue'
import { computed } from 'vue'

const route = useRoute()
const { isLoading, gist } = storeToRefs(useGistStore())
const { goggle, actions } = storeToRefs(useGoggleStore())
const { fetchGist } = useGistStore()

fetchGist(route.params.id)

const filteredActions = computed(() => {
  return actions.value.filter(
    (action) =>
      goggle.value.rules[action.key] && goggle.value.rules[action.key].length,
  )
})
</script>

<style lang="sass">
.q-item__section--side
  @apply min-w-unset text-gray

.q-item__section--main + .q-item__section--side i
    @apply text-size-5 opacity-50

.q-expansion-item__content
  .q-item__section--main, .q-item__label--caption
    @apply font-medium text-sm

  .q-item__label--caption
    @apply text-xs

  .q-item__section--avatar
    @apply items-end w-7 pr-3
</style>
