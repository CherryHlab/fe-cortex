/// <reference types="cypress" />
import { Admission_page } from '../locators';
import { Patient_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateAdmissionNote() {
  cy.get(Patient_page.admission_note_form).click();
  cy.get(Admission_page.admission_note_header).should('be.visible');
}

export function navigateAdmissionNotePage() {
  cy.get(Patient_page.admission_note_page).click();
  cy.get(Patient_page.title).should('have.text', 'Admission Note');
}

export function addAdmissionNote(myFixture = 'admission-note-sit.json') {
  cy.fixture(myFixture).then((d) => {
    cy.get(Admission_page.chief_complaint).clear();
    cy.get(Admission_page.chief_complaint).type(d.chief_complaint);
    if (d.present_illness.length > 0) {
      cy.get(Admission_page.present_illness).clear();
      cy.get(Admission_page.present_illness).type(d.present_illness);
    }
    cy.get(Admission_page.initial_diagnosis).clear();
    cy.get(Admission_page.initial_diagnosis).type(d.initial_diagnosis);
    if (d.past_history.length > 0) {
      cy.get(Admission_page.past_history).clear();
      cy.get(Admission_page.past_history).type(d.past_history);
    }
    if (d.family_history.length > 0) {
      cy.get(Admission_page.family_history).clear();
      cy.get(Admission_page.family_history).type(d.family_history);
    }
    cy.get(Admission_page.initial_diagnosis).clear();
    cy.get(Admission_page.initial_diagnosis).type(d.initial_diagnosis);
    //Drug allergy
    if (d.drug_allergy.length > 0) {
      cy.get(Admission_page.history_of_drug_allergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      let drug_allergy = d.drug_allergy;
      cy.get(Admission_page.type_of_allergy).then((list) => {
        if (list.length > drug_allergy.length) {
          for (let i = 0; i < drug_allergy.length; i++) {
            cy.get(Admission_page.button_remove_more).last().click();
          }
        }
      });
      for (let i = 0; i < drug_allergy.length; i++) {
        cy.get(Admission_page.type_of_allergy)
          .eq(i)
          .type(drug_allergy[i].type_of_drug, { force: true });
        cy.get(Admission_page.option_of_selection).eq(0).click();
        cy.get(Admission_page.allergic)
          .eq(i)
          .type(drug_allergy[i].medication, { force: true });
        cy.get(Admission_page.option_of_selection).eq(0).click();
        cy.get(Admission_page.symptom).eq(i).clear();
        cy.get(Admission_page.symptom).eq(i).type(drug_allergy[i].symptom);
        if (i + 1 < drug_allergy.length)
          cy.get(Admission_page.button_add_more).click();
      }
    } else {
      cy.get(Admission_page.history_of_drug_allergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }

    if (d.other_allergy.length > 0) {
      cy.get(Admission_page.history_of_other_allergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      let other_allergy = d.other_allergy;
      cy.get(Admission_page.type_of_other_allergy).then((list) => {
        if (list.length > other_allergy.length) {
          for (let i = 0; i < other_allergy.length; i++) {
            cy.get(Admission_page.button_remove_other).last().click();
          }
        }
      });
      for (let i = 0; i < other_allergy.length; i++) {
        cy.get(Admission_page.type_of_other_allergy)
          .eq(i)
          .type(other_allergy[i].type_of_other, { force: true });
        cy.get(Admission_page.option_of_selection).eq(0).click();
        cy.get(Admission_page.other_allergic).eq(i).clear();
        cy.get(Admission_page.other_allergic)
          .eq(i)
          .type(other_allergy[i].other_thing);
        cy.get(Admission_page.other_symptom).eq(i).clear();
        cy.get(Admission_page.other_symptom)
          .eq(i)
          .type(other_allergy[i].other_symptom);
        if (i + 1 < other_allergy.length)
          cy.get(Admission_page.button_add_other).click();
      }
    } else {
      cy.get(Admission_page.history_of_other_allergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }
    if (d.physical_examination.length > 0) {
      cy.get(Admission_page.physical_exam).clear();
      cy.get(Admission_page.physical_exam).type(d.physical_examination);
    }
    if (d.template.length != 0) {
      cy.get(Admission_page.template_selection).clear({ force: true });
      cy.get(Admission_page.template_selection).click({ force: true });
      cy.get(Admission_page.template_selection).type(d.template, {
        force: true,
      });
      cy.get(Admission_page.option_of_selection).eq(0).click();

      cy.wait(3000); // can't use another that why i use wait with time. (ckEditor so slow to re-render)
      cy.get(Admission_page.template_input).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData);
        const ckEditorData = editor.getData();
        return cy.wrap(ckData).as('ckData');
      });
    }
    if (d.detail.length != 0) {
      cy.get(Admission_page.template_input).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData.concat(d.detail));
        const ckEditorData = editor.getData();
        return cy.wrap(ckEditorData).as('ckData');
      });
    }
  });
}

