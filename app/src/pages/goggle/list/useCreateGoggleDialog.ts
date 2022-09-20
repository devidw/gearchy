import { Dialog } from 'quasar'
import { useRouter } from 'vue-router'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import { availableHosts } from 'src/stores/hosts'
import CustomDialog from 'src/components/CustomDialog.vue'
import { storeToRefs } from 'pinia'

export default function () {
  Dialog.create({
    component: CustomDialog,
    componentProps: {
      title: 'Create new Goggle',
      message: 'Choose a host to create a new Goggle',
      actions: [
        ...Object.values(availableHosts).map((host) => ({
          type: 'ok',
          label: host.hostInfo.name,
          payload: { host: host.hostInfo.handle },
        })),
        { type: 'cancel' },
      ],
    },
  }).onOk(async ({ host }) => {
    const router = useRouter()
    const goggleFileStore = useGoggleFileStore()
    const { goggleFile } = storeToRefs(goggleFileStore)
    await goggleFileStore.create(host)
    if (!goggleFile.value) return
    router.push({
      name: 'goggle-edit',
      params: { host: goggleFile.value.host, id: goggleFile.value.id },
    })
  })
}
