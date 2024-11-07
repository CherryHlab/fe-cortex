/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';
import * as Logout from '../support/tasks/logout';
import * as SelectBranch from '../support/tasks/select_branch';
import * as SelectClinic from '../support/tasks/select_clinic';
import * as Bedlist from '../support/tasks/bed_list';
import * as AssignBed from '../support/tasks/assign_bed';
import * as Patient from '../support/tasks/patient';
import * as Discharge from '../support/tasks/discharge';
import * as Sidebar from '../support/tasks/sidebar';

Cypress.config('defaultCommandTimeout', 30000);

describe('Assign bed', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    Login.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
    // I use super admin to discharge patient
    Logout.navigateUserMenu();
    Logout.logoutButton();
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      Login.userLogin();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    // cuz nurse can not submit discharge summary form
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submit_form();
    Sidebar.navigateBedlist();
    Bedlist.dischargePatient();
  });

  it('physician should be assign patient to bed list page', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient();
  });

  it('nurse should be assign patient to bed list page', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.selectBranch(1);
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient();
  });

  it('super user should be assign patient to bed list page', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient();
  });
});
