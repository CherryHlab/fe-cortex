/// <reference types="cypress" />

/**
 *
 * @param {string} department
 * @param {string} page
 */

export function PageRedirect(department = 'ipd', page = 'welcome') {
  cy.visit(`/${department}/${page}`);
}
