/// <reference types="cypress" />
import { Bed_list_page } from '../locators';

export function navigateBedlistPage() {
  cy.get(Bed_list_page.bed_list_container).first().should('be.visible');
  cy.get(Bed_list_page.bed_list_container).first().contains('เตียงทั้งหมด');
}

export function checkHeaderBedlist() {
  cy.get(Bed_list_page.header_bed_id).should('have.text', 'เลขเตียง');
  cy.get(Bed_list_page.header_patient_name).should('have.text', 'ชื่อ-นามสกุล');
  cy.get(Bed_list_page.header_patient_gender_age).should(
    'have.text',
    'เพศ, อายุ',
  );
  cy.get(Bed_list_page.header_physician).should('have.text', 'แพทย์เจ้าของไข้');
  cy.get(Bed_list_page.header_consults).should(
    'have.text',
    'Consult แผนก / แพทย์',
  );
  cy.get(Bed_list_page.header_los).should('have.text', 'LOS');
}

export function checkBedlist() {
  cy.get(Bed_list_page.bed_list_item, { log: false }).each(($item, index) => {
    cy.get($item).scrollIntoView({ log: false });
    if ($item.find('div').length >= 8) {
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_name, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_name, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_hn, { log: false })
        .should('contain', 'HN');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_hn, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_hn, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_an, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_an, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_physician, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_physician, { log: false })
        .should('be.visible');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_los, { log: false })
        .should('exist');
      cy.get($item, { log: false })
        .find(Bed_list_page.patient_los, { log: false })
        .should('be.visible');
    } else {
      cy.get($item, { log: false }).should(
        'contain',
        'ว่าง คลิกเพื่อเพิ่มผู้ป่วย',
      );
    }
  });
}
