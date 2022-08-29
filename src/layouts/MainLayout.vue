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
                Goggledy
              </div>
            </div>
          </q-btn>
        </q-toolbar-title>

        <q-btn
          dense
          round
          flat
          text="gray opacity-50"
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
              text="gray opacity-50"
              style="transform: rotate(180deg)"
              @click="() => (rightDrawerOpen = false)"
            />
          </q-item>
          <q-separator class="my-4" bg="transparent" />
          <q-item
            v-for="(link, i) of links"
            :key="i"
            clickable
            v-ripple
            :to="link.to"
            :active="false"
          >
            <q-item-section>{{ link.label }}</q-item-section>
          </q-item>
        </q-list>

        <div
          class="w-full bg-transparent pb-3 pr-3 tracking-wide"
          text="end xs gray opacity-50"
        >
          &copy; {{ new Date().getFullYear() }}
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
import { QSpinnerOrbit } from 'quasar'

const $q = useQuasar()
const rightDrawerOpen = ref(false)
const gistStore = useGistStore()
const { loading, error } = storeToRefs(gistStore)

watch(loading, (loading) => {
  if (loading) {
    $q.loading.show({
      spinner: QSpinnerOrbit,
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

const links = [
  { to: '/', label: 'Goggles' },
  { to: '/settings', label: 'Settings' },
]
</script>

<style scoped lang="sass">
.q-item > .q-item__section
  @apply color-gray tracking-wide font-medium md:pr-5 text-center md:text-end
</style>
