/// <reference types="cypress" />
import { Problem_list_page } from '../locators';
import { Patient_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateProblemList() {
  cy.get(Patient_page.problem_list_form).click();
  cy.get(Problem_list_page.problem_list_header).should('be.visible');
}

export function navigateProblemListPage() {
  cy.get(Patient_page.problem_list_page).click();
  cy.get(Patient_page.title).should('have.text', 'Problem List');
}

export function addProblemList(
  isEdit = false,
  myFixture = 'problem-list.json',
) {
  cy.fixture(myFixture).then((d) => {
    let pl = d.problem;
    for (let i = 0; i < pl.length; i++) {
      if (!isEdit) navigateProblemList();

      cy.get(Problem_list_page.problem).clear();
      cy.get(Problem_list_page.problem).type(pl[i].name);

      cy.get(Problem_list_page.problem_status).click({ force: true });
      cy.get(Problem_list_page.problem_status).type(pl[i].problem_status);
      cy.get(Problem_list_page.list_option).eq(0).click();

      if (pl[i].severity) {
        cy.get(Problem_list_page.severity).click({ force: true });
        cy.get(Problem_list_page.severity).type(pl[i].severity);
        cy.get(Problem_list_page.list_option).eq(0).click();
      }

      if (pl[i].start_time.perform_time == 'now') {
        cy.get(Problem_list_page.button_start_set_today).click();
      } else {
        cy.get(Problem_list_page.start_date).clear();
        cy.get(Problem_list_page.start_date).type(
          pl[i].start_time.perform_date,
        );

        cy.get(Problem_list_page.start_hour).clear();
        cy.get(Problem_list_page.start_hour).type(
          pl[i].start_time.perform_hour,
        );

        cy.get(Problem_list_page.start_minute).clear();
        cy.get(Problem_list_page.start_minute).type(
          pl[i].start_time.perform_minute,
        );
      }

      if (pl[i].problem_status == 'Resolved') {
        if (pl[i].end_time.perform_time == 'now') {
          cy.get(Problem_list_page.button_end_set_today).click();
        } else {
          cy.get(Problem_list_page.end_date).clear();
          cy.get(Problem_list_page.end_date).type(pl[i].end_time.perform_date);

          cy.get(Problem_list_page.end_hour).clear();
          cy.get(Problem_list_page.end_hour).type(pl[i].end_time.perform_hour);

          cy.get(Problem_list_page.end_minute).clear();
          cy.get(Problem_list_page.end_minute).type(
            pl[i].end_time.perform_minute,
          );
        }
      }

      if (pl[i].detail) {
        cy.get(Problem_list_page.detail).clear();
        cy.get(Problem_list_page.detail).type(pl[i].detail);
      }

      if (!isEdit) submitProblemList(true);
      else submitProblemList();
    }
  });
}

export function submitProblemList(isEdit = false) {
  cy.get(Problem_list_page.button_submit).click();
  if (isEdit)
    cy.get(Problem_list_page.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(Problem_list_page.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(Problem_list_page.toast).should('not.be.visible');
}

export function editProblemList(
  editItem = 0,
  myFixture = 'edit_problem-list.json',
) {
  cy.get(Problem_list_page.button_edit).eq(editItem).click({ force: true });
  addProblemList(true, myFixture);
}

export function viewProblemList(myFixture = 'problem-list.json') {
  cy.fixture(myFixture).then((d) => {
    let pl = d.problem;
    let plLength = pl.length;
    let myDate = '';
    let arrayTime = [];
    let arrayLength = 0;
    let plDate = [];
    let plTime = '';

    for (let i = 0; i < plLength; i++) {
      cy.get(Problem_list_page.view_problem_item)
        .eq(i)
        .find(Problem_list_page.view_problem_name)
        .should('have.text', pl[i].name);
      cy.get(Problem_list_page.view_problem_item)
        .eq(i)
        .find(Problem_list_page.view_problem_status)
        .should('have.text', pl[i].problem_status);
      if (pl[i].severity) {
        cy.get(Problem_list_page.view_problem_item)
          .eq(i)
          .find(Problem_list_page.view_severity)
          .should('have.text', pl[i].severity);
      }

      if (pl[i].start_time.perform_time != 'now') {
        myDate = pl[i].start_time.perform_date;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        plDate = arrayTime.join('/');
        plTime = `${plDate}, ${pl[i].start_time.perform_hour}:${pl[i].start_time.perform_minute}`;
        cy.get(Problem_list_page.view_problem_item)
          .eq(i)
          .find(Problem_list_page.view_start_date)
          .find('p')
          .first()
          .should('have.text', plTime);
      }

      if (pl[i].problem_status == 'Resolved') {
        if (pl[i].end_time.perform_time != 'now') {
          myDate = pl[i].end_time.perform_date;
          arrayTime = myDate.split('/');
          arrayLength = arrayTime.length - 1;
          arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
          plDate = arrayTime.join('/');
          plTime = `${plDate}, ${pl[i].end_time.perform_hour}:${pl[i].end_time.perform_minute}`;
          cy.get(Problem_list_page.view_problem_item)
            .eq(i)
            .find(Problem_list_page.view_end_date)
            .should('have.text', plTime);
        }
      } else {
        cy.get(Problem_list_page.view_problem_item)
          .eq(i)
          .find(Problem_list_page.view_end_date_empty)
          .should('have.text', '-');
      }

      if (pl[i].detail) {
        cy.get(Problem_list_page.view_problem_item)
          .eq(i)
          .find(Problem_list_page.view_detail)
          .should('have.text', pl[i].detail);
      } else {
        cy.get(Problem_list_page.view_problem_item)
          .eq(i)
          .find(Problem_list_page.view_detail)
          .should('have.text', '-');
      }
    }
  });
}

export function removeProblemList() {
  cy.get(Problem_list_page.view_problem_item).should('have.length', 7);
  cy.get(Problem_list_page.button_ellipsis).eq(0).click();
  cy.get(Problem_list_page.button_remove).click();
  cy.get(Problem_list_page.toast).should('be.visible');
  cy.get(Problem_list_page.toast).should('not.be.visible');
  cy.get(Problem_list_page.view_problem_item).should('have.length', 6);
}
