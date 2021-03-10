describe('Search', () => {
  const searchTerm = 'cypress.io'

  beforeEach(() => {
    cy.intercept(
      'GET',
      `**?q=${searchTerm}**`
    ).as('getSearchResults')

    cy.visit('https://duckduckgo.com/')

    cy.get('form input[type="text"]')
      .as('searchField')
      .should('be.visible')
  })

  it('types and hits ENTER', () => {
    cy.get('@searchField')
      .type(`${searchTerm}{enter}`)

    cy.wait('@getSearchResults')

    cy.assertTenResultsPlusMoreResultsButton()
  })

  it('types and clicks the magnifying glass button', () => {
    cy.get('@searchField')
      .type(searchTerm)
    cy.get('form input[type="submit"]')
      .should('be.visible')
      .click()

    cy.wait('@getSearchResults')

    cy.assertTenResultsPlusMoreResultsButton()
  })

  it('types and submits the form directly', () => {
    cy.get('@searchField')
      .type(searchTerm)
    cy.get('form').submit()

    cy.wait('@getSearchResults')

    cy.assertTenResultsPlusMoreResultsButton()
  })
})
