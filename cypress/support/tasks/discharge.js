/// <reference types="cypress" />
import { Patient_page } from '../locators';
import { Discharge_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

function randomDateNumber(min = 1, max = 30) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function dischargeSummary() {
  cy.get(Patient_page.discharge_form).click();
  cy.fixture('discharge').then((data) => {
    let diagnosis = data.diagnosis;
    cy.get(Discharge_page.diagnosis)
      .eq(0)
      .type(`${diagnosis.principle_diagnosis}`);
    cy.get(Discharge_page.option).first().click();

    for (let i = 0; i < diagnosis.comorbid_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(1)
        .type(`${diagnosis.comorbid_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }
    for (let i = 0; i < diagnosis.complication_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(2)
        .type(`${diagnosis.complication_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }
    for (let i = 0; i < diagnosis.other_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(3)
        .type(`${diagnosis.other_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }
    for (let i = 0; i < diagnosis.external_cause_of_injury.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(4)
        .type(`${diagnosis.external_cause_of_injury[i]}`);
      cy.get(Discharge_page.option).first().click();
    }

    let discharge = data.discharge;
    cy.get(Discharge_page.discharge_status)
      .contains(`${discharge.discharge_status}`)
      .click();
    cy.get(Discharge_page.discharge_type)
      .contains(`${discharge.discharge_type}`)
      .click();
  });
  cy.get(Discharge_page.button_submit).click();
  cy.get(Discharge_page.toast_submit)
    .first()
    .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  cy.get(Discharge_page.toast_submit).first().should('not.be.visible');
}

export function editDischarge(notNurseOrNotAdd = true, addDischarge = true) {
  if (addDischarge) cy.get(Patient_page.discharge_form).click();
  else cy.get(Discharge_page.button_edit).click();
  cy.fixture('edit_discharge').then((data) => {
    let diagnosis = data.diagnosis;
    cy.get(Discharge_page.diagnosis)
      .eq(0)
      .type(`${diagnosis.principle_diagnosis}`);
    cy.get(Discharge_page.option).first().click();

    cy.get(Discharge_page.diagnosis).eq(1).clear();
    for (let i = 0; i < diagnosis.comorbid_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(1)
        .type(`${diagnosis.comorbid_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }

    cy.get(Discharge_page.diagnosis).eq(2).clear();
    for (let i = 0; i < diagnosis.complication_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(2)
        .type(`${diagnosis.complication_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }

    cy.get(Discharge_page.diagnosis).eq(3).clear();
    for (let i = 0; i < diagnosis.other_diagnosis.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(3)
        .type(`${diagnosis.other_diagnosis[i]}`);
      cy.get(Discharge_page.option).first().click();
    }

    cy.get(Discharge_page.diagnosis).eq(4).clear();
    for (let i = 0; i < diagnosis.external_cause_of_injury.length; i++) {
      cy.get(Discharge_page.diagnosis)
        .eq(4)
        .type(`${diagnosis.external_cause_of_injury[i]}`);
      cy.get(Discharge_page.option).first().click();
    }

    let operation = data.operation.operating_room_procedure;
    let or_proceduceEq = 0;
    for (let i = 0; i < operation.length; i++) {
      cy.get(Discharge_page.or_proceduce)
        .eq(or_proceduceEq)
        .type(operation[i].or_procedure);
      cy.get(Discharge_page.option).first().click();
      or_proceduceEq++;
      let surgeon_name = operation[i].surgeon_name.split(' ')[0];
      cy.get(Discharge_page.or_proceduce).eq(or_proceduceEq).type(surgeon_name);
      cy.get(Discharge_page.option).first().click();
      or_proceduceEq++;
      let date_in = Discharge_page.date_in.replace('needtoreplace', i);
      cy.get(date_in).click();
      let randomNumber = randomDateNumber();
      cy.get(Discharge_page.option).contains(randomNumber).click();
      let date_out = Discharge_page.date_out.replace('needtoreplace', i);
      cy.get(date_out).click();
      cy.get(Discharge_page.option)
        .contains(randomDateNumber(randomNumber))
        .click();

      cy.get(Discharge_page.or_proceduce)
        .eq(or_proceduceEq)
        .type(operation[i].equipment);
      cy.get(Discharge_page.option).first().click();
      or_proceduceEq++;
      cy.get(Discharge_page.or_proceduce)
        .eq(or_proceduceEq)
        .type(operation[i].bodysite);
      cy.get(Discharge_page.option).first().click();
      or_proceduceEq++;
    }

    let non_operating = data.operation.non_operating_room_procedure;

    for (let i = 0; i < non_operating.input_type.length; i++) {
      cy.get(Discharge_page.non_operating_input)
        .parent()
        .click()
        .type(non_operating.input_type[i]);
      cy.get(Discharge_page.option).first().click();
    }
    for (let i = 0; i < non_operating.suggestion.length; i++) {
      let suggestionItem = Discharge_page.non_operating_room_procedure.replace(
        'needtoreplace',
        non_operating.suggestion[i],
      );
      cy.get(suggestionItem).click();
    }
    for (let i = 0; i < non_operating.other.length; i++) {
      let suggestion_item = Discharge_page.non_operating_room_procedure.replace(
        'needtoreplace',
        non_operating.other[i].suggestion,
      );
      cy.get(suggestion_item).click();
      let other_detail = Discharge_page.other_detail.replace(
        'needtoreplace',
        non_operating.other[i].suggestion,
      );
      let detail = non_operating.other[i].detail;
      cy.get(other_detail).type(detail);
      cy.get(Discharge_page.button_modal).click();
    }

    let discharge = data.discharge;
    cy.get(Discharge_page.discharge_status)
      .contains(`${discharge.discharge_status}`)
      .click();
    cy.get(Discharge_page.discharge_type)
      .contains(`${discharge.discharge_type}`)
      .click();
  });
  if (notNurseOrNotAdd) cy.get(Discharge_page.button_submit).eq(1).click();
  else cy.get(Discharge_page.button_submit).click();
  cy.get(Discharge_page.toast_submit)
    .first()
    .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  cy.get(Discharge_page.toast_submit).first().should('not.be.visible');
}

export function viewDischarge() {
  cy.log('viewDischarge function');
}
