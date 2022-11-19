import { Dialog } from 'quasar'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import GDialog from 'src/components/GDialog.vue'
import submitGoggleNotify from './useSubmitGoggleNotify'
import type { Router } from 'vue-router'

export default function (router: Router) {
  Dialog.create({
    component: GDialog,
    componentProps: {
      title: 'Delete this Goggle?',
      message:
        'This will permanently remove the associated Goggle from its host. If this Goggle was submitted to Brave, after deletion, it has to be resubmitted to trigger deletion on Brave.',
      actions: [{ type: 'ok', label: 'Delete' }, { type: 'cancel' }],
    },
  }).onOk(async () => {
    const goggleFileStore = useGoggleFileStore()
    const { goggleFile } = goggleFileStore
    router.push({ name: 'goggle-list' })
    await goggleFileStore.delete()
    if (goggleFile && goggleFile.url) {
      submitGoggleNotify(goggleFile.url)
    }
  })
}
