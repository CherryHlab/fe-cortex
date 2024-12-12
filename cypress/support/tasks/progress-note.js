/// <reference types="cypress" />
import { ProgressNotePage } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateProgressNote() {
  cy.get(PatientPage.progressNoteForm).click();
  cy.get(ProgressNotePage.progressNoteHeader).should('be.visible');
}

export function navigateProgressNotePage() {
  cy.get(PatientPage.progressNotePage).click();
  cy.get(PatientPage.title).should('have.text', 'Progress Note');
}

export function addProgressNote(
  isEdit = false,
  myFixture = 'progress-note.json',
) {
  cy.fixture(myFixture).then((d) => {
    let pn = d.progressNote;
    for (let i = 0; i < pn.length; i++) {
      if (!isEdit) navigateProgressNote();

      if (pn[i].time.performTime == 'now') {
        cy.get(ProgressNotePage.buttonToday).click();
      } else {
        cy.get(ProgressNotePage.performDate).clear();
        cy.get(ProgressNotePage.performDate).type(pn[i].time.performDate);

        cy.get(ProgressNotePage.performHour).clear();
        cy.get(ProgressNotePage.performHour).type(pn[i].time.performHour);

        cy.get(ProgressNotePage.performMinute).clear();
        cy.get(ProgressNotePage.performMinute).type(pn[i].time.performMinute);
      }

      cy.get(ProgressNotePage.subjective).clear();
      cy.get(ProgressNotePage.subjective).type(pn[i].subjective);

      cy.get(ProgressNotePage.objective).clear();
      cy.get(ProgressNotePage.objective).type(pn[i].objective);

      cy.get(ProgressNotePage.assessment).clear();
      cy.get(ProgressNotePage.assessment).type(pn[i].assessment);

      cy.get(ProgressNotePage.plan).clear();
      cy.get(ProgressNotePage.plan).type(pn[i].plan);

      if (!isEdit) submitProgressNote(true);
      else submitProgressNote();
    }
  });
}

export function submitProgressNote(isEdit = false) {
  cy.get(ProgressNotePage.buttonSubmit).click();
  if (isEdit)
    cy.get(ProgressNotePage.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(ProgressNotePage.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(ProgressNotePage.toast).should('not.be.visible');
}

export function editProgressNote(
  editItem = 0,
  myFixture = 'edit-progress-note.json',
) {
  cy.get(ProgressNotePage.buttonEdit).eq(editItem).click();
  addProgressNote(true, myFixture);
}

export function viewProgressNote(myFixture = 'progress-note.json') {
  cy.fixture(myFixture).then((d) => {
    let pn = d.progressNote;
    let pnLength = pn.length - 1;
    let j = 0;
    for (let i = pnLength; i >= 0; i--) {
      if (pn[i].time.performTime != 'now') {
        let myDate = pn[i].time.performDate;
        const arrayTime = myDate.split('/');
        const arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        let pnDate = arrayTime.join('/');
        let pnTime = `${pnDate}, ${pn[i].time.performHour}:${pn[i].time.performMinute}`;
        cy.get(ProgressNotePage.viewPerformTime)
          .eq(j)
          .should('have.text', pnTime);
      }
      cy.get(ProgressNotePage.viewSubjective)
        .eq(j)
        .should('have.text', pn[i].subjective);
      cy.get(ProgressNotePage.viewObjective)
        .eq(j)
        .should('have.text', pn[i].objective);
      cy.get(ProgressNotePage.viewAssessment)
        .eq(j)
        .should('have.text', pn[i].assessment);
      cy.get(ProgressNotePage.viewPlan).eq(j).should('have.text', pn[i].plan);
      j++;
    }
  });
}
