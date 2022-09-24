import { Dialog } from 'quasar'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import GDialog from 'src/components/GDialog.vue'
import { storeToRefs } from 'pinia'
import type { Router } from 'vue-router'

export default function (router: Router) {
  const goggleFileStore = useGoggleFileStore()

  Dialog.create({
    component: GDialog,
    componentProps: {
      title: 'Create new Goggle',
      message: 'Choose a host to create a new Goggle',
      actions: [
        ...Object.values(goggleFileStore.availableHosts).map((host) => ({
          type: 'ok',
          label: host.hostInfo.name,
          payload: { host: host.hostInfo.handle },
        })),
        { type: 'cancel' },
      ],
    },
  }).onOk(async ({ host }) => {
    const { goggleFile } = storeToRefs(goggleFileStore)
    await goggleFileStore.create(host)
    if (!goggleFile.value) return
    router.push({
      name: 'goggle-edit',
      params: { host: goggleFile.value.host, id: goggleFile.value.id },
    })
  })
}
