import { defineStore } from 'pinia'
import { useGoggleStore } from './goggle'
import { GoggleFile, GoggleFilePreview } from 'src/types'
import { availableHosts } from 'src/stores/hosts'

const goggleStore = useGoggleStore()

export const useGoggleFileStore = defineStore('goggleFile', {
  state: () => ({
    isLoading: false as 'foreground' | 'background' | false,
    error: undefined as Error | unknown | undefined,
    goggleFilePreviews: [] as GoggleFilePreview[],
    goggleFile: undefined as GoggleFile | undefined,
  }),

  getters: {
    host(state) {
      if (!state.goggleFile) return
      return availableHosts[state.goggleFile.host]
    },
    /**
     * Go through all available hosts and see if the optional pagination.hasNextPage is true
     */
    hasNextPage() {
      return Object.values(availableHosts).some(
        (host) => host.pagination?.hasNextPage,
      )
    },
  },

  actions: {
    /**
     * Retrieve all goggle files from all hosts
     */
    async list() {
      this.isLoading = 'foreground'
      try {
        Object.values(availableHosts).forEach(async (host) => {
          this.goggleFilePreviews = this.goggleFilePreviews.concat(
            await host.list(),
          )
        })
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Retrieve a given goggle file from a given host
     * And set it as the current goggle file
     */
    async retrieve(host: string, id: string) {
      // Only retrieve the goggle file if it is not already loaded in the current store
      if (
        this.goggleFile &&
        this.goggleFile.host === host &&
        this.goggleFile.id === id
      )
        return
      this.isLoading = 'foreground'
      try {
        this.goggleFile = await availableHosts[host].retrieve(id)
        goggleStore.parse(this.goggleFile)
        return this.goggleFile
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Create a new goggle file under the given host
     * And set the current goggle file to the newly created one
     */
    async create(host: string) {
      this.isLoading = 'foreground'
      try {
        this.goggleFile = await availableHosts[host].create(
          'New Goggle',
          '! This is the default template for a new Goggle created with Gearchy\n! You can edit the Goggle on https://app.gearchy.wolf.gdn',
        )
        goggleStore.parse(this.goggleFile)
        this.goggleFilePreviews = []
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Update the host file with the current state
     * Content of the updated goggle file is generated by goggle store
     */
    async update() {
      if (!this.goggleFile || !this.host) return false
      this.isLoading = 'background'
      try {
        this.goggleFile.content = goggleStore.stringifiedGoggle
        await availableHosts[this.host.hostInfo.handle].update(this.goggleFile)
        this.goggleFilePreviews = []
        return true
      } catch (error) {
        this.error = error
        return false
      } finally {
        this.isLoading = false
      }
    },
    /**
     * Update the host file with the current state
     */
    async delete() {
      if (!this.goggleFile || !this.host) return
      this.isLoading = 'background'
      try {
        await availableHosts[this.host.hostInfo.handle].delete(
          this.goggleFile.id,
        )
        this.goggleFile = undefined
        this.goggleFilePreviews = []
        goggleStore.goggle = undefined
      } catch (error) {
        this.error = error
      } finally {
        this.isLoading = false
      }
    },
  },
})
