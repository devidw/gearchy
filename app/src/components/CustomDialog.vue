<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="flip-up"
    transition-hide="flip-down"
    transition-duration="500"
  >
    <q-card class="pa-2 pt-4 w-70 !rounded-xl">
      <q-card-section class="mb-6 text-(center)">
        <div
          v-if="title"
          class="mb-3 tracking-wide text-(lg stone-1) font-(extrabold)"
        >
          {{ title }}
        </div>
        <div
          v-if="message"
          class="tracking-wider leading-normal text-(sm stone-3)"
        >
          {{ message }}
        </div>
      </q-card-section>

      <q-card-actions align="center" vertical class="space-y-2">
        <q-btn
          v-for="(action, i) of actions"
          :key="i"
          flat
          no-caps
          unelevated
          :label="
            action.label !== undefined
              ? action.label
              : action.type === 'ok'
              ? 'OK'
              : 'Cancel'
          "
          @click="
            action.type === 'ok'
              ? onDialogOK(action.payload || {})
              : onDialogCancel()
          "
          class="w-full tracking-wide !rounded-2 capitalize"
          :class="{
            'bg-amber-700 font-bold': action.type === 'ok' && action.class === undefined,
            'bg-stone-7 text-stone-4': action.type === 'cancel'  && action.class === undefined,
            [action.class as string]: action.class !== undefined,
          }"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useDialogPluginComponent } from 'quasar'

export type Action = {
  type: 'ok' | 'cancel'
  label?: string
  payload?: object
  class?: string
}

export interface Props {
  title?: string
  message?: string
  actions: Action[]
}

withDefaults(defineProps<Props>(), {
  actions: () => [{ type: 'ok' }, { type: 'cancel' }],
})

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
</script>
