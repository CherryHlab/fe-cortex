/// <reference types="cypress" />
import { Select_branch_page } from '../locators';
import * as data from '../../fixtures/login-credential.json';

export function navigateSelectBranchPage() {
  cy.get(Select_branch_page.list_select_branch).should('be.visible');
}

export function selectBranch(branch = 1) {
  var lastIndexOfBranch = Select_branch_page.search_box_branch.lastIndexOf('-');
  var searchBox =
    Select_branch_page.search_box_branch.slice(0, lastIndexOfBranch + 1) +
    branch +
    Select_branch_page.search_box_branch.slice(lastIndexOfBranch + 1);
  cy.get(Select_branch_page.list_select_branch).click();
  cy.get(Select_branch_page.text_search_box)
    .should('be.visible')
    .should('be.empty');
  cy.get(searchBox).should('be.visible');
  cy.get(searchBox).click();
  cy.get(Select_branch_page.button_submit).click();
}

export function oneBranchOrSetDefault() {
  cy.url().should('include', 'ipd/select-ward');
}
