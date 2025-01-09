/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as LogIn from '../support/tasks/login';
import * as SelectBranch from '../support/tasks/select-branch';
import * as SelectClinic from '../support/tasks/select-clinic';

Cypress.config('defaultCommandTimeout', 30000);

describe('Select clinic', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
  });

  it('should select clinic', function () {
    SelectClinic.navigateSelectClinicPage();
    cy.fixture('sit-department-clinic').then((department) => {
      SelectClinic.checkDepartmentAndClinic(department);
    });
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
  });
});
