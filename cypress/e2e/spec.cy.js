describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.fixture('orders').then((orders) => {
      cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        body: orders,
      });
    });

    cy.fixture('newOrder').then((newOrder) => {
      cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 201,
        body: newOrder,
      });
    });

    cy.visit('http://localhost:3000');
  });

  it('should display the page correctly on initial load', () => {
    cy.get('h1').should('contain', 'Burrito Builder');
    cy.get('form').should('exist');
    cy.get('.order').should('have.length', 1);
    cy.get('.order').first().within(() => {
      cy.get('h3').should('contain', 'Pat');
      cy.get('.ingredient-list').should('contain', 'beans')
        .and('contain', 'lettuce')
        .and('contain', 'carnitas')
        .and('contain', 'queso fresco')
        .and('contain', 'jalapeno');
    });
  });

  it('should allow users to add a new order', () => {
    cy.get('input[name="name"]').type('Alex');
    cy.get('button[name="steak"]').click();
    cy.get('button[name="pico de gallo"]').click();
    cy.get('button[name="hot sauce"]').click();
    cy.get('form button').contains('Submit Order').click();

    cy.get('.order').should('have.length', 2);
    cy.get('.order').last().within(() => {
      cy.get('h3').should('contain', 'Alex');
      cy.get('.ingredient-list').should('contain', 'steak')
        .and('contain', 'pico de gallo')
        .and('contain', 'hot sauce');
    });
  });

  it('should not allow users to submit an order without a name and ingredients', () => {
    cy.get('form button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 1);
    cy.get('input[name="name"]').type('Alex');
    cy.get('form button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 1);
    cy.get('input[name="name"]').clear();
    cy.get('button[name="steak"]').click();
    cy.get('form button').contains('Submit Order').click();
    cy.get('.order').should('have.length', 1);
  });
});
