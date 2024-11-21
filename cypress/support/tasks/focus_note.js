/// <reference types="cypress" />
import { Focus_note_page } from '../locators';
import { Patient_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateFocusNote() {
  cy.get(Patient_page.focus_note_form).click();
  cy.get(Focus_note_page.focus_note_header).should('be.visible');
}

export function navigateFocusNotePage() {
  cy.get(Patient_page.focus_note_page).click();
  cy.get(Patient_page.title).should('have.text', 'Focus Note');
}

export function addFocusNote(isEdit = false, myFixture = 'focus-note.json') {
  cy.fixture(myFixture).then((d) => {
    let fn = d.focus_note;
    for (let i = 0; i < fn.length; i++) {
      if (!isEdit) navigateFocusNote();

      cy.get(Focus_note_page.focus).clear();
      cy.get(Focus_note_page.focus).type(fn[i].focus);

      cy.get(Focus_note_page.assessment).clear();
      cy.get(Focus_note_page.assessment).type(fn[i].assessment);

      if (fn[i].time.perform_time == 'now') {
        cy.get(Focus_note_page.button_today).click();
      } else {
        cy.get(Focus_note_page.perform_date).clear();
        cy.get(Focus_note_page.perform_date).type(fn[i].time.perform_date);

        cy.get(Focus_note_page.perform_hour).clear();
        cy.get(Focus_note_page.perform_hour).type(fn[i].time.perform_hour);

        cy.get(Focus_note_page.perform_minute).clear();
        cy.get(Focus_note_page.perform_minute).type(fn[i].time.perform_minute);
      }

      if (fn[i].intervention) {
        cy.get(Focus_note_page.intervention).clear();
        cy.get(Focus_note_page.intervention).type(fn[i].intervention);

        if (fn[i].intervention_time.perform_time == 'now') {
          cy.get(Focus_note_page.button_intervention_today).click();
        } else {
          cy.get(Focus_note_page.intervention_date).clear();
          cy.get(Focus_note_page.intervention_date).type(
            fn[i].intervention_time.perform_date,
          );

          cy.get(Focus_note_page.intervention_hour).clear();
          cy.get(Focus_note_page.intervention_hour).type(
            fn[i].intervention_time.perform_hour,
          );

          cy.get(Focus_note_page.intervention_minute).clear();
          cy.get(Focus_note_page.intervention_minute).type(
            fn[i].intervention_time.perform_minute,
          );
        }
      }

      if (fn[i].evaluation) {
        cy.get(Focus_note_page.evaluation).clear();
        cy.get(Focus_note_page.evaluation).type(fn[i].evaluation);

        if (fn[i].evaluation_time.perform_time == 'now') {
          cy.get(Focus_note_page.button_evaluation_today).click();
        } else {
          cy.get(Focus_note_page.evaluation_date).clear();
          cy.get(Focus_note_page.evaluation_date).type(
            fn[i].evaluation_time.perform_date,
          );

          cy.get(Focus_note_page.evaluation_hour).clear();
          cy.get(Focus_note_page.evaluation_hour).type(
            fn[i].evaluation_time.perform_hour,
          );

          cy.get(Focus_note_page.evaluation_minute).clear();
          cy.get(Focus_note_page.evaluation_minute).type(
            fn[i].evaluation_time.perform_minute,
          );
        }
      }

      if (!isEdit) submitFocusNote(true);
      else submitFocusNote();
    }
  });
}

export function submitFocusNote(isEdit = false) {
  cy.get(Focus_note_page.button_submit).click();
  if (isEdit)
    cy.get(Focus_note_page.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(Focus_note_page.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(Focus_note_page.toast).should('not.be.visible');
}

export function editFocusNote(
  editItem = 0,
  myFixture = 'edit_focus-note.json',
) {
  cy.get(Focus_note_page.button_edit).eq(editItem).click();
  addFocusNote(true, myFixture);
}

export function viewFocusNote(myFixture = 'focus-note.json') {
  cy.fixture(myFixture).then((d) => {
    let fn = d.focus_note;
    let fnLength = fn.length - 1;
    let j = 0;
    let myDate = '';
    let arrayTime = [];
    let arrayLength = 0;
    let fnDate = [];
    let fnTime = '';

    for (let i = fnLength; i >= 0; i--) {
      cy.get(Focus_note_page.view_focus).eq(j).should('have.text', fn[i].focus);
      cy.get(Focus_note_page.view_assessment)
        .eq(j)
        .should('have.text', fn[i].assessment);
      if (fn[i].time.perform_time != 'now') {
        myDate = fn[i].time.perform_date;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        fnDate = arrayTime.join('/');
        fnTime = `${fnDate}, ${fn[i].time.perform_hour}:${fn[i].time.perform_minute}`;
        cy.get(Focus_note_page.view_assessment_time)
          .eq(j)
          .should('have.text', fnTime);
      }

      cy.get(Focus_note_page.view_intervention)
        .eq(j)
        .should('have.text', fn[i].intervention);
      if (fn[i].intervention_time.perform_time != 'now') {
        myDate = fn[i].intervention_time.perform_date;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        fnDate = arrayTime.join('/');
        fnTime = `${fnDate}, ${fn[i].intervention_time.perform_hour}:${fn[i].intervention_time.perform_minute}`;
        cy.get(Focus_note_page.view_intervention_time)
          .eq(j)
          .should('have.text', fnTime);
      }

      cy.get(Focus_note_page.view_evaluation)
        .eq(j)
        .should('have.text', fn[i].evaluation);
      if (fn[i].evaluation_time.perform_time != 'now') {
        myDate = fn[i].evaluation_time.perform_date;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        fnDate = arrayTime.join('/');
        fnTime = `${fnDate}, ${fn[i].evaluation_time.perform_hour}:${fn[i].evaluation_time.perform_minute}`;
        cy.get(Focus_note_page.view_evaluation_time)
          .eq(j)
          .should('have.text', fnTime);
      }

      j++;
    }
  });
}
