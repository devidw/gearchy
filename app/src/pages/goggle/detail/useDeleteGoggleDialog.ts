import { Dialog } from 'quasar'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import { useBraveStore } from 'src/stores/brave'
import CustomDialog from 'src/components/CustomDialog.vue'
import type { Router } from 'vue-router'

export default function (router: Router) {
  Dialog.create({
    component: CustomDialog,
    componentProps: {
      title: 'Delete this Goggle?',
      message:
        'This will permanently delete the associated Gist on GitHub. Once the gist is deleted, it has to be resubmitted on Brave to remove it from the search engine as well.',
      actions: [{ type: 'ok', label: 'Delete' }, { type: 'cancel' }],
    },
  }).onOk(async () => {
    const goggleFileStore = useGoggleFileStore()
    const { submitGoggle } = useBraveStore()
    router.push({ name: 'goggle-list' })
    await goggleFileStore.delete()
    if (goggleFileStore.goggleFile && goggleFileStore.goggleFile.url) {
      submitGoggle(goggleFileStore.goggleFile.url)
    }
  })
}
