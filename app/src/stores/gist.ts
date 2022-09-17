import { defineStore, storeToRefs } from 'pinia'
import { Notify } from 'quasar'
import { useGitHubStore } from './github'
import { useGoggleStore } from './goggle'
import { Gist } from 'src/types'

const { api } = storeToRefs(useGitHubStore())

export const useGistStore = defineStore('gist', {
  state: () => ({
    login: undefined as string | undefined,
    pagination: {
      gistsPerPage: 100,
      gogglesPerPage: 10,
      pageInfo: {
        endCursor: undefined,
        hasNextPage: true,
      },
    },
    gists: [] as Gist[],
    gist: {} as Gist,
    isLoading: false,
    error: undefined as Error | unknown | undefined,
  }),

  getters: {},

  actions: {
    resetGists() {
      this.gists = []
      this.pagination.pageInfo.endCursor = undefined
      this.pagination.pageInfo.hasNextPage = true
    },
    maybeThrowOnResponse(response: unknown) {
      if (
        !response ||
        typeof response !== 'object' ||
        response.hasOwnProperty('errors')
      ) {
        throw new Error(
          (response as { errors: { message: string }[] }).errors
            .map((error) => error.message)
            .join(', '),
        )
      }
    },
    async fetchGists() {
      // if (this.gists.length > 4) return
      // setTimeout(() => {
      //   this.gists = [
      //     ...this.gists,
      //     ...Array(1)
      //       .fill({
      //         description: 'loading',
      //         public: true,
      //       } as Gist)
      //       .map(
      //         (gist, index) =>
      //           ({
      //             ...gist,
      //             id: index.toString(),
      //           } as Gist),
      //       ),
      //   ]
      // }, 100)
      // return

      if (!this.pagination.pageInfo.hasNextPage) {
        return
      }

      this.isLoading = true
      this.error = undefined

      try {
        const response = await api.value.graphql(
          `#graphql
          query GetGists ($perPage: Int!, $after: String) {
            viewer {
              gists(
                privacy: ALL,
                orderBy: {field: UPDATED_AT, direction: DESC},
                first: $perPage,
                after: $after
              ) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                edges {
                  node {
                    id: name
                    url
                    description
                    public: isPublic
                    files {
                      extension
                    }
                  }
                }
              }
              login
            }
          }`,
          {
            perPage: this.pagination.gistsPerPage,
            after: this.pagination.pageInfo.endCursor,
          },
        )

        this.maybeThrowOnResponse(response)

        const {
          viewer: {
            gists: { pageInfo, edges },
            login,
          },
        } = response

        this.login = login
        this.pagination.pageInfo = pageInfo

        const filtered = edges.filter(
          (edge: { node: { files: { extension: string }[] } }) =>
            edge.node.files[0].extension === '.goggle',
        )

        this.gists = this.gists.concat(
          filtered.map((edge: { node: object }) => edge.node),
        )

        // Automatically go further
        if (
          this.gists.length < this.pagination.gogglesPerPage &&
          pageInfo.hasNextPage
        ) {
          await this.fetchGists()
        }
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    },
    async fetchGist(id: string) {
      this.isLoading = true
      this.error = undefined
      this.gist = {} as Gist
      try {
        const response = await api.value.graphql(
          `query GetGist($name: String!) {
            viewer {
              gist(name: $name) {
                url
                id: name
                description
                files {
                  filename: name
                  text
                }
                public: isPublic
              }
              login
            }
          }`,
          { name: id },
        )

        this.maybeThrowOnResponse(response)

        const {
          viewer: { gist, login },
        } = response

        if (!gist) {
          throw new Error("Gist doesn't exist")
        }

        // GitHub API returns a URL of the form https://gist.github.com/id but
        // brave search works with https://gist.github.com/login/id, so we need
        // to mutate it here
        gist.url = `https://gist.github.com/${login}/${id}`

        this.login = login
        this.gist = gist

        useGoggleStore().parseGoggle()
      } catch (e) {
        this.error = e
        this.router.push('/')
      } finally {
        this.isLoading = false
      }
    },
    async createGist(isPublic: boolean) {
      this.isLoading = true
      this.error = undefined
      this.pagination.pageInfo.hasNextPage = true // Reload gists list with new gist
      this.gist = {} as Gist
      try {
        const res = await api.value.request('POST /gists', {
          public: isPublic,
          files: {
            'index.goggle': {
              content:
                '! This is the default template for a new Goggle created with Gearchy\n! You can edit the Goggle on https://app.gearchy.wolf.gdn',
            },
          },
        })
        if (!res.data.html_url || !res.data.id) {
          throw new Error('Invalid response')
        }
        this.gist.public = false
        this.gist.url = res.data.html_url
        this.gist.id = res.data.id
        this.router.push(`/goggle/${this.gist.id}`)
      } catch (e) {
        this.error = e
      } finally {
        this.isLoading = false
      }
    },
    async updateGist() {
      this.resetGists()
      const goggleStore = useGoggleStore()
      try {
        await api.value.request(`PATCH /gists/${this.gist.id}`, {
          gist_id: this.gist.id,
          description:
            goggleStore.goggle.metaData.name ||
            goggleStore.goggle.metaData.description ||
            '',
          files: {
            [this.gist.files[0].filename || 'index.goggle']: {
              content: goggleStore.stringifiedGoggle,
            },
          },
        })
        Notify.create({
          type: 'positive',
          message: 'Updated successfully',
          caption: 'Changes committed to GitHub gist',
        })
      } catch (e) {
        this.error = e
      }
    },
    async deleteGist() {
      this.error = undefined
      try {
        this.gists = this.gists.filter((gist: Gist) => gist.id !== this.gist.id)
        this.router.push('/')
        await api.value.request(`DELETE /gists/${this.gist.id}`, {
          gist_id: this.gist.id,
        })
        Notify.create({
          type: 'positive',
          message: 'Goggle deleted successfully',
        })
      } catch (e) {
        this.error = e
      }
    },
  },
})
