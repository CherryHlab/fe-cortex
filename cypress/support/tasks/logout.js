/// <reference types="cypress" />
import { LogOutPage } from '../locators';
import { LogInPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateUserMenu() {
  cy.get(LogOutPage.userMenu).click();
}

export function logOutButton() {
  cy.get(LogOutPage.logOutButton).click();
  cy.url().should('include', 'ipd/welcome');
  cy.get(LogInPage.buttonWelcome).should('be.visible').should('be.enabled');
}
