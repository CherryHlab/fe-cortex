/// <reference types="cypress" />
import { Sidebar_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateBedlist() {
  cy.get(Sidebar_page.button_sidebar).click();
  cy.get(Sidebar_page.bed_list).click();
}
