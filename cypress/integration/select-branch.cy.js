/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as LogIn from '../support/tasks/login';
import * as SelectBranch from '../support/tasks/select-branch';

Cypress.config('defaultCommandTimeout', 30000);

describe('Select branch', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
  });

  it('should not select branch if only have 1 branch', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
  });
});
