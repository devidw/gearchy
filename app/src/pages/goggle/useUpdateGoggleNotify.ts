import { Notify } from 'quasar'
import { useGoggleFileStore } from 'src/stores/goggle-file'

export default async function () {
  const goggleFileStore = useGoggleFileStore()
  await goggleFileStore.update()
  if (!goggleFileStore.error) {
    Notify.create({
      type: 'positive',
      message: 'Goggle updated',
    })
  }
}
