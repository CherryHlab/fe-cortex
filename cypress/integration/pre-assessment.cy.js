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
import * as PreAsssessment from '../support/tasks/pre-assessment';

Cypress.config('defaultCommandTimeout', 30000);

describe('Add Pre-assessment ', () => {
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
    BedList.dischargePatient();
  });

  it('Nurse should be add pre-assessment', function () {
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
    AssignBed.assignPatient(6);
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessment();
    PreAsssessment.addPreAssessment();
    PreAsssessment.submitPreAssessment();
  });

  it('Super user should be add admision note', function () {
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
    AssignBed.assignPatient(6);
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessment();
    PreAsssessment.addPreAssessment();
    PreAsssessment.submitPreAssessment();
  });
});

describe('Edit Pre-assessment', () => {
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
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(6);
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessment();
    PreAsssessment.addPreAssessment();
    PreAsssessment.submitPreAssessment();
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
    BedList.dischargePatient();
  });

  it('Nurse should be edit pre-assessment', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessmentPage();
    PreAsssessment.editPreAssessment();
    PreAsssessment.submitPreAssessment(true);
  });

  it('Super user should be edit pre-assessment', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessmentPage();
    PreAsssessment.editPreAssessment();
    PreAsssessment.submitPreAssessment(true);
  });
});

describe('View Pre-assessment', () => {
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
    BedList.navigateBedListPage();
    AssignBed.randomAvailableBed();
    AssignBed.assignPatient(6);
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessment();
    PreAsssessment.addPreAssessment();
    PreAsssessment.submitPreAssessment();
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
    BedList.dischargePatient();
  });

  it('Physician should be view pre-assessment', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessmentPage();
    PreAsssessment.viewPreAssessment();
  });

  it('Super user should be view pre-assessment', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessmentPage();
    PreAsssessment.viewPreAssessment();
  });

  it('Nurse should be view pre-assessment', function () {
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartment();
    SelectClinic.selectClinic();
    BedList.navigateBedListPage();
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessmentPage();
    PreAsssessment.viewPreAssessment();
  });
});
