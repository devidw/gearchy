import GoggleListItem from '../GoggleListItem.vue'
import { createPinia, storeToRefs } from 'pinia'
import { useGoggleFileStore } from 'src/stores/goggle-file'
import type { GoggleFileHostHandle } from 'src/types'

const pinia = createPinia()
const { availableHosts } = storeToRefs(useGoggleFileStore(pinia))

describe('GoggleListItem', function () {
  beforeEach(function () {
    cy.fixture('goggleFilePreview').then((goggleFilePreview) => {
      this.goggleFilePreview = goggleFilePreview
    })
  })

  it('displays name', function () {
    cy.mount(GoggleListItem, {
      props: {
        goggleFilePreview: this.goggleFilePreview,
      }
    })

    cy.get('[data-cy="goggle-list-item-name"]').should('contain', this.goggleFilePreview.name)
  })

  it('displays default name when unnamed', function () {
    cy.mount(GoggleListItem, {
      props: {
        goggleFilePreview: {
          host: 'local',
        }
      }
    })

    cy.get('[data-cy="goggle-list-item-name"]').should('not.be.empty')
  })

  it('displays host icon', function () {
    cy.mount(GoggleListItem, {
      props: {
        goggleFilePreview: this.goggleFilePreview,
      }
    })

    const hostHandle = this.goggleFilePreview.host as GoggleFileHostHandle
    const icon = availableHosts.value[hostHandle].hostInfo.icon

    cy.get(`.q-icon.${icon}`).should('exist')
  })

  it('displays host name tooltip on host icon hover', function () {
    cy.mount(GoggleListItem, {
      props: {
        goggleFilePreview: this.goggleFilePreview,
      }
    })

    const hostHandle = this.goggleFilePreview.host as GoggleFileHostHandle
    const hostName = availableHosts.value[hostHandle].hostInfo.name

    cy.get('.q-icon').trigger('mouseenter')
    cy.get('.q-tooltip').should('contain', hostName)
  })
})