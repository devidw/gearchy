import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { Octokit } from 'https://cdn.skypack.dev/octokit'
import type {
  GoggleFileHostInfo,
  GoggleFilePreview,
  GoggleFile,
} from 'src/types'

export const useGoggleHostGitHubStore = defineStore('goggleHostGitHub', {
  state: () => ({
    accessToken: useStorage('accessToken', ''),
    pagination: {
      hasNextPage: true,
      endCursor: undefined as string | undefined,
      gistsPerPage: 100,
    },
  }),

  getters: {
    hostInfo(): GoggleFileHostInfo {
      return {
        name: 'GitHub',
        handle: 'github',
        icon: 'eva-github-outline',
        canSubmit: true,
      }
    },
    isAvailable(state) {
      return !!state.accessToken
    },
    api(state) {
      return new Octokit({ auth: state.accessToken })
    },
  },

  actions: {
    async list(perPage: number): Promise<GoggleFilePreview[]> {
      let goggleFilePreviews: GoggleFilePreview[] = []

      while (
        this.pagination.hasNextPage &&
        goggleFilePreviews.length < perPage
      ) {
        const response = await this.api.graphql(
          `query GetGists ($perPage: Int!, $after: String) {
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
            }
          }`,
          {
            perPage: this.pagination.gistsPerPage,
            after: this.pagination.endCursor,
          },
        )

        this.maybeThrowOnResponse(response)

        const {
          viewer: {
            gists: { pageInfo, edges },
          },
        } = response

        this.pagination = { ...this.pagination, ...pageInfo }

        const filtered = edges.filter(
          (edge: { node: { files: { extension: string }[] } }) =>
            edge.node.files[0].extension === '.goggle',
        )

        goggleFilePreviews = goggleFilePreviews.concat(
          filtered.map(
            (edge: {
              node: { id: string; description: string; url: string }
            }) => {
              return {
                host: this.hostInfo.handle,
                id: edge.node.id,
                name: edge.node.description,
                url: edge.node.url,
              }
            },
          ),
        )
      }

      return goggleFilePreviews
    },
    async retrieve(id: string): Promise<GoggleFile> {
      const response = await this.api.graphql(
        `query GetGist($name: String!) {
            viewer {
              gist(name: $name) {
                url
                id: name
                description
                files {
                  filename: name
                  content: text
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

      return {
        host: this.hostInfo.handle,
        id: gist.id,
        name: gist.description,
        // GitHub API returns a URL of the form https://gist.github.com/id but
        // brave search works with https://gist.github.com/login/id, so we need
        // to mutate it here
        url: `https://gist.github.com/${login}/${id}`,
        content: gist.files[0].content,
      }
    },
    async create(name: string, content: string): Promise<GoggleFile> {
      const res = await this.api.request('POST /gists', {
        public: false,
        description: name,
        files: {
          // TODO: support custom filenames
          ['index.goggle']: {
            content,
          },
        },
      })

      return {
        host: this.hostInfo.handle,
        id: res.data.id,
        name: name,
        url: res.data.html_url,
        content: content,
      }
    },
    async update(goggleFile: GoggleFile) {
      return await this.api.request(`PATCH /gists/${goggleFile.id}`, {
        description: goggleFile.name,
        files: {
          // TODO: support custom filename
          ['index.goggle']: {
            content: goggleFile.content,
          },
        },
      })
    },
    async delete(id: string) {
      return await this.api.request(`DELETE /gists/${id}`)
    },
    /**
     * We need a way for the mgmt store to reset the pagination
     */
    resetPagination() {
      this.pagination.endCursor = undefined
      this.pagination.hasNextPage = true
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
    /**
     * make request and see if success also check the scope x-header to see if it contains the required gist scope
     */
    async isValidAccessToken(accessToken: string) {
      const api = new Octokit({ auth: accessToken })
      try {
        const { headers } = await api.request('GET /user')
        return headers['x-oauth-scopes']?.includes('gist')
      } catch (e) {
        return false
      }
    },
  },
})
