/// <reference types="cypress" />
import { FocusNotePage } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateFocusNote() {
  cy.get(PatientPage.focusNoteForm).click();
  cy.get(FocusNotePage.focusNoteHeader).should('be.visible');
}

export function navigateFocusNotePage() {
  cy.get(PatientPage.focusNotePage).click();
  cy.get(PatientPage.title).should('have.text', 'Focus Note');
}

export function addFocusNote(isEdit = false, myFixture = 'focus-note.json') {
  cy.fixture(myFixture).then((d) => {
    let fn = d.focusNote;
    for (let i = 0; i < fn.length; i++) {
      if (!isEdit) navigateFocusNote();

      cy.get(FocusNotePage.focus).clear();
      cy.get(FocusNotePage.focus).type(fn[i].focus);

      cy.get(FocusNotePage.assessment).clear();
      cy.get(FocusNotePage.assessment).type(fn[i].assessment);

      if (fn[i].time.performTime == 'now') {
        cy.get(FocusNotePage.buttonToday).click();
      } else {
        cy.get(FocusNotePage.performDate).clear();
        cy.get(FocusNotePage.performDate).type(fn[i].time.performDate);

        cy.get(FocusNotePage.performHour).clear();
        cy.get(FocusNotePage.performHour).type(fn[i].time.performHour);

        cy.get(FocusNotePage.performMinute).clear();
        cy.get(FocusNotePage.performMinute).type(fn[i].time.performMinute);
      }

      if (fn[i].intervention) {
        cy.get(FocusNotePage.intervention).clear();
        cy.get(FocusNotePage.intervention).type(fn[i].intervention);

        if (fn[i].interventionTime.performTime == 'now') {
          cy.get(FocusNotePage.buttonInterventionToday).click();
        } else {
          cy.get(FocusNotePage.interventionDate).clear();
          cy.get(FocusNotePage.interventionDate).type(
            fn[i].interventionTime.performDate,
          );

          cy.get(FocusNotePage.interventionHour).clear();
          cy.get(FocusNotePage.interventionHour).type(
            fn[i].interventionTime.performHour,
          );

          cy.get(FocusNotePage.interventionMinute).clear();
          cy.get(FocusNotePage.interventionMinute).type(
            fn[i].interventionTime.performMinute,
          );
        }
      }

      if (fn[i].evaluation) {
        cy.get(FocusNotePage.evaluation).clear();
        cy.get(FocusNotePage.evaluation).type(fn[i].evaluation);

        if (fn[i].evaluationTime.performTime == 'now') {
          cy.get(FocusNotePage.buttonEvaluationToday).click();
        } else {
          cy.get(FocusNotePage.evaluationDate).clear();
          cy.get(FocusNotePage.evaluationDate).type(
            fn[i].evaluationTime.performDate,
          );

          cy.get(FocusNotePage.evaluationHour).clear();
          cy.get(FocusNotePage.evaluationHour).type(
            fn[i].evaluationTime.performHour,
          );

          cy.get(FocusNotePage.evaluationMinute).clear();
          cy.get(FocusNotePage.evaluationMinute).type(
            fn[i].evaluationTime.performMinute,
          );
        }
      }

      if (!isEdit) submitFocusNote(true);
      else submitFocusNote();
    }
  });
}

export function submitFocusNote(isEdit = false) {
  cy.get(FocusNotePage.buttonSubmit).click();
  if (isEdit)
    cy.get(FocusNotePage.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(FocusNotePage.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(FocusNotePage.toastTitle).should('not.exist');
  cy.get(FocusNotePage.toast).should('not.be.visible');
}

export function editFocusNote(
  editItem = 0,
  myFixture = 'edit-focus-note.json',
) {
  cy.get(FocusNotePage.buttonEdit).eq(editItem).click();
  addFocusNote(true, myFixture);
}

export function viewFocusNote(myFixture = 'focus-note.json') {
  cy.fixture(myFixture).then((d) => {
    let fn = d.focusNote;
    let fnLength = fn.length - 1;
    let j = 0;
    let myDate = '';
    let arrayTime = [];
    let arrayLength = 0;
    let fnDate = [];
    let fnTime = '';

    for (let i = fnLength; i >= 0; i--) {
      cy.get(FocusNotePage.viewFocus).eq(j).should('have.text', fn[i].focus);
      cy.get(FocusNotePage.viewAssessment)
        .eq(j)
        .should('have.text', fn[i].assessment);
      if (fn[i].time.performTime != 'now') {
        myDate = fn[i].time.performDate;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        fnDate = arrayTime.join('/');
        fnTime = `${fnDate}, ${fn[i].time.performHour}:${fn[i].time.performMinute}`;
        cy.get(FocusNotePage.viewAssessmentTime)
          .eq(j)
          .should('have.text', fnTime);
      }

      cy.get(FocusNotePage.viewIntervention)
        .eq(j)
        .should('have.text', fn[i].intervention);
      if (fn[i].interventionTime.performTime != 'now') {
        myDate = fn[i].interventionTime.performDate;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        fnDate = arrayTime.join('/');
        fnTime = `${fnDate}, ${fn[i].interventionTime.performHour}:${fn[i].interventionTime.performMinute}`;
        cy.get(FocusNotePage.viewInterventionTime)
          .eq(j)
          .should('have.text', fnTime);
      }

      cy.get(FocusNotePage.viewEvaluation)
        .eq(j)
        .should('have.text', fn[i].evaluation);
      if (fn[i].evaluationTime.performTime != 'now') {
        myDate = fn[i].evaluationTime.performDate;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        fnDate = arrayTime.join('/');
        fnTime = `${fnDate}, ${fn[i].evaluationTime.performHour}:${fn[i].evaluationTime.performMinute}`;
        cy.get(FocusNotePage.viewEvaluationTime)
          .eq(j)
          .should('have.text', fnTime);
      }

      j++;
    }
  });
}
