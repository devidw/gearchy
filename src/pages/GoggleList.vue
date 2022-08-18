<template>
  <q-page padding>
    <div v-if="gists">
      <GoggleCard v-for="(gist, i) of gists" :key="i" v-bind="gist" />
    </div>

    <div text="gray center">
      <q-btn flat round icon="eva-plus-circle-outline" @click="createGist()" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGistStore } from '../stores/gist'
import GoggleCard from 'components/GoggleCard.vue'

const { gists } = storeToRefs(useGistStore())
const { fetchGists, createGist } = useGistStore()

fetchGists()
</script>
