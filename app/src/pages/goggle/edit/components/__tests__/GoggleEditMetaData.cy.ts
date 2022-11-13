import GoggleEditMetaData from '../GoggleEditMetaData.vue'

describe('GoggleEditMetaData.vue', () => {
  beforeEach(function () {
    cy.fixture('goggle').then((goggle) => {
      this.metaData = goggle.metaData
    })
  })

  it('displays meta data', function () {
    cy.mount(GoggleEditMetaData, {
      props: {
        modelValue: this.metaData,
      }
    })

    cy.get('[placeholder="Name"]').should('have.value', this.metaData.name)

    cy.get('[placeholder="Description"]').should('have.value', this.metaData.description)
  })
})