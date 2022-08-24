<template>
  <q-page padding>
    <template v-if="!loading && goggle">
      <goggle-action-bar :gist="gist" class="mb-12">
        <div class="mb-10 px-2">
          <div
            v-if="goggle.metaData.name"
            font="extrabold [heading]"
            text="3xl stone-3"
            class="mb-2 tracking-wider"
          >
            {{ goggle.metaData.name }}
          </div>
          <div
            v-if="goggle.metaData.description"
            text="stone-4"
            class="leading-snug w-1/2"
          >
            {{ goggle.metaData.description }}
          </div>
        </div>
      </goggle-action-bar>

      <div class="space-y-6 md:space-y-0 md:space-x-6 md:flex">
        <template v-for="(action, i) in filteredActions" :key="i">
          <div class="md:w-1/3">
            <q-expansion-item
              v-if="goggle.rules[action.key].length"
              :label="`${goggle.rules[action.key].length} ${action.key}${
                goggle.rules[action.key].length > 1 ? 's' : ''
              }`"
              :icon="action.icon"
              header-class="px-6 py-4 text-stone-3 font-bold text-lg
            tracking-wide font-[heading] capitalize"
              class="overflow-hidden border-2 border-stone-8 rounded-xl"
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
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleSingleRulesList from 'components/GoggleSingleRulesList.vue'
import { computed } from 'vue'

const route = useRoute()
const { loading, gist } = storeToRefs(useGistStore())
const { goggle } = storeToRefs(useGoggleStore())
const { fetchGist } = useGistStore()

fetchGist(route.params.id)

const actions = ref([
  {
    key: 'discard',
    icon: 'eva-slash-outline',
  },
  {
    key: 'boost',
    icon: 'eva-arrowhead-up-outline',
  },
  {
    key: 'downrank',
    icon: 'eva-arrowhead-down-outline',
  },
])

const filteredActions = computed(() => {
  return actions.value.filter((action) => goggle.value.rules[action.key].length)
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
    @apply items-end w-5
</style>
