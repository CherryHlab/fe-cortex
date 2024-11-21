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
import * as Progress from '../support/tasks/progress_note';

Cypress.config('defaultCommandTimeout', 30000);

describe('Add Progress Note', () => {
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

  it('Physician should be add progress note', function () {
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
    AssignBed.assign_patient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
  });

  it('Super user should be add progress note', function () {
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
    AssignBed.assign_patient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
  });
});

describe('Edit Progress Note', () => {
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
    AssignBed.assign_patient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
    //Progress.submitProgressNote(true);
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

  it('Physician should be edit progress note', function () {
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
    Progress.navigateProgressNotePage();
    Progress.editProgressNote();
  });

  it('Super user should be edit progress note', function () {
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
    Progress.navigateProgressNotePage();
    Progress.editProgressNote();
  });
});

describe('View Progress Note', () => {
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
    AssignBed.assign_patient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
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

  it('Physician should be view progress note', function () {
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
    Progress.navigateProgressNotePage();
    Progress.viewProgressNote();
  });

  it('Super user should be view progress note', function () {
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
    Progress.navigateProgressNotePage();
    Progress.viewProgressNote();
  });

  it('Nurse should be view progress note', function () {
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
    Progress.navigateProgressNotePage();
    Progress.viewProgressNote();
  });
});
