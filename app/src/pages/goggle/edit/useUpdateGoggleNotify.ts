import { Notify } from 'quasar'
import { useGoggleFileStore } from 'src/stores/goggle-file'

export default async function () {
  const goggleFileStore = useGoggleFileStore()
  const success = await goggleFileStore.update()
  if (success) {
    Notify.create({
      type: 'positive',
      message: 'Goggle updated',
    })
  } else {
    Notify.create({
      type: 'negative',
      message: 'Goggle update failed',
    })
  }
}
