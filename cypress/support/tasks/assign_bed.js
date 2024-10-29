/// <reference types="cypress" />
import { Bed_list_page } from '../locators';
import { Assign_bed_page } from '../locators';

function randomANnumber(min = 1000, max = 9999) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomAvailableBed() {
  cy.get(Bed_list_page.empty_bed)
    .should('contain', 'ว่าง คลิกเพื่อเพิ่มผู้ป่วย')
    .then(($bed_list) => {
      let noOfBed = Math.floor(Math.random() * $bed_list.length);
      let bed_label_text = $bed_list
        .eq(noOfBed)
        .parent()
        .find(Bed_list_page.bed_list_label)
        .text();
      $bed_list.eq(noOfBed).click();
      cy.get(Assign_bed_page.assign_modal)
        .find(Assign_bed_page.chip_label)
        .should('have.text', bed_label_text);
      return cy.wrap(bed_label_text).as('bed_label');
    });
}

export function assign_patient(patient_slot = 0, assign = true) {
  cy.fixture('assign-bed').then((data) => {
    let patient = data.assign_bed;
    let patient_length = data.assign_bed.length;
    if (patient[patient_slot].used == false) {
      cy.get(Assign_bed_page.search_hn).type(patient[patient_slot].hn);
      cy.get(Assign_bed_page.button_search).click();
      cy.get(Assign_bed_page.patient_name).should(
        'have.text',
        patient[patient_slot].name,
      );
      if (assign == true) {
        cy.get(Assign_bed_page.an).clear();
        cy.get(Assign_bed_page.an).type(randomANnumber(101, 106));
        cy.get(Assign_bed_page.an).type(randomANnumber());
        cy.get(Assign_bed_page.phone_number).clear();
        cy.get(Assign_bed_page.phone_number).type(patient[patient_slot].phone);
        cy.get(Assign_bed_page.emergency_name).clear();
        cy.get(Assign_bed_page.emergency_relationship).clear();
        cy.get(Assign_bed_page.emergency_phone_number).clear();
        cy.get(Assign_bed_page.emergency_name).type(
          patient[patient_slot].emergency_name,
        );
        cy.get(Assign_bed_page.emergency_relationship).type(
          patient[patient_slot].relationship,
        );
        cy.get(Assign_bed_page.emergency_phone_number).type(
          patient[patient_slot].emergency_phone,
        );
        cy.get(Assign_bed_page.physician).clear();
        let physician = patient[patient_slot].physician.split(' ')[0];
        cy.get(Assign_bed_page.physician).type(physician);
        cy.get(Assign_bed_page.option).first().click();
        cy.get(Assign_bed_page.select_physician).should('contain', physician);
        let department_length = patient[patient_slot].department.length;
        if (department_length > 0) {
          for (let i = 0; i < department_length; i++) {
            let department = Assign_bed_page.department.replace(
              'needtoreplace',
              i,
            );
            cy.get(department).click();
            let departmentName = Assign_bed_page.select_department.replace(
              'needtoreplace',
              patient[patient_slot].department[i].name,
            );
            let consultName = Assign_bed_page.consultname.replace(
              'needtoreplace',
              i,
            );
            let checkConsultName = Assign_bed_page.select_consult.replace(
              'needtoreplace',
              i,
            );
            cy.get(departmentName).click();
            if (patient[patient_slot].department[i].consult_name != '') {
              let consult_name =
                patient[patient_slot].department[i].consult_name.split(' ')[0];
              cy.get(consultName).clear();
              cy.get(consultName).type(consult_name);
              cy.get(Assign_bed_page.option).first().click();
              cy.get(checkConsultName).should('contain', consult_name);
            }
            if (i + 1 < department_length)
              cy.get(Assign_bed_page.button_add_consult).click();
          }
        }
        cy.get(Assign_bed_page.button_submit).click();
        cy.get(Assign_bed_page.toast_submit).first().should('be.visible'); // add should contain text
        cy.get(Assign_bed_page.toast_submit).first().should('not.be.visible');
      } else {
        cy.get(Assign_bed_page.button_submit).click();
        cy.get(Assign_bed_page.toast_submit)
          .first()
          .should('be.visible')
          .should('have.text', 'ย้ายเตียงผู้ป่วยสำเร็จ');
        cy.get(Assign_bed_page.toast_submit).first().should('not.be.visible');
      }
    }
  });
}
