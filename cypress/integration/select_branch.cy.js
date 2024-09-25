/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';
import * as SelectBranch from '../support/tasks/select_branch';

Cypress.config('defaultCommandTimeout', 30000);

describe('template spec', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
  });

  it('should not select branch if only have 1 branch', function () {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
  });

  it('should select branch if branch > 1 branch (select branch 1)', function () {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.selectBranch(1);
  });

  it('should select branch if branch > 1 branch (select branch 2)', function () {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.selectBranch(2);
  });

  it('should not select branch if branch > 1 branch but set default branch', function () {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.doctor);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
  });
});
