<template>
  <q-page padding>
    <div v-if="gists">
      <GoggleCard v-for="(gist, i) of gists" :key="i" v-bind="gist" />
    </div>

    <div text="gray center">
      <q-btn
        flat
        round
        icon="eva-plus-circle-outline"
        @click="createGoggle()"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGoggleStore } from '../stores/goggle'
import GoggleCard from 'components/GoggleCard.vue'

const { gists } = storeToRefs(useGoggleStore())
const { fetchGoggles, createGoggle } = useGoggleStore()

fetchGoggles()
</script>
