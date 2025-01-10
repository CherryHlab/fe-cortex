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
import * as Order from '../support/tasks/order';

Cypress.config('defaultCommandTimeout', 30000);

describe('Add One Day Med', () => {
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

  it('Physician should be add one day med', function () {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder('oneDay');
  });

  it('Super user should be add one day med', function () {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder();
  });
});

describe('Edit One Day Med', () => {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder();
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

  it('Physician should be edit one day med', function () {
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
    Order.editOrder('oneDay');
  });

  it('Super user should be edit one day med', function () {
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
    Order.editOrder('oneDay');
  });
});

describe('Remove One Day Med', () => {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder();
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

  it('Physician should be remove one day med', function () {
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
    Order.removeOrder();
  });

  it('Super user should be remove one day med', function () {
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
    Order.removeOrder();
  });
});

describe('View One Day Med', () => {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder();
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

  it('Physician should be view one day med', function () {
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
    Order.viewOrder();
  });

  it('Super user should be view one day med', function () {
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
    Order.viewOrder();
  });

  it('Nurse should be view one day med', function () {
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
    Order.viewOrder();
  });
});

describe('Add Continue Med', () => {
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

  it('Physician should be add continue med', function () {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder('continue', 'continue-order');
  });

  it('Super user should be add continue med', function () {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder('continue', 'continue-order');
  });
});

describe('Edit Continue Med', () => {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder('continue', 'continue-order');
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

  it('Physician should be edit continue med', function () {
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
    Order.editOrder('continue', 'edit-continue-order');
  });

  it('Super user should be edit continue med', function () {
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
    Order.editOrder('continue', 'edit-continue-order');
  });
});

describe('Remove Continue Med', () => {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder('continue', 'continue-order');
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

  it('Physician should be remove continue med', function () {
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
    Order.removeOrder('continue', 'remove-continue-order');
  });

  it('Super user should be remove conitue med', function () {
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
    Order.removeOrder('continue', 'remove-continue-order');
  });
});

describe('View Continue Med', () => {
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
    AssignBed.assignPatient(6, true, 101, 101);
    Patient.navigatePatientPage();
    Order.addOrder('continue', 'continue-order');
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

  it('Physician should be view continue med', function () {
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
    Order.viewOrder('continue', 'continue-order');
  });

  it('Super user should be view continue med', function () {
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
    Order.viewOrder('continue', 'continue-order');
  });

  it('Nurse should be view continue med', function () {
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
    Order.viewOrder('continue', 'continue-order');
  });
});
