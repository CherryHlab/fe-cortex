/// <reference types="cypress" />
import { SideBarPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateBedList() {
  cy.get(SideBarPage.buttonSidebar).click();
  cy.get(SideBarPage.bedList).click();
}
