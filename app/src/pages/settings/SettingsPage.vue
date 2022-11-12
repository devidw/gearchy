<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useGoggleHostGitHubStore } from 'src/stores/hosts/github'
import { useBraveStore } from 'src/stores/brave'

const $q = useQuasar()
const isPwd = ref(true)
const { accessToken } = storeToRefs(useGoggleHostGitHubStore())
const { isValidAccessToken } = useGoggleHostGitHubStore()
const { apiUrl } = storeToRefs(useBraveStore())

async function validateAccessToken() {
  const accessTokenIsValid = await isValidAccessToken(accessToken.value)

  if (accessTokenIsValid) {
    $q.notify({
      type: 'positive',
      message: 'Access token is valid',
    })
  } else {
    $q.notify({
      type: 'negative',
      message: 'Invalid access token',
      caption: 'Make sure the token is not expired and has the "gist" scope',
    })
  }
}

function preValidateAccessToken(value: string) {
  return /.+/.test(value)
}

function validateApiUrl(value: string) {
  return /^https:\/\/.+%s.*/.test(value)
}
</script>

<template>
  <q-page>
    <div class="mb-8 text-(gray)">
      <div class="g-heading">Settings</div>
    </div>

    <div class="g-box px-6 py-5 text-stone-3">
      <q-input
        v-model="accessToken"
        :type="isPwd ? 'password' : 'text'"
        label="GitHub Personal access token"
        placeholder="ghp_*"
        input-class="!text-stone-3 font-mono"
        bottom-slots
        borderless
        :rules="[(v) => preValidateAccessToken(v) || 'Invalid Access token']"
      >
        <template #append>
          <div class="text-stone-5">
            <g-btn
              :icon="isPwd ? 'eva-eye-off-outline' : 'eva-eye-outline'"
              @click="() => (isPwd = !isPwd)"
            />
            <g-btn
              v-if="preValidateAccessToken(accessToken)"
              icon="eva-done-all-outline"
              @click="validateAccessToken"
            >
              <q-tooltip> Validate token </q-tooltip>
            </g-btn>
            <g-btn
              icon="eva-question-mark-outline"
              class="text-stone-5"
              href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
              target="_blank"
              rel="noopener noreferrer"
            >
              <q-tooltip> GitHub docs </q-tooltip>
            </g-btn>
          </div>
        </template>
      </q-input>

      <q-input
        v-model="apiUrl"
        type="url"
        label="Brave Submission API Proxy"
        placeholder="https://example.org/submit?url=%s"
        input-class="!text-stone-3 font-mono"
        borderless
        bottom-slots
        :rules="[
          (v) =>
            validateApiUrl(v) ||
            'Invalid API URL, make sure it starts with https:// and contains %s',
        ]"
      >
        <template #append>
          <g-btn
            icon="eva-question-mark-outline"
            class="text-stone-5"
            href="https://github.com/devidw/gearchy/blob/master/FAQ.adoc#how-to-automatically-submit-updated-goggles-to-brave-search"
            target="_blank"
            rel="noopener noreferrer"
          >
            <q-tooltip> What is this? </q-tooltip>
          </g-btn>
        </template>
      </q-input>
    </div>
  </q-page>
</template>
