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
        'This will permanently remove the associated goggle from its host. Once the Goggle is deleted, it has to be resubmitted on Brave to remove it from the search engine as well.',
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
