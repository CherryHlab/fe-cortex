/// <reference types="cypress" />
import { BedListPage } from '../locators';
import { PatientPage } from '../locators';

export function navigatePatientPage() {
  cy.get('@bedLabel').then((bedLabel) => {
    cy.get(BedListPage.bedListLabel).contains(bedLabel).click();
    cy.url().should('include', 'ipd/patient');
  });
}

export function navigateDischargeSummary() {
  cy.get(PatientPage.dischargeSummary).click();
  cy.get(PatientPage.title).should('have.html', 'Discharge Summary');
}

export function submitForm(notNurse = true) {
  if (notNurse) {
    cy.get(PatientPage.patientOutletForm)
      .children()
      .children()
      .children()
      .should('have.length', 3);
    cy.get(PatientPage.buttonSubmit).click();
    cy.get(PatientPage.toast).should(
      'contain',
      'Submit ข้อมูล discharge summary สำเร็จ',
    );
    cy.get(PatientPage.chipLabel).should('contain', 'Submitted');
  } else {
    cy.get(PatientPage.patientOutletForm)
      .children()
      .children()
      .children()
      .should('have.length', 2);
  }
}