export function submitAdmissionNote(isEdit = false) {
  cy.get(Admission_page.button_submit).click();
  if (isEdit) {
    cy.get(Admission_page.toast_submit)
      .first()
      .should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  } else {
    cy.get(Admission_page.toast_submit)
      .first()
      .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  }
  cy.get(Admission_page.toast_submit).first().should('not.be.visible');
}

export function editAdmissionNote(myFixture = 'edit_admission-note.json') {
  cy.get(Admission_page.button_edit).click();
  addAdmissionNote(myFixture);
}

export function viewAdmissionNote(myFixture = 'admission-note-sit.json') {
  cy.fixture(myFixture).then((d) => {
    cy.get(Admission_page.view_admission_note)
      .eq(1)
      .should('have.text', d.chief_complaint);
    if (d.present_illness.length > 0)
      cy.get(Admission_page.view_admission_note)
        .eq(2)
        .should('have.text', d.present_illness);
    else
      cy.get(Admission_page.view_admission_note).eq(2).should('have.text', '-');
    cy.get(Admission_page.view_admission_note)
      .eq(3)
      .should('have.text', d.initial_diagnosis);
    if (d.past_history.length > 0)
      cy.get(Admission_page.view_admission_note)
        .eq(4)
        .should('have.text', d.past_history);
    else
      cy.get(Admission_page.view_admission_note).eq(4).should('have.text', '-');
    if (d.family_history.length > 0)
      cy.get(Admission_page.view_admission_note)
        .eq(5)
        .should('have.text', d.family_history);
    else
      cy.get(Admission_page.view_admission_note).eq(5).should('have.text', '-');

    let i = 0;
    let other_allergy = d.other_allergy;
    if (other_allergy.length > 0) {
      for (i; i < other_allergy.length; i++) {
        let display = Admission_page.view_allergy_display.replace(
          'needtoreplace',
          i,
        );
        cy.get(display).should('contain', other_allergy[i].type_of_other);
        let allergen = Admission_page.view_allergy_allergen.replace(
          'needtoreplace',
          i,
        );
        cy.get(allergen).should('contain', other_allergy[i].other_allergic);
        let reaction = Admission_page.view_allergy_reaction.replace(
          'needtoreplace',
          i,
        );
        cy.get(reaction).should('contain', other_allergy[i].other_symptom);
      }
    }
    let drug_allergy = d.drug_allergy;
    if (drug_allergy.length > 0) {
      for (i; i < drug_allergy.length; i++) {
        let display = Admission_page.view_allergy_display.replace(
          'needtoreplace',
          i,
        );
        cy.get(display).should('contain', drug_allergy[i].type_of_drug);
        let allergen = Admission_page.view_allergy_allergen.replace(
          'needtoreplace',
          i,
        );
        cy.get(allergen).should('contain', drug_allergy[i].medication);
        let reaction = Admission_page.view_allergy_reaction.replace(
          'needtoreplace',
          i,
        );
        cy.get(reaction).should('contain', drug_allergy[i].symptom);
      }
    }
    if (d.physical_examination.length > 0)
      cy.get(Admission_page.view_admission_note)
        .eq(7)
        .should('have.text', d.physical_examination);
    else
      cy.get(Admission_page.view_admission_note).eq(7).should('have.text', '-');
    cy.get('@ckData').then((data) => {
      cy.get(Admission_page.view_admission_note)
        .eq(8)
        .children()
        .should('have.html', data);
    });
  });
}
