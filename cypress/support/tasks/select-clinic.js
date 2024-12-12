/// <reference types="cypress" />
import { SelectClinicPage } from '../locators';

export function navigateSelectClinicPage() {
  cy.get(SelectClinicPage.listSelectDepartment).should('be.visible');
  cy.get(SelectClinicPage.listSelectClinic)
    .should('be.visible')
    .should('have.attr', 'disabled', 'disabled');
}

export function checkDepartmentAndClinic(departmentData) {
  var lengthOfDepartment = departmentData.department.length;
  var department = departmentData.department;
  for (var i = 0; i < lengthOfDepartment; i++) {
    cy.get(SelectClinicPage.listSelectDepartment).click();
    cy.get(SelectClinicPage.textSearchDepartment)
      .should('be.visible')
      .should('be.empty');
    var indexOfDepartment = SelectClinicPage.item.indexOf('"');
    var findDepartment =
      SelectClinicPage.item.slice(0, indexOfDepartment + 1) +
      department[i].name +
      SelectClinicPage.item.slice(indexOfDepartment + 1);
    cy.get(findDepartment).click();
    cy.get(SelectClinicPage.displayDepartment).should(
      'have.text',
      department[i].name,
    );
    cy.get(SelectClinicPage.listSelectClinic)
      .should('be.visible')
      .should('not.have.attr', 'disabled', 'disabled');
    var lengthOfClinic = department[i].clinic.length;
    var clinic = department[i].clinic;
    cy.get(SelectClinicPage.listSelectClinic).click();

    for (var j = 0; j < clinic.length; j++) {
      var indexOfClinic = SelectClinicPage.item.indexOf('"');
      var findClinic =
        SelectClinicPage.item.slice(0, indexOfClinic + 1) +
        clinic[j] +
        SelectClinicPage.item.slice(indexOfClinic + 1);
      cy.get(findClinic).scrollIntoView().should('be.visible');
    }

    cy.get(SelectClinicPage.itemList).should('have.length', lengthOfClinic);
    cy.get(SelectClinicPage.listSelectClinic).click();
  }
}

export function selectDepartment(department = 'กุมารเวช', length = 11) {
  cy.get(SelectClinicPage.listSelectDepartment).click();
  cy.get(SelectClinicPage.textSearchDepartment)
    .should('be.visible')
    .should('be.empty');
  cy.get(SelectClinicPage.itemList).should('have.lengthOf', length);
  cy.get(SelectClinicPage.itemList).should('not.empty');
  cy.get(SelectClinicPage.listBox).scrollTo('bottom');
  var indexOfDepartment = SelectClinicPage.item.indexOf('"');
  var findDepartment =
    SelectClinicPage.item.slice(0, indexOfDepartment + 1) +
    department +
    SelectClinicPage.item.slice(indexOfDepartment + 1);
  cy.get(findDepartment).click();
  cy.get(SelectClinicPage.listSelectClinic)
    .should('be.visible')
    .should('not.have.attr', 'disabled', 'disabled');
}

export function selectClinic(clinic = 'บริบาลทารกแรกเกิด', length = 1) {
  cy.get(SelectClinicPage.listSelectClinic).click();
  cy.get(SelectClinicPage.textSearchClinic)
    .should('be.visible')
    .should('be.empty');
  cy.get(SelectClinicPage.itemList).should('have.lengthOf', length);
  cy.get(SelectClinicPage.itemList).should('not.empty');
  cy.get(SelectClinicPage.listBox).scrollTo('bottom');
  var indexOfClinic = SelectClinicPage.item.indexOf('"');
  var findClinic =
    SelectClinicPage.item.slice(0, indexOfClinic + 1) +
    clinic +
    SelectClinicPage.item.slice(indexOfClinic + 1);
  cy.get(findClinic).click();
  cy.get(SelectClinicPage.listSelectClinic)
    .should('be.visible')
    .should('not.have.attr', 'disabled', 'disabled');
  cy.get(SelectClinicPage.buttonSubmit).click();
  cy.url().should('include', 'ipd/bed-list');
}
