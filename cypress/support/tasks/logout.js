/// <reference types="cypress" />
import { Logout_page } from "../locators";
import { Login_page } from "../locators";

Cypress.config('defaultCommandTimeout', 50000);

export function navigateUserMenu() {
  cy.get(Logout_page.user_menu).click();
}

export function logoutButton() {
  cy.get(Logout_page.logout_button).click();
  cy.url().should('include','ipd/welcome');
  cy.get(Login_page.button_welcome).should('be.visible').should('be.enabled');
}
