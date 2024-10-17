/// <reference types="cypress" />
import { Select_clinic_page } from '../locators';

export function navigateSelectClinicPage() {
  cy.get(Select_clinic_page.list_select_department).should('be.visible');
  cy.get(Select_clinic_page.list_select_clinic)
    .should('be.visible')
    .should('have.attr', 'disabled', 'disabled');
}

export function checkDepartmentAndClinic(departmentData) {
  var lengthOfDepartment = departmentData.department.length;
  var department = departmentData.department;
  for (var i = 0; i < lengthOfDepartment; i++) {
    cy.get(Select_clinic_page.list_select_department).click();
    cy.get(Select_clinic_page.text_search_department)
      .should('be.visible')
      .should('be.empty');
    var indexOfDepartment = Select_clinic_page.item.indexOf('"');
    var findDepartment =
      Select_clinic_page.item.slice(0, indexOfDepartment + 1) +
      department[i].name +
      Select_clinic_page.item.slice(indexOfDepartment + 1);
    cy.get(findDepartment).click();
    cy.get(Select_clinic_page.display_department).should(
      'have.text',
      department[i].name,
    );
    cy.get(Select_clinic_page.list_select_clinic)
      .should('be.visible')
      .should('not.have.attr', 'disabled', 'disabled');
    var lengthOfClinic = department[i].clinic.length;
    var clinic = department[i].clinic;
    cy.get(Select_clinic_page.list_select_clinic).click();

    for (var j = 0; j < clinic.length; j++) {
      var indexOfClinic = Select_clinic_page.item.indexOf('"');
      var findClinic =
        Select_clinic_page.item.slice(0, indexOfClinic + 1) +
        clinic[j] +
        Select_clinic_page.item.slice(indexOfClinic + 1);
      cy.get(findClinic).scrollIntoView().should('be.visible');
    }

    cy.get(Select_clinic_page.item_list).should('have.length', lengthOfClinic);
    cy.get(Select_clinic_page.list_select_clinic).click();
  }
}

export function selectDepartment(department = 'กุมารเวช', length = 11) {
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

export function selectClinic(clinic = 'บริบาลทารกแรกเกิด', length = 1) {
  cy.get(Select_clinic_page.list_select_clinic).click();
  cy.get(Select_clinic_page.text_search_clinic)
    .should('be.visible')
    .should('be.empty');
  cy.get(Select_clinic_page.item_list).should('have.lengthOf', length);
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
