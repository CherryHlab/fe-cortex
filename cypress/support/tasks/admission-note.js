/// <reference types="cypress" />
import { AdmissionPage } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateAdmissionNote() {
  cy.get(PatientPage.admissionNoteForm).click();
  cy.get(AdmissionPage.admissionNoteHeader).should('be.visible');
}

export function navigateAdmissionNotePage() {
  cy.get(PatientPage.admissionNotePage).click();
  cy.get(PatientPage.title).should('have.text', 'Admission Note');
}

export function addAdmissionNote(myFixture = 'admission-note-sit.json') {
  cy.fixture(myFixture).then((d) => {
    cy.get(AdmissionPage.chiefComplaint).clear();
    cy.get(AdmissionPage.chiefComplaint).type(d.chiefComplaint);
    if (d.presentIllness.length > 0) {
      cy.get(AdmissionPage.presentIllness).clear();
      cy.get(AdmissionPage.presentIllness).type(d.presentIllness);
    }
    cy.get(AdmissionPage.initialDiagnosis).clear();
    cy.get(AdmissionPage.initialDiagnosis).type(d.initialDiagnosis);
    if (d.pastHistory.length > 0) {
      cy.get(AdmissionPage.pastHistory).clear();
      cy.get(AdmissionPage.pastHistory).type(d.pastHistory);
    }
    if (d.familyHistory.length > 0) {
      cy.get(AdmissionPage.familyHistory).clear();
      cy.get(AdmissionPage.familyHistory).type(d.familyHistory);
    }
    cy.get(AdmissionPage.initialDiagnosis).clear();
    cy.get(AdmissionPage.initialDiagnosis).type(d.initialDiagnosis);
    //Drug allergy
    if (d.drugAllergy.length > 0) {
      cy.get(AdmissionPage.historyOfDrugAllergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      let drugAllergy = d.drugAllergy;
      cy.get(AdmissionPage.typeOfAllergy).then((list) => {
        if (list.length > drugAllergy.length) {
          for (let i = 0; i < drugAllergy.length; i++) {
            cy.get(AdmissionPage.buttonRemoveMore).last().click();
          }
        }
      });
      for (let i = 0; i < drugAllergy.length; i++) {
        cy.get(AdmissionPage.typeOfAllergy)
          .eq(i)
          .type(drugAllergy[i].typeOfDrug, { force: true });
        cy.get(AdmissionPage.optionOfSelection).eq(0).click();
        cy.get(AdmissionPage.allergic)
          .eq(i)
          .type(drugAllergy[i].medication, { force: true });
        cy.get(AdmissionPage.optionOfSelection).eq(0).click();
        cy.get(AdmissionPage.symptom).eq(i).clear();
        cy.get(AdmissionPage.symptom).eq(i).type(drugAllergy[i].symptom);
        if (i + 1 < drugAllergy.length)
          cy.get(AdmissionPage.buttonAddMore).click();
      }
    } else {
      cy.get(AdmissionPage.historyOfDrugAllergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }

    if (d.otherAllergy.length > 0) {
      cy.get(AdmissionPage.historyOfOtherAllergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      let otherAllergy = d.otherAllergy;
      cy.get(AdmissionPage.typeOfOtherAllergy).then((list) => {
        if (list.length > otherAllergy.length) {
          for (let i = 0; i < otherAllergy.length; i++) {
            cy.get(AdmissionPage.buttonRemoveOther).last().click();
          }
        }
      });
      for (let i = 0; i < otherAllergy.length; i++) {
        cy.get(AdmissionPage.typeOfOtherAllergy)
          .eq(i)
          .type(otherAllergy[i].typeOfOther, { force: true });
        cy.get(AdmissionPage.optionOfSelection).eq(0).click();
        cy.get(AdmissionPage.otherAllergic).eq(i).clear();
        cy.get(AdmissionPage.otherAllergic)
          .eq(i)
          .type(otherAllergy[i].otherThing);
        cy.get(AdmissionPage.otherSymptom).eq(i).clear();
        cy.get(AdmissionPage.otherSymptom)
          .eq(i)
          .type(otherAllergy[i].otherSymptom);
        if (i + 1 < otherAllergy.length)
          cy.get(AdmissionPage.buttonAddOther).click();
      }
    } else {
      cy.get(AdmissionPage.historyOfOtherAllergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }
    if (d.physicalExamination.length > 0) {
      cy.get(AdmissionPage.physicalExam).clear();
      cy.get(AdmissionPage.physicalExam).type(d.physicalExamination);
    }
    if (d.template.length != 0) {
      cy.get(AdmissionPage.templateSelection).clear({ force: true });
      cy.get(AdmissionPage.templateSelection).click({ force: true });
      cy.get(AdmissionPage.templateSelection).type(d.template, {
        force: true,
      });
      cy.get(AdmissionPage.optionOfSelection).eq(0).click();

      cy.wait(3000); // can't use another that why i use wait with time. (ckEditor so slow to re-render)
      cy.get(AdmissionPage.templateInput).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData);
        const ckEditorData = editor.getData();
        return cy.wrap(ckData).as('ckData');
      });
    }
    if (d.detail.length != 0) {
      cy.get(AdmissionPage.templateInput).then((el) => {
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
  cy.get(AdmissionPage.buttonSubmit).click();
  if (isEdit) {
    cy.get(AdmissionPage.toastSubmit)
      .first()
      .should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  } else {
    cy.get(AdmissionPage.toastSubmit)
      .first()
      .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  }
  cy.get(AdmissionPage.toastSubmit).first().should('not.be.visible');
}

export function editAdmissionNote(myFixture = 'edit-admission-note.json') {
  cy.get(AdmissionPage.buttonEdit).click();
  addAdmissionNote(myFixture);
}

export function viewAdmissionNote(myFixture = 'admission-note-sit.json') {
  cy.fixture(myFixture).then((d) => {
    cy.get(AdmissionPage.viewAdmissionNote)
      .eq(1)
      .should('have.text', d.chiefComplaint);
    if (d.presentIllness.length > 0)
      cy.get(AdmissionPage.viewAdmissionNote)
        .eq(2)
        .should('have.text', d.presentIllness);
    else cy.get(AdmissionPage.viewAdmissionNote).eq(2).should('have.text', '-');
    cy.get(AdmissionPage.viewAdmissionNote)
      .eq(3)
      .should('have.text', d.initialDiagnosis);
    if (d.pastHistory.length > 0)
      cy.get(AdmissionPage.viewAdmissionNote)
        .eq(4)
        .should('have.text', d.pastHistory);
    else cy.get(AdmissionPage.viewAdmissionNote).eq(4).should('have.text', '-');
    if (d.familyHistory.length > 0)
      cy.get(AdmissionPage.viewAdmissionNote)
        .eq(5)
        .should('have.text', d.familyHistory);
    else cy.get(AdmissionPage.viewAdmissionNote).eq(5).should('have.text', '-');

    let i = 0;
    let otherAllergy = d.otherAllergy;
    if (otherAllergy.length > 0) {
      for (i; i < otherAllergy.length; i++) {
        let display = AdmissionPage.viewAllergyDisplay.replace(
          'needtoreplace',
          i,
        );
        cy.get(display).should('contain', otherAllergy[i].typeOfOther);
        let allergen = AdmissionPage.viewAllergyAllergen.replace(
          'needtoreplace',
          i,
        );
        cy.get(allergen).should('contain', otherAllergy[i].otherAllergic);
        let reaction = AdmissionPage.viewAllergyReaction.replace(
          'needtoreplace',
          i,
        );
        cy.get(reaction).should('contain', otherAllergy[i].otherSymptom);
      }
    }
    let drugAllergy = d.drugAllergy;
    if (drugAllergy.length > 0) {
      for (i; i < drugAllergy.length; i++) {
        let display = AdmissionPage.viewAllergyDisplay.replace(
          'needtoreplace',
          i,
        );
        cy.get(display).should('contain', drugAllergy[i].typeOfDrug);
        let allergen = AdmissionPage.viewAllergyAllergen.replace(
          'needtoreplace',
          i,
        );
        cy.get(allergen).should('contain', drugAllergy[i].medication);
        let reaction = AdmissionPage.viewAllergyReaction.replace(
          'needtoreplace',
          i,
        );
        cy.get(reaction).should('contain', drugAllergy[i].symptom);
      }
    }
    if (d.physicalExamination.length > 0)
      cy.get(AdmissionPage.viewAdmissionNote)
        .eq(7)
        .should('have.text', d.physicalExamination);
    else cy.get(AdmissionPage.viewAdmissionNote).eq(7).should('have.text', '-');
    cy.get('@ckData').then((data) => {
      cy.get(AdmissionPage.viewAdmissionNote)
        .eq(8)
        .children()
        .should('have.html', data);
    });
  });
}
