/// <reference types="cypress" />
import { PatientPage } from '../locators';
import { DischargePage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

function randomDateNumber(min = 1, max = 30) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function dischargeSummary() {
  cy.get(PatientPage.dischargeForm).click();
  cy.fixture('discharge').then((data) => {
    let diagnosis = data.diagnosis;
    cy.get(DischargePage.diagnosis)
      .eq(0)
      .type(`${diagnosis.principleDiagnosis}`);
    cy.get(DischargePage.option).first().click();

    for (let i = 0; i < diagnosis.comorbidDiagnosis.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(1)
        .type(`${diagnosis.comorbidDiagnosis[i]}`);
      cy.get(DischargePage.option).first().click();
    }
    for (let i = 0; i < diagnosis.complicationDiagnosis.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(2)
        .type(`${diagnosis.complicationDiagnosis[i]}`);
      cy.get(DischargePage.option).first().click();
    }
    for (let i = 0; i < diagnosis.otherDiagnosis.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(3)
        .type(`${diagnosis.otherDiagnosis[i]}`);
      cy.get(DischargePage.option).first().click();
    }
    for (let i = 0; i < diagnosis.externalCauseOfInjury.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(4)
        .type(`${diagnosis.externalCauseOfInjury[i]}`);
      cy.get(DischargePage.option).first().click();
    }

    let discharge = data.discharge;
    cy.get(DischargePage.dischargeStatus)
      .contains(`${discharge.dischargeStatus}`)
      .click();
    cy.get(DischargePage.dischargeType)
      .contains(`${discharge.dischargeType}`)
      .click();
  });
  cy.get(DischargePage.buttonSubmit).click();
  cy.get(DischargePage.toastSubmit)
    .first()
    .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  cy.get(DischargePage.toastSubmit).first().should('not.be.visible');
}

export function editDischarge(notNurseOrNotAdd = true, addDischarge = true) {
  if (addDischarge) cy.get(PatientPage.dischargeForm).click();
  else cy.get(DischargePage.buttonEdit).click();
  cy.fixture('edit-discharge').then((data) => {
    let diagnosis = data.diagnosis;
    cy.get(DischargePage.diagnosis)
      .eq(0)
      .type(`${diagnosis.principleDiagnosis}`);
    cy.get(DischargePage.option).first().click();

    cy.get(DischargePage.diagnosis).eq(1).clear();
    for (let i = 0; i < diagnosis.comorbidDiagnosis.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(1)
        .type(`${diagnosis.comorbidDiagnosis[i]}`);
      cy.get(DischargePage.option).first().click();
    }

    cy.get(DischargePage.diagnosis).eq(2).clear();
    for (let i = 0; i < diagnosis.complicationDiagnosis.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(2)
        .type(`${diagnosis.complicationDiagnosis[i]}`);
      cy.get(DischargePage.option).first().click();
    }

    cy.get(DischargePage.diagnosis).eq(3).clear();
    for (let i = 0; i < diagnosis.otherDiagnosis.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(3)
        .type(`${diagnosis.otherDiagnosis[i]}`);
      cy.get(DischargePage.option).first().click();
    }

    cy.get(DischargePage.diagnosis).eq(4).clear();
    for (let i = 0; i < diagnosis.externalCauseOfInjury.length; i++) {
      cy.get(DischargePage.diagnosis)
        .eq(4)
        .type(`${diagnosis.externalCauseOfInjury[i]}`);
      cy.get(DischargePage.option).first().click();
    }

    let operation = data.operation.operatingRoomProcedure;
    let orProceduceEq = 0;
    for (let i = 0; i < operation.length; i++) {
      cy.get(DischargePage.orProceduce)
        .eq(orProceduceEq)
        .type(operation[i].orProcedure);
      cy.get(DischargePage.option).first().click();
      orProceduceEq++;
      let surgeonName = operation[i].surgeonName.split(' ')[0];
      cy.get(DischargePage.orProceduce).eq(orProceduceEq).type(surgeonName);
      cy.get(DischargePage.option).first().click();
      orProceduceEq++;
      let dateIn = DischargePage.dateIn.replace('needtoreplace', i);
      cy.get(dateIn).click();
      let randomNumber = randomDateNumber();
      cy.get(DischargePage.option).contains(Number(randomNumber)).click();
      cy.get(dateIn).then(($value) => {
        let dateInText = $value.find('input').val();
        return cy.wrap(dateInText).as('dateIn');
      });
      let dateOut = DischargePage.dateOut.replace('needtoreplace', i);
      cy.get(dateOut).click();
      cy.get(DischargePage.option)
        .contains(randomDateNumber(randomNumber))
        .click();
      cy.get(dateOut).then(($value) => {
        let dateOutText = $value.find('input').val();
        return cy.wrap(dateOutText).as('dateOut');
      });

      cy.get(DischargePage.orProceduce)
        .eq(orProceduceEq)
        .type(operation[i].equipment);
      cy.get(DischargePage.optionAdd).first().click();
      orProceduceEq++;
      cy.get(DischargePage.orProceduce)
        .eq(orProceduceEq)
        .type(operation[i].bodysite);
      cy.get(DischargePage.optionAdd).first().click();
      orProceduceEq++;
    }

    let nonOperating = data.operation.nonOperatingRoomProcedure;

    for (let i = 0; i < nonOperating.inputType.length; i++) {
      cy.get(DischargePage.nonOperatingInput)
        .parent()
        .click()
        .type(nonOperating.inputType[i]);
      cy.get(DischargePage.optionAdd).first().click();
    }
    for (let i = 0; i < nonOperating.suggestion.length; i++) {
      let suggestionItem = DischargePage.nonOperatingRoomProcedure.replace(
        'needtoreplace',
        nonOperating.suggestion[i],
      );
      cy.get(suggestionItem).click();
    }
    for (let i = 0; i < nonOperating.other.length; i++) {
      let suggestionItem = DischargePage.nonOperatingRoomProcedure.replace(
        'needtoreplace',
        nonOperating.other[i].suggestion,
      );
      cy.get(suggestionItem).click();
      let otherDetail = DischargePage.otherDetail.replace(
        'needtoreplace',
        nonOperating.other[i].suggestion,
      );
      let detail = nonOperating.other[i].detail;
      cy.get(otherDetail).type(detail);
      cy.get(DischargePage.buttonModal).click();
    }

    let discharge = data.discharge;
    cy.get(DischargePage.dischargeStatus)
      .contains(`${discharge.dischargeStatus}`)
      .click();
    cy.get(DischargePage.dischargeType)
      .contains(`${discharge.dischargeType}`)
      .click();
  });
  if (notNurseOrNotAdd) cy.get(DischargePage.buttonSubmit).eq(1).click();
  else cy.get(DischargePage.buttonSubmit).click();
  cy.get(DischargePage.toastSubmit)
    .first()
    .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  cy.get(DischargePage.toastSubmit).first().should('not.be.visible');
}

export function viewDischarge(form = 'edit-discharge.json') {
  cy.fixture(form).then((d) => {
    let diagnosis = d.diagnosis;
    let principal = diagnosis.principleDiagnosis;
    cy.get(DischargePage.principal)
      .children()
      .last()
      .should('have.text', principal);
    let comorbid = diagnosis.comorbidDiagnosis;
    for (let i = 0; i < comorbid.length; i++) {
      cy.get(DischargePage.comorbid)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', comorbid[i]);
    }
    let complication = diagnosis.complicationDiagnosis;
    for (let i = 0; i < complication.length; i++) {
      cy.get(DischargePage.complication)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', complication[i]);
    }
    let other = diagnosis.otherDiagnosis;
    for (let i = 0; i < other.length; i++) {
      cy.get(DischargePage.other)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', other[i]);
    }
    let external = diagnosis.externalCauseOfInjury;
    for (let i = 0; i < external.length; i++) {
      cy.get(DischargePage.external)
        .children()
        .last()
        .children()
        .eq(i)
        .should('have.text', external[i]);
    }

    let operating = d.operation.operatingRoomProcedure;
    for (let i = 0; i < operating.length; i++) {
      cy.get(DischargePage.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', operating[i].orProcedure);
      cy.get(DischargePage.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', operating[i].surgeonName);
      cy.get(DischargePage.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', `Equipment: ${operating[i].equipment}`);
      cy.get(DischargePage.operating)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', `Bodysite: ${operating[i].bodysite}`);
    }

    let nonOperatingData = d.operation.nonOperatingRoomProcedure;
    let nonOperatingBuffer = nonOperatingData.inputType.concat(
      nonOperatingData.suggestion,
    );
    let otherNonOperatingBuffer = [];
    let otherNonOperating = nonOperatingData.other;
    for (let i = 0; i < otherNonOperating.length; i++) {
      otherNonOperatingBuffer.push(
        otherNonOperating[i].suggestion.concat(
          ' ',
          `${otherNonOperating[i].detail}`,
        ),
      );
    }
    let nonOperating = nonOperatingBuffer.concat(otherNonOperatingBuffer);
    for (let i = 0; i < nonOperating.length; i++) {
      cy.get(DischargePage.nonOperation)
        .children()
        .last()
        .children()
        .eq(i)
        .should('contain', `${nonOperating[i]}`);
    }

    let discharge = d.discharge;
    if (discharge.dischargeStatus.length != 0)
      cy.get(DischargePage.statusOfDischarge)
        .children()
        .last()
        .should('have.text', discharge.dischargeStatus);
    if (discharge.causeOfDead.length != 0)
      cy.get(DischargePage.causeOfDead)
        .children()
        .last()
        .should('have.text', discharge.causeOfDead);
    if (discharge.dischargeType.length != 0)
      cy.get(DischargePage.typeOfDischarge)
        .children()
        .last()
        .should('have.text', discharge.dischargeType);
    if (discharge.transferTo.length != 0)
      cy.get(DischargePage.transferTo)
        .children()
        .last()
        .should('have.text', discharge.transferTo);
  });
}
