<template>
  <q-page padding>
    <custom-page-header>
      <template v-slot:title> Settings </template>
      <template v-slot:actions>
        <q-btn
          @click="saveSettings"
          icon="eva-save-outline"
          round
          flat
          :disable="localAccessToken === ''"
        />
      </template>
    </custom-page-header>

    <div class="bg-stone-8 text-stone-3 rounded-4 px-7 py-4">
      <q-input
        v-model="localAccessToken"
        label="Personal access token"
        placeholder="ghp_*"
        hide-hint
        bottom-slots
        input-class="!text-stone-3"
        autofocus
        borderless
      >
        <template v-slot:hint>
          <q-icon name="eva-question-mark-circle-outline" />
          See GitHub docs for
          <a
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
            target="_blank"
          >
            how to create a personal access token
          </a>
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGitHubStore } from 'stores/github'
import CustomPageHeader from 'components/CustomPageHeader.vue'
import { Notify } from 'quasar'

const { isValidAccessToken, saveAccessToken } = useGitHubStore()
const { accessToken } = storeToRefs(useGitHubStore())
const localAccessToken = ref(accessToken.value)

async function saveSettings() {
  const isValid = await isValidAccessToken(localAccessToken.value)

  if (!isValid) {
    Notify.create({
      message: 'Invalid access token',
      caption: 'Make sure the token is valid and has the "gist" scope',
      type: 'negative',
      timeout: 2000,
    })
    saveAccessToken('')
    return
  }

  saveAccessToken(localAccessToken.value)
  Notify.create({
    message: 'Settings saved',
    type: 'positive',
  })
}
</script>
