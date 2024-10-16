/// <reference types="cypress" />
import { Bed_list_page } from '../locators';
import { Patient_page } from '../locators';

export function navigatePatientPage() {
  cy.get('@bed_label').then((bed_label) => {
    cy.get(Bed_list_page.bed_list_label).contains(bed_label).click();
    cy.url().should('include','ipd/patient');
  });
}

export function navigateDischargeSummary() {
  cy.get(Patient_page.discharge_summary).click();
  cy.get(Patient_page.title).should('have.html','Discharge Summary');
}

export function submit_form(notNurse = true) {
  if (notNurse) {
    cy.get(Patient_page.button_submit).click();
    cy.get(Patient_page.toast).should('contain','Submit ข้อมูล discharge summary สำเร็จ');
    cy.get(Patient_page.chip_label).should('contain','Submitted');
  } else {
    cy.get(Patient_page.button_submit).should('be.visible');
  }
}
