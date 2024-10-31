/// <reference types="cypress" />
import { Admission_page } from '../locators';
import { Patient_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateAdmissionNote() {
  cy.get(Patient_page.admission_note_form).click();
  cy.get(Admission_page.admission_note_header).should('be.visible');
}

export function addAdmissionNote(myFixture = 'admission-note.json') {
  cy.fixture(myFixture).then((d) => {
    cy.get(Admission_page.chief_complaint).type(d.chief_complaint);
    cy.get(Admission_page.present_illness).type(d.present_illness);
    cy.get(Admission_page.initial_diagnosis).type(d.initial_diagnosis);
    cy.get(Admission_page.past_history).type(d.past_history);
    cy.get(Admission_page.family_history).type(d.family_history);
    cy.get(Admission_page.initial_diagnosis).type(d.initial_diagnosis);
    //Drug allergy
    if (d.drug_allergy.length > 0) {
      cy.get(Admission_page.history_of_drug_allergy).eq(1).click();
      let drug_allergy = d.drug_allergy;
      for (let i = 0; i < drug_allergy.length; i++) {
        cy.get(Admission_page.type_of_allergy).eq(i).clear({ force: true });
        cy.get(Admission_page.type_of_allergy)
          .eq(i)
          .type(drug_allergy[i].type_of_drug, { force: true });
        cy.get(Admission_page.option_of_selection).eq(0).click();
        cy.get(Admission_page.allergic).eq(i).type(drug_allergy[i].medication);
        cy.get(Admission_page.option_of_selection).eq(0).click();
        cy.get(Admission_page.symptom).eq(i).type(drug_allergy[i].symptom);
        if (i + 1 < drug_allergy.length)
          cy.get(Admission_page.button_add_more).click();
      }
    } else {
      cy.get(Admission_page.history_of_drug_allergy).eq(0).click();
    }

    if (d.other_allergy.length > 0) {
      cy.get(Admission_page.history_of_other_allergy).eq(1).click();
      let other_allergy = d.other_allergy;
      for (let i = 0; i < other_allergy.length; i++) {
        cy.get(Admission_page.type_of_other_allergy)
          .eq(i)
          .clear({ force: true });
        cy.get(Admission_page.type_of_other_allergy)
          .eq(i)
          .type(other_allergy[i].type_of_other, { force: true });
        cy.get(Admission_page.option_of_selection).eq(0).click();
        cy.get(Admission_page.other_allergic)
          .eq(i)
          .type(other_allergy[i].other_thing);
        cy.get(Admission_page.other_symptom)
          .eq(i)
          .type(other_allergy[i].other_symptom);
        if (i + 1 < other_allergy.length)
          cy.get(Admission_page.button_add_other).click();
      }
    } else {
      cy.get(Admission_page.history_of_other_allergy).eq(0).click();
    }
    cy.get(Admission_page.physical_exam).type(d.physical_examination);
    if (d.template.length != 0) {
      cy.get(Admission_page.template_selection).type(d.template);
      cy.get(Admission_page.option_of_selection).eq(0).click();
    }
    if (d.detail.length != 0) {
      // Use for CKEditor but it done before choose template
      cy.get(Admission_page.template_input).then((el) => {
        const editor = el[0].ckeditorInstance;
        editor.setData(d.detail);
      });
    }
  });
}

export function submitAdmissionNote() {
  cy.get(Admission_page.button_submit).click();
  cy.get(Admission_page.toast_submit)
    .first()
    .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  cy.get(Admission_page.toast_submit).first().should('not.be.visible');
}
