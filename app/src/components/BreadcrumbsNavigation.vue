<template>
  <q-breadcrumbs
    class="font-([heading] extrabold) text-(sm gray opacity-75) tracking-wide sm:tracking-widest lt-sm:text-xs"
  >
    <template v-slot:separator>
      <span class="text-(gray opacity-50)">/</span>
    </template>

    <q-breadcrumbs-el to="/">
      <div class="flex items-center space-x-2 sm:space-x-3">
        <img src="../assets/logo.svg" alt="logo" width="35" />
        <span
          class="text-(gray opacity-50) uppercase tracking-widest sm:tracking-[5px]"
        >
          Gearchy
        </span>
      </div>
    </q-breadcrumbs-el>

    <q-breadcrumbs-el
      v-if="$route.name === 'goggle-edit'"
      :label="goggle.metaData?.name || 'Untitled Goggle'"
      :to="{ name: 'goggle-detail', params: { id: gist.id } }"
      class="capitalize lt-sm:max-w-[200px]"
    />
  </q-breadcrumbs>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from 'stores/goggle'
import { useGistStore } from 'src/stores/gist'

const { goggle } = storeToRefs(useGoggleStore())
const { gist } = storeToRefs(useGistStore())
</script>
