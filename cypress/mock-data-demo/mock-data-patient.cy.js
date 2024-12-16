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
import * as GraphicSheet from '../support/tasks/graphic-sheet.js';

Cypress.config('defaultCommandTimeout', 30000);

describe('Start Mocking patient data', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
  });

  it('Mocking test data: Acute appendicitis ', function () {
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    SelectBranch.navigateSelectBranchPage();
    SelectBranch.oneBranchOrSetDefault();
    SelectClinic.navigateSelectClinicPage();
    SelectClinic.selectDepartmentMockData();
    SelectClinic.selectClinicMockData();
    BedList.navigateBedListPage();
    AssignBed.SearchHN();
    /*PreAsssessment.navigatePreAssessment();
    PreAsssessment.addPreAssessment("pre-assessment-appendicitis");
    PreAsssessment.submitPreAssessment();
    Admission.navigateAdmissionNote();
    Admission.addAdmissionNote("admission-note-appendicitis");
    Admission.submitAdmissionNote();
    Progress.addProgressNote(false,"progress-note-appendicitis");
    Focus.addFocusNote(false,"focus-note-appendicitis");
    Problem.addProblemList(false,"problem-list-appendicitis");*/
    GraphicSheet.addGraphicSheet(false,"mock-data-appendicitis/graphic-sheet-appendicitis");
    LogOut.navigateUserMenu();
    LogOut.logOutButton(); 
  });
});
