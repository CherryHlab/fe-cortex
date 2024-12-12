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
import * as Admission from '../support/tasks/admission-note';
import * as Progress from '../support/tasks/progress-note';
import * as Problem from '../support/tasks/problem-list';
import * as Focus from '../support/tasks/focus-note';

Cypress.config('defaultCommandTimeout', 30000);

describe('Run E2E', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
  });

  it('As admin, I want to run e2e', function () {
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
    AssignBed.assignPatient();
    Patient.navigatePatientPage();
    PreAsssessment.navigatePreAssessment();
    PreAsssessment.addPreAssessment();
    PreAsssessment.submitPreAssessment();
    Admission.navigateAdmissionNote();
    Admission.addAdmissionNote();
    Admission.submitAdmissionNote();
    Progress.addProgressNote();
    Focus.addFocusNote();
    Problem.addProblemList();
    Discharge.dischargeSummary();
    Patient.navigateDischargeSummary();
    Patient.submitForm();
    SideBar.navigateBedList();
    BedList.dischargePatient();
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
  });
});
