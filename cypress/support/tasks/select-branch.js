/// <reference types="cypress" />
import { SelectBranchPage } from '../locators';
import * as data from '../../fixtures/login-credential.json';

export function navigateSelectBranchPage() {
  cy.get(SelectBranchPage.listSelectBranch).should('be.visible');
}

export function selectBranch(branch = 1) {
  var lastIndexOfBranch = SelectBranchPage.searchBoxBranch.lastIndexOf('-');
  var searchBox =
    SelectBranchPage.searchBoxBranch.slice(0, lastIndexOfBranch + 1) +
    branch +
    SelectBranchPage.searchBoxBranch.slice(lastIndexOfBranch + 1);
  cy.get(SelectBranchPage.listSelectBranch).click();
  cy.get(SelectBranchPage.textSearchBox)
    .should('be.visible')
    .should('be.empty');
  cy.get(searchBox).should('be.visible').should('not.empty');
  cy.get(searchBox).click();
  cy.get(SelectBranchPage.buttonSubmit).click();
}

export function oneBranchOrSetDefault() {
  cy.url().should('include', 'ipd/select-ward');
}
