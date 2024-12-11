/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as LogIn from '../support/tasks/login';
import * as LogOut from '../support/tasks/logout';
import * as SelectBranch from '../support/tasks/select-branch';
import * as SelectClinic from '../support/tasks/select-clinic';
import * as BedList from '../support/tasks/bed-list';
import * as AssignBed from '../support/tasks/assign-bed';
import * as Patient from '../support/tasks/patient';
import * as Discharge from '../support/tasks/discharge';
import * as SideBar from '../support/tasks/sidebar';

Cypress.config('defaultCommandTimeout', 30000);

describe('Add discharge and discharge patient from ward', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(1);
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
  });

  after('Discharge patient from nurse', function () {
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    BedList.dischargePatient();
  });

  it('physician should be discharge patient from bed list', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
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
    BedList.dischargePatient();
  });

  it('super user should be discharge patient from bed list', function () {
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
    BedList.dischargePatient();
  });

  it('nurse should not be discharge patient from bed list', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm(false);
  });
});

describe('Edit discharge', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(1);
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
  });

  afterEach('Discharge patient', function () {
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    BedList.dischargePatient();
  });

  it('physician should be edit discharge', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.editDischarge(true, false);
  });

  it('super user should be edit discharge', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.editDischarge(true, false);
  });

  it('nurse should be edit discharge', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.editDischarge(false, false);
  });
});

describe('View discharge', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(1);
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.editDischarge(false, true);
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
  });

  afterEach('Discharge patient', function () {
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    BedList.dischargePatient();
  });

  it('physician should be view discharge summary', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.viewDischarge();
  });

  it('super user should be view discharge summary', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.viewDischarge();
  });

  it('nurse should be view discharge summary', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    Patient.navigatePatientPage();
    Patient.navigateDischargeSummary();
    Discharge.viewDischarge();
  });
});
