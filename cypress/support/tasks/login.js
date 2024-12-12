/// <reference types="cypress" />
import { LogInPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateWelcomePage() {
  cy.get(LogInPage.buttonWelcome).click();
  cy.get(LogInPage.pageTitle).contains('cortex');
  cy.get(LogInPage.textUsername)
    .should('be.visible')
    .should('be.enabled')
    .should('be.empty');
  cy.get(LogInPage.textPassword)
    .should('be.visible')
    .should('be.enabled')
    .should('be.empty');
  cy.get(LogInPage.buttonLogin).should('be.visible').should('be.enabled');
}

export function superUserLogIn() {
  cy.get(LogInPage.textUsername).type(data.superUser.username);
  cy.get(LogInPage.textPassword).type(data.superUser.password);
  cy.get(LogInPage.buttonLogin).click();
  cy.url().should('include', 'select-ward');
}

export function userLogIn(
  data = { username: 'user1', password: 'MyPassw0rd' },
) {
  cy.get(LogInPage.textUsername).type(data.username);
  cy.get(LogInPage.textPassword).type(data.password);
  cy.get(LogInPage.buttonLogin).click();
  cy.url().should('include', 'select-branch');
}
