import { defineStore } from 'pinia'
import type {
  GoggleFile,
  GoggleFileHostInfo,
  GoggleFilePreview,
} from 'src/types'
import { db } from 'src/boot/db'

export const useGoggleHostLocalStore = defineStore('goggleHostLocal', {
  state: () => ({
    pagination: {
      hasNextPage: true,
      count: 0,
    },
  }),

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
      // TODO: Actually check if indexedDB is supported by the client
      return true
    },
  },

  actions: {
    async list(perPage: number): Promise<GoggleFilePreview[]> {
      if (!this.pagination.hasNextPage) return []

      const goggles = await db.goggles
        .orderBy('id')
        .reverse()
        .offset(this.pagination.count)
        .limit(perPage)
        .toArray()

      // console.log(goggles)

      this.pagination.count += goggles.length
      this.pagination.hasNextPage =
        (await db.goggles.count()) > this.pagination.count

      return goggles.map((goggle) => ({
        host: this.hostInfo.handle,
        id: goggle.id as number,
        name: goggle.name,
      }))
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
    resetPagination() {
      this.pagination = {
        hasNextPage: true,
        count: 0,
      }
    },
  },
})
