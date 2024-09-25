/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';
import * as SelectBranch from '../support/tasks/select_branch';
import * as SelectClinic from '../support/tasks/select_clinic';

Cypress.config('defaultCommandTimeout', 30000);

describe('template spec', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
  });

  it('should select clinic', function () {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    cy.fixture('department-clinic').then((department) => {
      SelectClinic.checkDepartmentAndClinic(department);
    });
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
  });
});
