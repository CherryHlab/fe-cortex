/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';
import * as SelectBranch from '../support/tasks/select_branch';
import * as SelectClinic from '../support/tasks/select_clinic';
import * as Bedlist from '../support/tasks/bed_list';

Cypress.config('defaultCommandTimeout', 30000);

describe('template spec', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    Login.navigateWelcomePage();
  });

  it('physician should see the bed list page', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Bedlist.checkHeaderBedlist();
    Bedlist.checkBedlist();
  });

  it('nurse should see the bed list page', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.selectBranch(1);
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Bedlist.checkHeaderBedlist();
    Bedlist.checkBedlist();
  });
  
  it('super user should see the bed list page', function () {
    Login.userLogin();
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Bedlist.checkHeaderBedlist();
    Bedlist.checkBedlist();
  });
});
