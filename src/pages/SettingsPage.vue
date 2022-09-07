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

    <div class="bg-stone-8 text-stone-3 rounded-4 px-6 py-5">
      <q-input
        v-model="localAccessToken"
        label="GitHub Personal access token"
        placeholder="ghp_*"
        hide-hint
        bottom-slots
        input-class="!text-stone-3"
        autofocus
        borderless
      >
        <template v-slot:prepend> </template>
        <template v-slot:hint>
          <span class="text-(stone-5)">
            <q-icon name="eva-question-mark-circle-outline" />
            See GitHub docs for
            <a
              href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
              target="_blank"
              rel="noopener noreferrer"
            >
              how to create a personal access token
            </a>
          </span>
        </template>
      </q-input>

      <q-input
        v-model="localApiUrl"
        type="url"
        label="Brave Submission API Proxy"
        placeholder="https://example.org/submit?url=%s"
        input-class="!text-stone-3"
        borderless
        :rules="[
          validateApiUrl ||
            'Invalid API URL, make sure it starts with https:// and contains %s',
        ]"
      >
        <template v-slot:prepend>
          <q-btn
            v-if="!validateApiUrl(localApiUrl)"
            round
            flat
            icon="eva-question-mark-outline"
            @click="
              openURL(
                'https://github.com/devidw/gearchy/blob/master/faq.adoc#how-to-automatically-submit-updated-goggles-to-brave-search',
              )
            "
            class="text-stone-5"
          >
            <q-tooltip> What is this? </q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Notify, openURL } from 'quasar'
import { useGitHubStore } from 'stores/github'
import { useBraveSubmissionProxyStore } from 'stores/brave-api-proxy'
import CustomPageHeader from 'components/CustomPageHeader.vue'

const { accessToken } = storeToRefs(useGitHubStore())
const { isValidAccessToken, saveAccessToken } = useGitHubStore()
const { apiUrl } = storeToRefs(useBraveSubmissionProxyStore())
const { saveApiUrl } = useBraveSubmissionProxyStore()
const localAccessToken = ref(accessToken.value)
const localApiUrl = ref(apiUrl.value)

function validateApiUrl(value: string) {
  return /^https:\/\/.+%s.*/.test(value)
}

async function saveSettings() {
  const accessTokenIsValid = await isValidAccessToken(localAccessToken.value)

  if (!accessTokenIsValid) {
    saveAccessToken('')
    Notify.create({
      message: 'Invalid access token',
      caption: 'Make sure the token is valid and has the "gist" scope',
      type: 'negative',
    })
    return
  }

  saveAccessToken(localAccessToken.value)
  saveApiUrl(localApiUrl.value)

  Notify.create({
    message: 'Settings saved',
    type: 'positive',
  })
}
</script>
