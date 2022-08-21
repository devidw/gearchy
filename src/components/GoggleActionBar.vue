<template>
  <div text="gray" class="rounded-4 px-4 py-4 bg-stone-800">
    <div>
      <slot></slot>
    </div>
    <div flex>
      <div class="w-1/3">
        <q-btn
          v-if="context === 'edit'"
          round
          flat
          icon="eva-save-outline"
          @click="updateGist()"
        />
        <q-btn
          v-else
          round
          flat
          icon="eva-edit-outline"
          @click="$router.push(`/goggle/${gist.id}/edit`)"
        />
      </div>
      <div class="w-1/3 flex justify-center">
        <q-btn
          v-if="action && action !== 'meta'"
          round
          flat
          icon="eva-plus-circle-outline"
          @click="addRule()"
        />
      </div>
      <div class="w-1/3 flex justify-end">
        <q-btn
          round
          flat
          icon="eva-search-outline"
          @click="
            openURL(
              `https://search.brave.com/goggles?goggles_id=${encodeURIComponent(
                gist.url
              )}`
            )
          "
        >
          <q-tooltip> Search with this Goggle </q-tooltip>
        </q-btn>
        <q-btn round flat icon="eva-github-outline" @click="openURL(gist.url)">
          <q-tooltip> Open gist on GitHub </q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          icon="eva-external-link-outline"
          @click="
            openURL(
              `https://search.brave.com/goggles/discover?goggles_id=${encodeURIComponent(
                gist.url
              )}`
            )
          "
        >
          <q-tooltip> View Goggle's about page on Brave </q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          icon="eva-trash-2-outline"
          class="opacity-70"
          @click="deleteGoggle()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { openURL, useQuasar } from 'quasar'
import { useGistStore } from 'stores/gist'
import { useGoggleStore } from 'stores/goggle'
import { GoggleActionObject } from 'src/types'
import CustomDialogVue from './CustomDialog.vue'

const $q = useQuasar()
const { updateGist, deleteGist } = useGistStore()
const { addActionRule } = useGoggleStore()

const props = defineProps(['context', 'action', 'gist'])

function addRule() {
  const actionObj: GoggleActionObject = {
    pattern: '',
    site: '',
    options: [],
  }

  if (props.action !== 'discard') {
    actionObj.value = 2
  }

  addActionRule(props.action, actionObj)
}

function deleteGoggle() {
  $q.dialog({
    component: CustomDialogVue,
    componentProps: {
      title: 'Delete this Goggle?',
      message: 'This will also permanently delete the associated Gist.',
    },
  }).onOk(deleteGist)
}
</script>
