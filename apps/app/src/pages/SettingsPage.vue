<template>
  <q-page padding>
    <custom-page-header>
      <template v-slot:title> Settings </template>
    </custom-page-header>

    <div class="g-box px-6 py-5 text-stone-3">
      <q-input
        v-model="accessToken"
        label="GitHub Personal access token"
        placeholder="ghp_*"
        hide-hint
        bottom-slots
        borderless
        input-class="!text-stone-3"
      >
        <template v-slot:append>
          <q-btn
            round
            flat
            icon="eva-done-all-outline"
            @click="validateAccessToken"
            class="text-stone-5"
          >
            <q-tooltip> Validate token </q-tooltip>
          </q-btn>
        </template>
        <template v-slot:hint>
          <span class="text-stone-5">
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
        v-model="apiUrl"
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
        <template v-slot:append>
          <q-btn
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
import { storeToRefs } from 'pinia'
import { Notify, openURL } from 'quasar'
import { useGitHubStore } from 'stores/github'
import { useBraveStore } from 'stores/brave'
import CustomPageHeader from 'components/CustomPageHeader.vue'

const { accessToken } = storeToRefs(useGitHubStore())
const { isValidAccessToken } = useGitHubStore()
const { apiUrl } = storeToRefs(useBraveStore())

function validateApiUrl(value: string) {
  return /^https:\/\/.+%s.*/.test(value)
}

async function validateAccessToken() {
  const accessTokenIsValid = await isValidAccessToken(accessToken.value)

  if (accessTokenIsValid) {
    Notify.create({
      message: 'Access token is valid',
      type: 'positive',
    })
  } else {
    Notify.create({
      message: 'Invalid access token',
      caption: 'Make sure the token is not expired and has the "gist" scope',
      type: 'negative',
    })
  }
}
</script>
