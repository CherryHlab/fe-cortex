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
import * as Focus from '../support/tasks/focus_note';

Cypress.config('defaultCommandTimeout', 30000);

describe('Add Focus Note', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    Login.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
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
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submit_form();
    Sidebar.navigateBedlist();
    Bedlist.dischargePatient();
  });

  it('Nurse should be add focus note', function () {
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
    AssignBed.assign_patient(4);
    Patient.navigatePatientPage();
    Focus.addFocusNote();
  });

  it('Super user should be add focus note', function () {
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
    AssignBed.assign_patient(4);
    Patient.navigatePatientPage();
    Focus.addFocusNote();
  });
});

describe('Edit Focus Note', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    Login.navigateWelcomePage();
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
    AssignBed.assign_patient(4);
    Patient.navigatePatientPage();
    Focus.addFocusNote();
    Logout.navigateUserMenu();
    Logout.logoutButton();
    Login.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
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
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submit_form();
    Sidebar.navigateBedlist();
    Bedlist.dischargePatient();
  });

  it('Nurse should be edit focus note', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.selectBranch(1);
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Patient.navigatePatientPage();
    Focus.navigateFocusNotePage();
    Focus.editFocusNote();
  });

  it('Super user should be edit focus note', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Patient.navigatePatientPage();
    Focus.navigateFocusNotePage();
    Focus.editFocusNote();
  });
});

describe('View Focus Note', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    Login.navigateWelcomePage();
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
    AssignBed.assign_patient(4);
    Patient.navigatePatientPage();
    Focus.addFocusNote();
    Logout.navigateUserMenu();
    Logout.logoutButton();
    Login.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
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
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submit_form();
    Sidebar.navigateBedlist();
    Bedlist.dischargePatient();
  });

  it('Physician should be view focus note', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Patient.navigatePatientPage();
    Focus.navigateFocusNotePage();
    Focus.viewFocusNote();
  });

  it('Super user should be view focus note', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Patient.navigatePatientPage();
    Focus.navigateFocusNotePage();
    Focus.viewFocusNote();
  });

  it('Nurse should be view focus note', function () {
    cy.fixture('login-credential').then((data) => {
      Login.userLogin(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.selectBranch(1);
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedlistPage();
    Patient.navigatePatientPage();
    Focus.navigateFocusNotePage();
    Focus.viewFocusNote();
  });
});
