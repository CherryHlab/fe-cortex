/// <reference types="cypress" />
import { BedListPage } from '../locators';
import { AssignBedPage } from '../locators';

function randomANnumber(min = 100, max = 99999) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomAvailableBed() {
  cy.get(BedListPage.emptyBed)
    .should('contain', 'ว่าง คลิกเพื่อเพิ่มผู้ป่วย')
    .then(($bedList) => {
      let noOfBed = Math.floor(Math.random() * $bedList.length);
      let bedLabelText = $bedList
        .eq(noOfBed)
        .parent()
        .find(BedListPage.bedListLabel)
        .text();
      $bedList.eq(noOfBed).click();
      cy.get(AssignBedPage.assignModal)
        .find(AssignBedPage.chipLabel)
        .should('have.text', bedLabelText);
      return cy.wrap(bedLabelText).as('bedLabel');
    });
}

export function assignPatient(patientSlot = 0, assign = true) {
  cy.fixture('assign-bed').then((data) => {
    let patient = data.assignBed;
    let patientLength = data.assignBed.length;
    if (patient[patientSlot].used == false) {
      cy.get(AssignBedPage.searchHn).type(patient[patientSlot].hn);
      cy.get(AssignBedPage.buttonSearch).click();
      cy.get(AssignBedPage.patientName).should(
        'have.text',
        patient[patientSlot].name,
      );
      if (assign == true) {
        cy.get(AssignBedPage.an).clear();
        cy.get(AssignBedPage.an).type(randomANnumber(101, 106));
        cy.get(AssignBedPage.an).type(randomANnumber());
        cy.get(AssignBedPage.phoneNumber).clear();
        cy.get(AssignBedPage.phoneNumber).type(patient[patientSlot].phone);
        cy.get(AssignBedPage.emergencyName).clear();
        cy.get(AssignBedPage.emergencyRelationship).clear();
        cy.get(AssignBedPage.emergencyPhoneNumber).clear();
        cy.get(AssignBedPage.emergencyName).type(
          patient[patientSlot].emergencyName,
        );
        cy.get(AssignBedPage.emergencyRelationship).type(
          patient[patientSlot].relationship,
        );
        cy.get(AssignBedPage.emergencyPhoneNumber).type(
          patient[patientSlot].emergencyPhone,
        );
        cy.get(AssignBedPage.physician).clear();
        let physician = patient[patientSlot].physician.split(' ')[0];
        cy.get(AssignBedPage.physician).type(physician);
        cy.get(AssignBedPage.option).first().click();
        cy.get(AssignBedPage.selectPhysician).should('contain', physician);
        let departmentLength = patient[patientSlot].department.length;
        if (departmentLength > 0) {
          for (let i = 0; i < departmentLength; i++) {
            let department = AssignBedPage.department.replace(
              'needtoreplace',
              i,
            );
            cy.get(department).click();
            let departmentName = AssignBedPage.selectDepartment.replace(
              'needtoreplace',
              patient[patientSlot].department[i].name,
            );
            let consultName = AssignBedPage.consultName.replace(
              'needtoreplace',
              i,
            );
            let checkConsultName = AssignBedPage.selectConsult.replace(
              'needtoreplace',
              i,
            );
            cy.get(departmentName).click();
            if (patient[patientSlot].department[i].consultName != '') {
              let theConsultName =
                patient[patientSlot].department[i].consultName.split(' ')[0];
              cy.get(consultName).clear();
              cy.get(consultName).type(theConsultName);
              cy.get(AssignBedPage.option).first().click();
              cy.get(checkConsultName).should('contain', theConsultName);
            }
            if (i + 1 < departmentLength)
              cy.get(AssignBedPage.buttonAddConsult).click();
          }
        }
        cy.get(AssignBedPage.buttonSubmit).click();
        cy.get(AssignBedPage.toastSubmit).first().should('be.visible'); // add should contain text
        cy.get(AssignBedPage.toastSubmit).first().should('not.be.visible');
      } else {
        cy.get(AssignBedPage.buttonSubmit).click();
        cy.get(AssignBedPage.toastSubmit)
          .first()
          .should('be.visible')
          .should('have.text', 'ย้ายเตียงผู้ป่วยสำเร็จ');
        cy.get(AssignBedPage.toastSubmit).first().should('not.be.visible');
      }
    }
  });
}
