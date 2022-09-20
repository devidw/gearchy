<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar, type QMenu } from 'quasar'
import { GoggleInstructionActionOptionKey } from 'goggledy'
import { useGoggleStore } from 'stores/goggle'
import CustomDialog from 'src/components/CustomDialog.vue'

const props = defineProps<{
  action: GoggleInstructionActionOptionKey
  index: number
}>()

const emit = defineEmits<{
  (e: 'ruleActionChange', action: GoggleInstructionActionOptionKey): void
}>()

const $q = useQuasar()
const moreMenu = ref<QMenu>()
const options = ref([
  { label: 'URL', value: 'inurl', disable: true },
  { label: 'Title', value: 'intitle', disable: true },
  { label: 'Description', value: 'indescription', disable: true },
  { label: 'Content', value: 'incontent', disable: true },
])

const { goggle, actions } = storeToRefs(useGoggleStore())
const { removeRule, duplicateRule } = useGoggleStore()
const { changeRuleAction } = useGoggleStore()

const rule = computed(() => goggle.value.rules[props.action][props.index])

function removeRuleHandler() {
  moreMenu.value?.hide()
  removeRule(props.action, props.index)
}

function duplicateRuleHandler() {
  moreMenu.value?.hide()
  duplicateRule(props.action, props.index)
}

function changeRuleActionHandler() {
  moreMenu.value?.hide()

  // create an array of action where the current action is not included
  const swapOptions = Object.keys(goggle.value.rules).filter(
    (action) => action !== props.action,
  )

  $q.dialog({
    component: CustomDialog,
    componentProps: {
      title: 'Change rule action',
      message: 'To which action do you want to change this rule?',
      actions: [
        ...swapOptions.map((action) => ({
          type: 'ok',
          label: action,
          payload: {
            action: action,
            index: props.index,
          },
        })),
        { type: 'cancel' },
      ],
    },
  }).onOk((payload) => {
    changeRuleAction(props.action, payload.action, payload.index)
    emit('ruleActionChange', payload.action)
  })
}

function shiftRuleValue() {
  if (!rule.value.value) {
    return
  }
  if (rule.value.value === 10) {
    rule.value.value = 2
  } else {
    rule.value.value++
  }
}

watchEffect(() => {
  if (!rule.value) {
    return
  }

  // Default to 'inurl' option, when no option is selected and pattern is provided
  if (rule.value.pattern && !rule.value.options?.length) {
    rule.value.options = ['inurl']
  }

  // Empty options, if options are provided but no pattern
  if (!rule.value.pattern && rule.value.options?.length) {
    rule.value.options = []
  }
})
</script>

<template>
  <div v-if="rule" class="g-box px-4 py-2 font-mono flex justify-between">
    <div
      class="w-1/12 flex justify-center items-center"
      :class="{
        'flex-col -mt-2': action === 'boost',
        'flex-col-reverse -mb-2': action === 'downrank',
        '-mt-1 -mb-1': action === 'discard',
      }"
    >
      <template v-if="action !== 'discard'">
        <g-btn
          dense
          class="g-btn"
          :icon="action === 'boost' ? actions[1].icon : actions[2].icon"
          @click="shiftRuleValue"
        />
        <span class="text-xs text-gray">
          {{ rule.value }}
        </span>
      </template>
      <q-icon
        v-else
        class="text-gray text-opacity-25"
        :name="actions[0].icon"
        size="24px"
      />
    </div>

    <div class="w-5/12 flex items-center">
      <div class="w-full -space-y-5">
        <q-input
          v-model="rule.site"
          type="text"
          autogrow
          placeholder="Site"
          borderless
          dense
          input-class="text-xs !text-gray"
          class="w-full"
        />
        <q-input
          v-model="rule.pattern"
          type="text"
          autogrow
          placeholder="Pattern"
          borderless
          dense
          input-class="text-lg font-bold !text-stone-3 !leading-normal"
          class="w-full"
        />
      </div>
    </div>

    <div class="w-5/12 flex items-end">
      <q-select
        v-if="rule.pattern"
        v-model="rule.options"
        :options="options"
        hide-dropdown-icon
        multiple
        borderless
        use-chips
        stack-label
        emit-value
        map-options
        dense
        class="g-select w-full h-full flex items-end"
      >
        <template #selected-item="scope">
          <q-chip
            :tabindex="scope.tabindex"
            :label="scope.opt.label"
            removable
            icon-remove="eva-close-outline"
            class="!text-gray font-medium text-xs bg-stone-7"
            @remove="scope.removeAtIndex(scope.index)"
          />
        </template>
        <q-tooltip anchor="center middle" self="center middle" class="w-50">
          Rule runs aginst the URL by default. May be changed to other context
          options once available in search engines.
        </q-tooltip>
      </q-select>
    </div>

    <div class="w-1/20 flex flex-col justify-center items-end g-btn">
      <div>
        <g-btn dense icon="eva-more-vertical-outline">
          <q-menu
            ref="moreMenu"
            cover
            anchor="center middle"
            flat
            class="!bg-stone-7 text-gray rounded-full"
          >
            <g-btn icon="eva-copy-outline" @click="duplicateRuleHandler" />
            <g-btn icon="eva-swap-outline" @click="changeRuleActionHandler" />
            <g-btn icon="eva-trash-2-outline" @click="removeRuleHandler()" />
          </q-menu>
        </g-btn>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.g-btn
  @apply text-gray text-opacity-25 hover:text-opacity-50 transition transition-300

.q-select
  .q-field__control
    @apply h-full

    .q-field__control-container
      @apply items-center

.q-menu--dark:not(.rounded-full)
  @apply bg-stone-7 rounded-3 font-mono
</style>
