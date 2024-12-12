/// <reference types="cypress" />
import { BedListPage } from '../locators';
import { SideBarPage } from '../locators';

export function navigateBedListPage() {
  cy.get(BedListPage.bedListContainer).first().should('be.visible');
  cy.get(BedListPage.bedListContainer).first().contains('เตียงทั้งหมด');
}

export function checkHeaderBedlist() {
  cy.get(BedListPage.headerBedId).should('have.text', 'เลขเตียง');
  cy.get(BedListPage.headerPatientName).should('have.text', 'ชื่อ-นามสกุล');
  cy.get(BedListPage.headerPatientGenderAge).should('have.text', 'เพศ, อายุ');
  cy.get(BedListPage.headerPhysician).should('have.text', 'แพทย์เจ้าของไข้');
  cy.get(BedListPage.headerConsults).should(
    'have.text',
    'Consult แผนก / แพทย์',
  );
  cy.get(BedListPage.headerLos).should('have.text', 'LOS');
}

export function checkBedlist() {
  cy.get(BedListPage.bedListItem, { log: false }).each(($item, index) => {
    cy.get($item).scrollIntoView({ log: false });
    if ($item.find('div').length >= 8) {
      cy.get($item, { log: false })
        .find(BedListPage.patientName, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(BedListPage.patientName, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(BedListPage.patientHn, { log: false })
        .should('contain', 'HN');
      cy.get($item, { log: false })
        .find(BedListPage.patientHn, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(BedListPage.patientHn, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(BedListPage.patientAn, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(BedListPage.patientAn, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(BedListPage.patientPhysician, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(BedListPage.patientPhysician, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(BedListPage.patientLos, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(BedListPage.patientLos, { log: false })
        .should('be.visible');
    } else {
      cy.get($item, { log: false }).should(
        'contain',
        'ว่าง คลิกเพื่อเพิ่มผู้ป่วย',
      );
    }
  });
}

export function dischargePatient() {
  cy.get('@bedLabel').then((bedLabel) => {
    cy.get(SideBarPage.admittedBed)
      .contains(bedLabel)
      .parents()
      .eq(2)
      .find(SideBarPage.buttonAction)
      .click();
    cy.get(SideBarPage.buttonDischarge).click();
    cy.get(SideBarPage.dialog).find('button').contains('ยืนยัน').click();
  });
  cy.get(BedListPage.toast).should('be.visible');
  cy.get(BedListPage.toast).should('not.be.visible');
}

export function clickOnAdmit() {
  cy.get(BedListPage.admitBed).click();
  cy.url().should('include', 'ipd/patient');
}
