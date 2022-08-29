<template>
  <q-page padding>
    <custom-page-header>
      <template v-slot:title> Settings </template>
      <template v-slot:actions>
        <q-btn @click="saveAuthToken" icon="eva-save-outline" round flat />
      </template>
    </custom-page-header>

    <div class="bg-stone-8 text-stone-3 rounded-4 px-7 py-4">
      <q-input
        v-model="authToken"
        label="Personal access token"
        placeholder="ghp_*"
        hide-hint
        bottom-slots
        input-class="!text-stone-3"
        autofocus
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
import { LocalStorage, Notify } from 'quasar'
import CustomPageHeader from 'components/CustomPageHeader.vue'

const authToken = ref(String(LocalStorage.getItem('authToken') || ''))

function saveAuthToken() {
  try {
    LocalStorage.set('authToken', authToken.value)
    Notify.create({
      message: 'Settings saved',
      type: 'positive',
    })
  } catch (e) {
    console.error(e)
    Notify.create({
      message: 'Error saving personal access token',
      type: 'negative',
    })
  }
}
</script>
