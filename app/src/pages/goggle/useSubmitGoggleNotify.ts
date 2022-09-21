import { openURL, copyToClipboard, Notify, Dialog } from 'quasar'
import { useBraveStore } from 'src/stores/brave'
import GDialog from 'src/components/GDialog.vue'
import { storeToRefs } from 'pinia'

export default async function (url: string) {
  const { isAvailable } = useBraveStore()
  if (isAvailable) {
    automaticallySubmitGoggle(url)
  } else {
    manuallySubmitGoggle(url)
  }
}

async function automaticallySubmitGoggle(url: string) {
  const braveStore = useBraveStore()
  const { message, error } = storeToRefs(useBraveStore())
  await braveStore.submitGoggle(url)
  if (!error.value) {
    Notify.create({
      type: 'positive',
      message: message.value,
    })
  } else {
    Notify.create({
      type: 'negative',
      message: message.value,
      caption: error.value.message,
      multiLine: !!error.value.message,
    })
  }
}

function manuallySubmitGoggle(url: string) {
  Dialog.create({
    component: GDialog,
    componentProps: {
      title: 'Manually Submit Goggle',
      message:
        'The goggle URL will be copied to your clipboard. And you will be redirected to the Goggle submission page on Brave. For automated submissions, please refer to the FAQ.',
    },
  }).onOk(async () => {
    await copyToClipboard(url)
    openURL('https://search.brave.com/goggles/create')
  })
}
