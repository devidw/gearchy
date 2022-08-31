<template>
  <q-page padding class="flex justify-center items-center">
    <div class="bg-stone-8 rounded-4 px-6 pt-12 pb-16 w-lg space-y-10">
      <div class="text-(center) space-y-3">
        <img src="../assets/logo.svg" width="80" />
        <div class="font-(bold [heading]) text-(3xl stone-3) tracking-wide">
          Quickstart
        </div>
      </div>
      <q-list class="w-5/6 mx-auto space-y-3 font-(mono)">
        <q-item
          tag="label"
          v-for="(checkQ, i) in filterdCheckQs"
          :key="i"
          :class="{ 'cursor-not-allowed': checkQ.nxtHasVal }"
        >
          <q-item-section avatar>
            <!-- Since all question build on each other, only the last one can always be answered. -->
            <q-checkbox
              v-model="checkAs"
              :val="checkQ.val"
              :disable="checkQ.nxtHasVal"
              checked-icon="eva-done-all-outline"
            />
          </q-item-section>
          <q-item-section class="space-y-2">
            <q-item-label class="font-(extrabold)">
              {{ checkQ.label }}
            </q-item-label>
            <q-item-label v-if="!checkQ.hasVal" caption>
              <span v-html="checkQ.help"> </span>
            </q-item-label>
          </q-item-section>
          <q-item-section v-if="!checkQ.hasVal" side>
            <q-btn
              round
              flat
              icon="eva-question-mark-outline"
              :href="checkQ.whyUrl"
              target="_blank"
              class="text-gray"
            >
              <q-tooltip> Why do I need this? </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>

      <div
        v-if="checkAs.length === checkQs.length"
        class="flex justify-center !mt-24"
      >
        <q-btn
          no-caps
          rounded
          outline
          label="Finish Setup"
          to="/settings"
          color="primary"
          class="tracking-wider font-([heading] bold)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const checkAs = ref([])

const checkQs = ref([
  {
    val: 'gh',
    label: 'I have got a GitHub account',
    help: 'You can sign up for one at <a href="https://github.com/signup" target="_blank">github.com/signup</a>.',
    whyUrl:
      'https://github.com/devidw/goggledy-gui/blob/master/faq.adoc#why-do-i-need-a-github-account',
  },
  {
    val: 'token',
    label: 'I have got a GitHub personal access token with gist scope',
    help: 'Have a look into the <a href="https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token" target="_blank">GitHub docs</a> to check out how to create one.',
    whyUrl:
      'https://github.com/devidw/goggledy-gui/blob/master/faq.adoc#why-do-i-need-a-personal-access-token',
  },
])

const filterdCheckQs = computed(() => {
  function hasVal(value: string) {
    return checkAs.value.includes(value)
  }

  function hasNxtVal(index: number) {
    const next = checkQs.value[index + 1]

    if (next) {
      return hasVal(next.val)
    }

    return false
  }

  function getArr() {
    const checked = checkQs.value.filter((checkQ) => hasVal(checkQ.val))

    if (checked.length) {
      const hasNxt = checkQs.value[checked.length]

      if (hasNxt) {
        // Some are checked and there is a next question that is unchecked
        return checked.concat(hasNxt)
      }

      // All are checked
      return checked
    }

    // None are checked
    return [checkQs.value[0]]
  }

  return getArr().map((item, index) => {
    return {
      ...item,
      hasVal: hasVal(item.val),
      nxtHasVal: hasNxtVal(index),
    }
  })
})
</script>

<style>
.q-checkbox__bg {
  @apply rounded-full;
}
</style>
