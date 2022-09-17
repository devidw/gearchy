<template>
  <q-layout view="hHr lpR fFr">
    <q-header class="bg-transparent backdrop-blur md:px-5 md:py-3">
      <q-toolbar class="flex justify-between">
        <breadcrumbs-navigation />

        <q-btn
          dense
          round
          flat
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
            <q-btn
              flat
              round
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
            clickable
            v-ripple
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
                <q-btn
                  :icon="icon"
                  :href="href"
                  target="_blank"
                  flat
                  round
                  class=""
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
      <router-view class="pt-6 md:pt-20" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useGistStore } from 'stores/gist'
import BreadcrumbsNavigation from 'components/BreadcrumbsNavigation.vue'

const $q = useQuasar()
const rightDrawerOpen = ref(false)
const version = ref(process.env.VERSION)
const gistStore = useGistStore()
const { isLoading, error } = storeToRefs(gistStore)

watch(isLoading, (newVal) => {
  if (newVal) {
    $q.loading.show({
      spinnerSize: 0,
      html: true,
      message: /* html */ `
      <div class="-left-[100px] -top-[100px] relative animate-(pulse count-infinit)">
        <img class="absolute animate-spin" src="/circle.svg" width="200" />
        <img class="absolute" src="/face.svg" width="200" />
      </div>
      `,
    })
  } else {
    $q.loading.hide()
  }
})

watch(error, (error) => {
  if (error instanceof Error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: error.message,
    })
  }
})

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

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
</script>

<style lang="sass">
.q-drawer
  @apply #{"!"}lt-sm:w-full

.q-loading__message
  @apply #{"!"}m-0
</style>
