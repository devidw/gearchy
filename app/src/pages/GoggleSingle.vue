<template>
  <q-page padding>
    <template v-if="!isLoading && !error && gist && goggle">
      <div class="space-y-12">
        <goggle-action-bar>
          <template v-slot:before>
            <div class="px-2">
              <div
                class="mb-2 tracking-wider font-(extrabold [heading]) text-(3xl stone-3) grid grid-cols-6 gap-2"
              >
                <div class="col-span-5">
                  {{ goggle.metaData?.name || 'Untitled' }}
                </div>
                <div class="col-span-1 flex justify-end sm:items-end">
                  <q-icon
                    :name="
                      gist.public ? 'eva-eye-outline' : 'eva-eye-off-outline'
                    "
                    class="opacity-25"
                  />
                </div>
              </div>
              <div class="leading-snug text-(stone-4) sm:w-1/2">
                {{ goggle.metaData?.description || 'No description' }}
              </div>
            </div></template
          >
        </goggle-action-bar>

        <div class="lt-md:space-y-6 md:(space-x-5 flex)">
          <template v-for="(action, i) in filteredActions" :key="i">
            <div class="md:w-1/3">
              <q-expansion-item
                v-if="goggle.rules[action.key].length"
                :label="`${goggle.rules[action.key].length} ${action.key}${
                  goggle.rules[action.key].length > 1 ? 's' : ''
                }`"
                :group="$q.screen.lt.md ? 'goggle-rule' : undefined"
                :icon="action.icon"
                expand-icon="eva-plus-circle-outline"
                expanded-icon="eva-minus-circle-outline"
                class="g-box overflow-hidden"
                header-class="px-6 py-4 font-([heading] bold) text-(lg stone-3)
                tracking-wide capitalize"
              >
                <goggle-single-rules-list :rules="goggle.rules[action.key]" />
              </q-expansion-item>
            </div>
          </template>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import GoggleActionBar from 'components/GoggleActionBar.vue'
import GoggleSingleRulesList from 'components/GoggleSingleRulesList.vue'

const route = useRoute()
const { error, isLoading, gist } = storeToRefs(useGistStore())
const { goggle, actions } = storeToRefs(useGoggleStore())
const { fetchGist } = useGistStore()

fetchGist(route.params.id)

const filteredActions = computed(() => {
  return actions.value.filter(
    (action) =>
      goggle.value.rules &&
      goggle.value.rules[action.key] &&
      goggle.value.rules[action.key].length,
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
