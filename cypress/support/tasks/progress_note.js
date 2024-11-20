/// <reference types="cypress" />
import { Progress_note_page } from '../locators';
import { Patient_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateProgressNote() {
  cy.get(Patient_page.progress_note_form).click();
  cy.get(Progress_note_page.progress_note_header).should('be.visible');
}

export function navigateProgressNotePage() {
  cy.get(Patient_page.progress_note_page).click();
  cy.get(Patient_page.title).should('have.text', 'Progress Note');
}

export function addProgressNote(
  isEdit = false,
  myFixture = 'progress-note.json',
) {
  cy.fixture(myFixture).then((d) => {
    let pn = d.progress_note;
    for (let i = 0; i < pn.length; i++) {
      if (!isEdit) navigateProgressNote();

      if (pn[i].time.perform_time == 'now') {
        cy.get(Progress_note_page.button_today).click();
      } else {
        cy.get(Progress_note_page.perform_date).clear();
        cy.get(Progress_note_page.perform_date).type(pn[i].time.perform_date);

        cy.get(Progress_note_page.perform_hour).clear();
        cy.get(Progress_note_page.perform_hour).type(pn[i].time.perform_hour);

        cy.get(Progress_note_page.perform_minute).clear();
        cy.get(Progress_note_page.perform_minute).type(
          pn[i].time.perform_minute,
        );
      }

      cy.get(Progress_note_page.subjective).clear();
      cy.get(Progress_note_page.subjective).type(pn[i].subjective);

      cy.get(Progress_note_page.objective).clear();
      cy.get(Progress_note_page.objective).type(pn[i].objective);

      cy.get(Progress_note_page.assessment).clear();
      cy.get(Progress_note_page.assessment).type(pn[i].assessment);

      cy.get(Progress_note_page.plan).clear();
      cy.get(Progress_note_page.plan).type(pn[i].plan);

      if (!isEdit) submitProgressNote(true);
      else submitProgressNote();
    }
  });
}

export function submitProgressNote(isEdit = false) {
  cy.get(Progress_note_page.button_submit).click();
  if (isEdit)
    cy.get(Progress_note_page.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else
    cy.get(Progress_note_page.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(Progress_note_page.toast).should('not.be.visible');
}

export function editProgressNote(
  editItem = 0,
  myFixture = 'edit_progress-note.json',
) {
  cy.get(Progress_note_page.button_edit).eq(editItem).click();
  addProgressNote(true, myFixture);
}

export function viewProgressNote(myFixture = 'progress-note.json') {
  cy.fixture(myFixture).then((d) => {
    let pn = d.progress_note;
    let pnLength = pn.length - 1;
    let j = 0;
    for (let i = pnLength; i >= 0; i--) {
      if (pn[i].time.perform_time != 'now') {
        let myDate = pn[i].time.perform_date;
        const arrayTime = myDate.split('/');
        const arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        let pnDate = arrayTime.join('/');
        let pnTime = `${pnDate}, ${pn[i].time.perform_hour}:${pn[i].time.perform_minute}`;
        cy.get(Progress_note_page.view_perform_time)
          .eq(j)
          .should('have.text', pnTime);
      }
      cy.get(Progress_note_page.view_subjective)
        .eq(j)
        .should('have.text', pn[i].subjective);
      cy.get(Progress_note_page.view_objective)
        .eq(j)
        .should('have.text', pn[i].objective);
      cy.get(Progress_note_page.view_assessment)
        .eq(j)
        .should('have.text', pn[i].assessment);
      cy.get(Progress_note_page.view_plan)
        .eq(j)
        .should('have.text', pn[i].plan);
      j++;
    }
  });
}
