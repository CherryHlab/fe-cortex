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
import * as Sidebar from '../support/tasks/sidebar';

Cypress.config('defaultCommandTimeout', 30000);

describe('Transfer in ward', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
    // I use super admin to discharge patient
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
    // cuz nurse can not submit discharge summary form
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    Sidebar.navigateBedList();
    BedList.dischargePatient();
  });

  it('physician should be transfer patient in ward', function () {
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
    AssignBed.assignPatient(7);
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7, false);
  });

  it('nurse should be transfer patient in ward', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7);
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7, false);
  });

  it('super user should be transfer patient in ward', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7);
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7, false);
  });
});

describe('Transfer between ward', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
    LogIn.navigateWelcomePage();
  });

  afterEach('discharge patient from bed', function () {
    // I use super admin to discharge patient
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    // cuz nurse can not submit discharge summary form
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    Sidebar.navigateBedList();
    BedList.dischargePatient();
  });

  it('physician should be transfer patient between ward', function () {
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
    AssignBed.assignPatient(7);
    Start.PageRedirect('ipd', 'select-ward');
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7, false);
  });

  it('nurse should be transfer patient between ward', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7);
    Start.PageRedirect('ipd', 'select-ward');
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7, false);
  });

  it('super user should be transfer patient between ward', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7);
    Start.PageRedirect('ipd', 'select-ward');
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(7, false);
  });
});
