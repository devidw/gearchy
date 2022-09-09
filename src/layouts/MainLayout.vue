<template>
  <q-layout view="hHr lpR fFr">
    <q-header class="bg-transparent backdrop-blur md:px-5 md:py-3">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn
            flat
            rounded
            :disable="$route.path === '/'"
            to="/"
            class="text-dark lt-md:!p-0"
          >
            <div class="flex no-wrap items-center space-x-2">
              <img src="../assets/logo.svg" alt="logo" width="35" />
              <div
                class="mt-1 font-[heading] font-extrabold tracking-widest uppercase text-(sm gray opacity-50)"
              >
                Gearchy
              </div>
            </div>
          </q-btn>
        </q-toolbar-title>

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
      overlay
      :width="$q.screen.lt.sm ? $q.screen.width : 200"
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
              class="color-gray tracking-wide font-medium md:pr-5 text-center sm:text-end"
            >
              {{ link.label }}
            </q-item-section>
          </q-item>
        </q-list>

        <div class="w-full space-y-20 text-(gray)">
          <div class="flex justify-center sm:-space-x-1 opacity-50">
            <q-btn
              v-for="({ icon, href, classes }, index) in footerLinks"
              :key="index"
              :icon="icon"
              :href="href"
              target="_blank"
              flat
              round
              :class="classes ? classes : ''"
            />
          </div>

          <div
            class="px-3 pb-3 flex justify-between opacity-35 font-(mono) text-(end [10px])"
          >
            <div>Gearchy {{ version }}</div>
            <div>&copy; {{ new Date().getFullYear() }}</div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="max-w-3xl mx-auto">
      <router-view class="pt-6 md:pt-20" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useGistStore } from 'stores/gist'

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
      <div class="-left-[100px] -top-[100px] relative animate-pulse animate-count-infinit">
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
    classes: 'hover:text-red-3 transition transition-300',
  },
]
</script>

<style lang="sass">
.q-loading__message
  margin: 0 !important
</style>
