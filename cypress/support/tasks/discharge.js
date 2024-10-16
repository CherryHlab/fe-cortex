/// <reference types="cypress" />
import { Patient_page } from '../locators';
import { Discharge_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function dischargeSummary() {
  cy.get(Patient_page.discharge_form).click();
  cy.fixture('discharge').then((data) => {
    let diagnosis = data.diagnosis
    cy.get(Discharge_page.diagnosis).eq(0).type(`${diagnosis.principle_diagnosis}`);
    cy.get(Discharge_page.option).first().click();

    for(let i=0; i < diagnosis.comorbid_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis).eq(1).type(`${diagnosis.comorbid_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }
    for(let i=0; i < diagnosis.complication_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis).eq(2).type(`${diagnosis.complication_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }
    for(let i=0; i < diagnosis.other_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis).eq(3).type(`${diagnosis.other_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }
    for(let i=0; i < diagnosis.external_cause_of_injury.length; i++) {
      cy.get(Discharge_page.diagnosis).eq(4).type(`${diagnosis.external_cause_of_injury[i]}`);
      cy.get(Discharge_page.option).first().click();
    }


    let discharge = data.discharge;
    cy.get(Discharge_page.discharge_status).contains(`${discharge.discharge_status}`).click();
    cy.get(Discharge_page.discharge_type).contains(`${discharge.discharge_type}`).click();
  });

  cy.get(Discharge_page.button_submit).click();
  cy.get(Discharge_page.toast_submit).first().should('have.text','บันทึกข้อมูลสำเร็จ');
  cy.get(Discharge_page.toast_submit).first().should('not.be.visible');
}
