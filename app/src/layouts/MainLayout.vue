<script lang="ts" setup>
/**
 * regarding suspense and vue-router
 * @see https://github.com/vuejs/router/issues/1319#issuecomment-1054157888
 */
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import BreadcrumbsNavigation from './BreadcrumbsNavigation.vue'

const $q = useQuasar()
const { isLoading, error } = storeToRefs(useGoggleFileStore())
let rightDrawerOpen = $ref(false)
let version = $ref(process.env.VERSION)

const menuLinks = [
  { to: '/', label: 'Goggles' },
  { to: '/settings', label: 'Settings' },
]
const footerLinks = [
  {
    href: 'https://gearchy.wolf.gdn',
    icon: 'eva-globe-2-outline',
  },
  {
    href: 'https://github.com/devidw/gearchy',
    icon: 'eva-github-outline',
  },
  {
    href: 'https://github.com/sponsors/devidw',
    icon: 'eva-heart-outline',
    classes: 'hover:(text-red-3 scale-[1.1]) transition transition-300',
  },
]

// TODO: only show main loading when page and action are intended to load mainly
watch(isLoading, (newValue) => {
  if (newValue) {
    $q.loading.show({
      spinnerSize: 0,
      html: true,
      message: `
        <div class="-left-[100px] -top-[100px] relative animate-(pulse count-infinit)" data-test="loading-animation">
          <img class="absolute animate-spin" src="/circle.svg" width="200" />
          <img class="absolute" src="/face.svg" width="200" />
        </div>
        `,
    })
  } else {
    $q.loading.hide()
  }
})

function toggleRightDrawer() {
  rightDrawerOpen = !rightDrawerOpen
}
</script>

<template>
  <q-layout view="hHr lpR fFr">
    <q-header class="bg-transparent backdrop-blur md:px-5 md:py-3">
      <q-toolbar class="flex justify-between">
        <breadcrumbs-navigation />

        <g-btn
          dense
          class="text-(gray opacity-50)"
          icon="eva-menu-arrow-outline"
          @click="toggleRightDrawer"
        />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      :width="200"
      overlay
      class="shadow-2xl"
    >
      <div class="h-full flex flex-col justify-between flex-wrap">
        <q-list class="w-full">
          <q-item class="flex justify-end md:pr-8 md:pt-5">
            <g-btn
              dense
              icon="eva-menu-arrow-outline"
              class="text-(gray opacity-50) rotate-180"
              @click="() => (rightDrawerOpen = false)"
            />
          </q-item>
          <q-separator class="my-4 bg-transparent" />
          <q-item
            v-for="(link, i) of menuLinks"
            :key="i"
            v-ripple
            clickable
            :to="link.to"
            :active="false"
          >
            <q-item-section
              class="tracking-wide font-medium text-(gray center) sm:(text-end) md:pr-5"
            >
              {{ link.label }}
            </q-item-section>
          </q-item>
        </q-list>

        <div class="w-full space-y-20 text-(gray end) pr-8">
          <div class="lt-sm:(flex justify-center space-x-3) opacity-50">
            <template
              v-for="({ icon, href, classes }, index) in footerLinks"
              :key="index"
            >
              <div>
                <g-btn
                  :icon="icon"
                  :href="href"
                  target="_blank"
                  :class="classes ? classes : ''"
                />
              </div>
            </template>
          </div>

          <div class="px-3 pb-3 opacity-35 font-(mono) text-(end [10px])">
            <div>{{ version }}</div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="max-w-3xl mx-auto">
      <template v-if="error">
        <div
          class="fixed bg-amber-900 text-amber-200 px-7 py-4 rounded-4 font-mono z-1 drop-shadow-2xl"
          data-test="error-message"
        >
          {{ error }}
        </div>
      </template>
      <router-view v-slot="{ Component }">
        <Suspense>
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            {{ error }}
          </template>
        </Suspense>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.q-drawer
  @apply #{"!"}lt-sm:w-full

.q-loading__message
  @apply #{"!"}m-0
</style>
