/// <reference types="cypress" />
import { ProblemListPage } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateProblemList() {
  cy.get(PatientPage.problemListForm).click();
  cy.get(ProblemListPage.problemListHeader).should('be.visible');
}

export function navigateProblemListPage() {
  cy.get(PatientPage.problemListPage).click();
  cy.get(PatientPage.title).should('have.text', 'Problem List');
}

export function addProblemList(
  isEdit = false,
  myFixture = 'problem-list.json',
) {
  cy.fixture(myFixture).then((d) => {
    let pl = d.problem;
    for (let i = 0; i < pl.length; i++) {
      if (!isEdit) navigateProblemList();

      cy.get(ProblemListPage.problem).clear();
      cy.get(ProblemListPage.problem).type(pl[i].name);

      cy.get(ProblemListPage.problemStatus).click({ force: true });
      cy.get(ProblemListPage.problemStatus).type(pl[i].problemStatus);
      cy.get(ProblemListPage.listOption).eq(0).click();

      if (pl[i].severity) {
        cy.get(ProblemListPage.severity).click({ force: true });
        cy.get(ProblemListPage.severity).type(pl[i].severity);
        cy.get(ProblemListPage.listOption).eq(0).click();
      }

      if (pl[i].startTime.performTime == 'now') {
        cy.get(ProblemListPage.buttonStartSetToday).click();
      } else {
        cy.get(ProblemListPage.startDate).clear();
        cy.get(ProblemListPage.startDate).type(pl[i].startTime.performDate);

        cy.get(ProblemListPage.startHour).clear();
        cy.get(ProblemListPage.startHour).type(pl[i].startTime.performHour);

        cy.get(ProblemListPage.startMinute).clear();
        cy.get(ProblemListPage.startMinute).type(pl[i].startTime.performMinute);
      }

      if (pl[i].problemStatus == 'Resolved') {
        if (pl[i].endTime.performTime == 'now') {
          cy.get(ProblemListPage.buttonEndSetToday).click();
        } else {
          cy.get(ProblemListPage.endDate).clear();
          cy.get(ProblemListPage.endDate).type(pl[i].endTime.performDate);

          cy.get(ProblemListPage.endHour).clear();
          cy.get(ProblemListPage.endHour).type(pl[i].endTime.performHour);

          cy.get(ProblemListPage.endMinute).clear();
          cy.get(ProblemListPage.endMinute).type(pl[i].endTime.performMinute);
        }
      }

      if (pl[i].detail) {
        cy.get(ProblemListPage.detail).clear();
        cy.get(ProblemListPage.detail).type(pl[i].detail);
      }

      if (!isEdit) submitProblemList(true);
      else submitProblemList();
    }
  });
}

export function submitProblemList(isEdit = false) {
  cy.get(ProblemListPage.buttonSubmit).click();
  if (isEdit)
    cy.get(ProblemListPage.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(ProblemListPage.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(ProblemListPage.toastTitle).should('not.exist');
  cy.get(ProblemListPage.toast).should('not.be.visible');
}

export function editProblemList(
  editItem = 0,
  myFixture = 'edit-problem-list.json',
) {
  cy.get(ProblemListPage.buttonEdit).eq(editItem).click({ force: true });
  addProblemList(true, myFixture);
}

export function viewProblemList(myFixture = 'problem-list.json') {
  cy.fixture(myFixture).then((d) => {
    let pl = d.problem;
    let plLength = pl.length;
    let myDate = '';
    let arrayTime = [];
    let arrayLength = 0;
    let plDate = [];
    let plTime = '';

    for (let i = 0; i < plLength; i++) {
      cy.get(ProblemListPage.viewProblemItem)
        .eq(i)
        .find(ProblemListPage.viewProblemName)
        .should('have.text', pl[i].name);
      cy.get(ProblemListPage.viewProblemItem)
        .eq(i)
        .find(ProblemListPage.viewProblemStatus)
        .should('have.text', pl[i].problemStatus);
      if (pl[i].severity) {
        cy.get(ProblemListPage.viewProblemItem)
          .eq(i)
          .find(ProblemListPage.viewSeverity)
          .should('have.text', pl[i].severity);
      }

      if (pl[i].startTime.performTime != 'now') {
        myDate = pl[i].startTime.performDate;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        plDate = arrayTime.join('/');
        plTime = `${plDate}, ${pl[i].startTime.performHour}:${pl[i].startTime.performMinute}`;
        cy.get(ProblemListPage.viewProblemItem)
          .eq(i)
          .find(ProblemListPage.viewStartDate)
          .find('p')
          .first()
          .should('have.text', plTime);
      }

      if (pl[i].problemStatus == 'Resolved') {
        if (pl[i].endTime.performTime != 'now') {
          myDate = pl[i].endTime.performDate;
          arrayTime = myDate.split('/');
          arrayLength = arrayTime.length - 1;
          arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
          plDate = arrayTime.join('/');
          plTime = `${plDate}, ${pl[i].endTime.performHour}:${pl[i].endTime.performMinute}`;
          cy.get(ProblemListPage.viewProblemItem)
            .eq(i)
            .find(ProblemListPage.viewEndDate)
            .should('have.text', plTime);
        }
      } else {
        cy.get(ProblemListPage.viewProblemItem)
          .eq(i)
          .find(ProblemListPage.viewEndDateEmpty)
          .should('have.text', '-');
      }

      if (pl[i].detail) {
        cy.get(ProblemListPage.viewProblemItem)
          .eq(i)
          .find(ProblemListPage.viewDetail)
          .should('have.text', pl[i].detail);
      } else {
        cy.get(ProblemListPage.viewProblemItem)
          .eq(i)
          .find(ProblemListPage.viewDetail)
          .should('have.text', '-');
      }
    }
  });
}

export function removeProblemList() {
  cy.get(ProblemListPage.viewProblemItem).should('have.length', 7);
  cy.get(ProblemListPage.buttonEllipsis).eq(0).click();
  cy.get(ProblemListPage.buttonRemove).click();
  cy.get(ProblemListPage.toast).should('be.visible');
  cy.get(ProblemListPage.toastTitle).should('not.exist');
  cy.get(ProblemListPage.toast).should('not.be.visible');
  cy.get(ProblemListPage.viewProblemItem).should('have.length', 6);
}
