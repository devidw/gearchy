import { defineStore } from 'pinia'
import type {
  GoggleFile,
  GoggleFileHostInfo,
  GoggleFilePreview,
} from 'src/types'
import { db } from 'src/boot/db'

export const useGoggleHostLocalStore = defineStore('goggleHostLocal', {
  state: () => ({}),

  getters: {
    hostInfo(): GoggleFileHostInfo {
      return {
        name: 'Local',
        handle: 'local',
        icon: 'eva-hard-drive-outline',
        canSubmit: false,
      }
    },
    isAvailable() {
      return true
    },
  },

  actions: {
    async list(): Promise<GoggleFilePreview[]> {
      return (await db.goggles.toArray())
        .map((goggle) => ({
          host: this.hostInfo.handle,
          id: goggle.id as number,
          name: goggle.name,
        }))
        .reverse() // TODO: can we sort this in the db?
    },
    async retrieve(id: string): Promise<GoggleFile> {
      const goggle = await db.goggles.get(Number(id))
      if (!goggle) throw new Error('Goggle not found')
      return {
        host: this.hostInfo.handle,
        id,
        name: goggle.name,
        content: goggle.content,
      }
    },
    async create(name: string, content: string): Promise<GoggleFile> {
      const id = await db.goggles.add({ name, content })
      return {
        host: this.hostInfo.handle,
        id: id as number,
        name,
        content,
      }
    },
    async update(goggleFile: GoggleFile): Promise<GoggleFile> {
      await db.goggles.update(Number(goggleFile.id), {
        name: goggleFile.name,
        content: goggleFile.content,
      })
      return goggleFile
    },
    async delete(id: string) {
      await db.goggles.delete(Number(id))
    },
  },
})
