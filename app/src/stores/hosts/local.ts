import { defineStore } from 'pinia'
import type { GoggleFile, GoggleFileHostInfo } from 'src/types'

export const useGoggleHostLocalStore = defineStore('goggleHostLocal', {
  state: () => ({}),

  getters: {
    hostInfo(): GoggleFileHostInfo {
      return {
        name: 'Local',
        handle: 'local',
        icon: 'eva-hard-drive-outline',
        canSubmit: true,
      }
    },
    isAvailable() {
      return true
    },
  },

  actions: {
    async list(): Promise<GoggleFile[]> {
      return []
    },
    async retrieve(id: string): Promise<GoggleFile> {
      return {} as GoggleFile
    },
    async create(name: string, content: string): Promise<GoggleFile> {
      return {} as GoggleFile
    },
    async update(goggleFile: GoggleFile): Promise<GoggleFile> {
      return {} as GoggleFile
    },
    async delete(string: id) {
      return
    },
  },
})
