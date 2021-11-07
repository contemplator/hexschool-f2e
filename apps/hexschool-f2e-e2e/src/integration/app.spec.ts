import { getGreeting, getResources } from '../support/app.po';

describe('hexschool-f2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to hexschool-f2e!');
  });

  it('should display resources', () => {
    getResources().should((t) => expect(t.length).equal(4));
    // getAddTodoButton().click();
    // getTodos().should((t) => expect(t.length).equal(3));
  });
});
