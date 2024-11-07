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
      cy.get(Discharge_page.option).contains(Number(randomNumber)).click();
      cy.get(date_in).then(($value) => {
        let date_in_text = $value.find('input').val();
        return cy.wrap(date_in_text).as('date_in');
      });
      let date_out = Discharge_page.date_out.replace('needtoreplace', i);
      cy.get(date_out).click();
      cy.get(Discharge_page.option)
        .contains(randomDateNumber(randomNumber))
        .click();
      cy.get(date_out).then(($value) => {
        let date_out_text = $value.find('input').val();
        return cy.wrap(date_out_text).as('date_out');
      });

      cy.get(Discharge_page.or_proceduce)
        .eq(or_proceduceEq)
        .type(operation[i].equipment);
      cy.get(Discharge_page.option_add).first().click();
      or_proceduceEq++;
      cy.get(Discharge_page.or_proceduce)
        .eq(or_proceduceEq)
        .type(operation[i].bodysite);
      cy.get(Discharge_page.option_add).first().click();
      or_proceduceEq++;
    }

    let non_operating = data.operation.non_operating_room_procedure;

    for (let i = 0; i < non_operating.input_type.length; i++) {
      cy.get(Discharge_page.non_operating_input)
        .parent()
        .click()
        .type(non_operating.input_type[i]);
      cy.get(Discharge_page.option_add).first().click();
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

export function viewDischarge(form = 'edit_discharge.json') {
  cy.fixture(form).then((d) => {
    let diagnosis = d.diagnosis;
    let principal = diagnosis.principle_diagnosis;
    cy.get(Discharge_page.principal)
      .children()
      .last()
      .should('have.text', principal);
    let comorbid = diagnosis.comorbid_diagnosis;
    for (let i = 0; i < comorbid.length; i++) {
      cy.get(Discharge_page.comorbid)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', comorbid[i]);
    }
    let complication = diagnosis.complication_diagnosis;
    for (let i = 0; i < complication.length; i++) {
      cy.get(Discharge_page.complication)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', complication[i]);
    }
    let other = diagnosis.other_diagnosis;
    for (let i = 0; i < other.length; i++) {
      cy.get(Discharge_page.other)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', other[i]);
    }
    let external = diagnosis.external_cause_of_injury;
    for (let i = 0; i < external.length; i++) {
      cy.get(Discharge_page.external)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', external[i]);
    }

    let operating = d.operation.operating_room_procedure;
    for (let i = 0; i < operating.length; i++) {
      cy.get(Discharge_page.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', operating[i].or_procedure);
      cy.get(Discharge_page.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', operating[i].surgeon_name);
      cy.get(Discharge_page.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', `Equipment: ${operating[i].equipment}`);
      cy.get(Discharge_page.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', `Bodysite: ${operating[i].bodysite}`);
    }

    let non_operating_data = d.operation.non_operating_room_procedure;
    let non_operating_buffer = non_operating_data.input_type.concat(
      non_operating_data.suggestion,
    );
    let other_non_operating_buffer = [];
    let other_non_operating = non_operating_data.other;
    for (let i = 0; i < other_non_operating.length; i++) {
      other_non_operating_buffer.push(
        other_non_operating[i].suggestion.concat(
          ' ',
          `${other_non_operating[i].detail}`,
        ),
      );
    }
    let non_operating = non_operating_buffer.concat(other_non_operating_buffer);
    for (let i = 0; i < non_operating.length; i++) {
      cy.get(Discharge_page.non_operation)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', `${non_operating[i]}`);
    }

    let discharge = d.discharge;
    if (discharge.discharge_status.length != 0)
      cy.get(Discharge_page.status_of_discharge)
        .children()
        .last()
        .should('have.text', discharge.discharge_status);
    if (discharge.cause_of_dead.length != 0)
      cy.get(Discharge_page.cause_of_dead)
        .children()
        .last()
        .should('have.text', discharge.cause_of_dead);
    if (discharge.discharge_type.length != 0)
      cy.get(Discharge_page.type_of_discharge)
        .children()
        .last()
        .should('have.text', discharge.discharge_type);
    if (discharge.transfer_to.length != 0)
      cy.get(Discharge_page.transfer_to)
        .children()
        .last()
        .should('have.text', discharge.transfer_to);
  });
}
