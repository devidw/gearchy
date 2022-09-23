<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import { useGoggleStore } from 'src/stores/goggle'
import GoggleActionBar from '../GoggleActionBar.vue'
import GoggleDetailRuleList from './GoggleDetailRuleList.vue'
import deleteGoggleDialog from '../useDeleteGoggleDialog'

const route = useRoute()
const router = useRouter()
const goggleFileStore = useGoggleFileStore()
const { actions } = useGoggleStore()
const { goggle } = storeToRefs(useGoggleStore())

if (!route.params.host || !route.params.id) {
  router.push({ name: 'goggle-list' })
}

await goggleFileStore.retrieve(
  route.params.host as string,
  route.params.id as string,
)

const filteredActions = computed(() => {
  return actions.filter((action) => goggle.value?.rules[action.key].length)
})
</script>

<template>
  <q-page padding>
    <div class="space-y-12">
      <goggle-action-bar>
        <template #before>
          <div class="px-2">
            <div
              class="mb-2 tracking-wider font-(extrabold [heading]) text-(3xl stone-3) grid grid-cols-[1fr_2.5rem]"
            >
              <div>
                {{ goggle?.metaData?.name || 'Unnamed Goggle' }}
              </div>
              <div class="flex justify-end sm:items-end">
                <q-icon
                  :name="
                    goggle?.metaData?.public
                      ? 'eva-eye-outline'
                      : 'eva-eye-off-outline'
                  "
                  class="opacity-25"
                />
              </div>
            </div>
            <div class="leading-snug text-(stone-4) sm:w-1/2">
              {{ goggle?.metaData?.description }}
            </div>
          </div>
        </template>
        <template #left>
          <g-btn
            icon="eva-edit-outline"
            @click="
              $router.push({
                name: 'goggle-edit',
                params: { host: $route.params.host, id: $route.params.id },
              })
            "
          />
          <g-btn
            icon="eva-trash-2-outline"
            @click="deleteGoggleDialog($router)"
          />
        </template>
      </goggle-action-bar>

      <div class="lt-md:space-y-6 md:(space-x-5 flex)">
        <template v-for="(action, i) in filteredActions" :key="i">
          <div class="md:w-1/3">
            <q-expansion-item
              :label="`${goggle!.rules[action.key].length} ${action.key}${
                goggle!.rules[action.key].length > 1 ? 's' : ''
              }`"
              :group="$q.screen.lt.md ? 'goggle-rule' : undefined"
              :icon="action.icon"
              expand-icon="eva-plus-circle-outline"
              expanded-icon="eva-minus-circle-outline"
              class="g-box overflow-hidden"
              header-class="px-6 py-4 font-([heading] bold) text-(lg stone-3)
                tracking-wide capitalize"
            >
              <GoggleDetailRuleList
                :action="action.key"
                :rules="goggle!.rules[action.key]"
              />
            </q-expansion-item>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>

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
