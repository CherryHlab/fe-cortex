/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as LogIn from '../support/tasks/login';
import * as LogOut from '../support/tasks/logout';
import * as SelectBranch from '../support/tasks/select-branch';
import * as SelectClinic from '../support/tasks/select-clinic';
import * as Bedlist from '../support/tasks/bed-list';
import * as AssignBed from '../support/tasks/assign-bed';
import * as Patient from '../support/tasks/patient';
import * as Discharge from '../support/tasks/discharge';
import * as SideBar from '../support/tasks/sidebar';
import * as Progress from '../support/tasks/progress-note';

Cypress.config('defaultCommandTimeout', 30000);

describe('Add Progress Note', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    Bedlist.dischargePatient();
  });

  it('Physician should be add progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
  });

  it('Super user should be add progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
  });
});

describe('Edit Progress Note', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
    //Progress.submitProgressNote(true);
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    Bedlist.dischargePatient();
  });

  it('Physician should be edit progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    Patient.navigatePatientPage();
    Progress.navigateProgressNotePage();
    Progress.editProgressNote();
  });

  it('Super user should be edit progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    Patient.navigatePatientPage();
    Progress.navigateProgressNotePage();
    Progress.editProgressNote();
  });
});

describe('View Progress Note', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(3);
    Patient.navigatePatientPage();
    Progress.addProgressNote();
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    Bedlist.dischargePatient();
  });

  it('Physician should be view progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    Patient.navigatePatientPage();
    Progress.navigateProgressNotePage();
    Progress.viewProgressNote();
  });

  it('Super user should be view progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    Patient.navigatePatientPage();
    Progress.navigateProgressNotePage();
    Progress.viewProgressNote();
  });

  it('Nurse should be view progress note', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Bedlist.navigateBedListPage();
    Patient.navigatePatientPage();
    Progress.navigateProgressNotePage();
    Progress.viewProgressNote();
  });
});
