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

export function selectDepartment(department = 'อายุรศาสตร์', length = 11) {
  cy.get(Select_clinic_page.list_select_department).click();
  cy.get(Select_clinic_page.text_search_department)
    .should('be.visible')
    .should('be.empty');
  cy.get(Select_clinic_page.item_list).should('have.lengthOf', length);
  cy.get(Select_clinic_page.item_list).should('not.empty');
  cy.get(Select_clinic_page.list_box).scrollTo('bottom');
  var indexOfDepartment = Select_clinic_page.item.indexOf('"');
  var findDepartment =
    Select_clinic_page.item.slice(0, indexOfDepartment + 1) +
    department +
    Select_clinic_page.item.slice(indexOfDepartment + 1);
  cy.get(findDepartment).click();
  cy.get(Select_clinic_page.list_select_clinic)
    .should('be.visible')
    .should('not.have.attr', 'disabled', 'disabled');
}

export function selectClinic(clinic = 'อายุรกรรม ชาย', length = 2) {
  cy.get(Select_clinic_page.list_select_clinic).click();
  cy.get(Select_clinic_page.text_search_clinic)
    .should('be.visible')
    .should('be.empty');
  cy.get(Select_clinic_page.item_list).should('have.lengthOf', 2);
  cy.get(Select_clinic_page.item_list).should('not.empty');
  cy.get(Select_clinic_page.list_box).scrollTo('bottom');
  var indexOfClinic = Select_clinic_page.item.indexOf('"');
  var findClinic =
    Select_clinic_page.item.slice(0, indexOfClinic + 1) +
    clinic +
    Select_clinic_page.item.slice(indexOfClinic + 1);
  cy.get(findClinic).click();
  cy.get(Select_clinic_page.list_select_clinic)
    .should('be.visible')
    .should('not.have.attr', 'disabled', 'disabled');
  cy.get(Select_clinic_page.button_submit).click();
  cy.url().should('include', 'ipd/bed-list');
}
