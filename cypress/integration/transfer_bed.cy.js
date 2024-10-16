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

describe('Transfer in ward', () => {
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
  })

  it('physician should be transfer patient in ward', function () {
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
    AssignBed.assign_patient(7);
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient(7, false);
  });

  it('nurse should be transfer patient in ward', function () {
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
    AssignBed.assign_patient(8);
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient(8, false);
  });

  it('super user should be transfer patient in ward', function () {
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
    AssignBed.assign_patient(9);
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient(9, false);
  });
});


describe('Transfer between ward', () => {
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
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    // cuz nurse can not submit discharge summary form
    Patient.navigatePatientPage();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submit_form();
    Sidebar.navigateBedlist();
    Bedlist.dischargePatient();
  })

  it('physician should be transfer patient between ward', function () {
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
    AssignBed.assign_patient(4);
    Start.PageRedirect('ipd', 'select-ward');
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient(4, false);
  });

  it('nurse should be transfer patient between ward', function () {
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
    AssignBed.assign_patient(5);
    Start.PageRedirect('ipd', 'select-ward');
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient(5, false);
  });

  it('super user should be transfer patient between ward', function () {
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
    AssignBed.assign_patient(6);
    Start.PageRedirect('ipd', 'select-ward');
    SelectClinic.selectDepartment('จิตเวช');
    SelectClinic.selectClinic('จิตเวชหญิง 1', 4);
    AssignBed.randomAvailableBed();
    AssignBed.assign_patient(6, false);
  });
});
