<template>
  <q-page padding>
    <q-input
      v-model="authToken"
      label="Personal access token"
      placeholder="ghp_*"
      hide-hint
      bottom-slots
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
    <div text="end">
      <q-btn
        v-if="authToken"
        @click="saveAuthToken"
        icon="eva-save-outline"
        round
        flat
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LocalStorage, Notify, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const authToken = ref(String(LocalStorage.getItem('authToken')) || '')

function saveAuthToken() {
  try {
    LocalStorage.set('authToken', authToken.value)
    router.push('/')
  } catch (e) {
    console.error(e)
    Notify.create({
      message: 'Error saving personal access token',
      type: 'negative',
    })
  }
}
</script>
