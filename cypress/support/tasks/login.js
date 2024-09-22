/// <reference types="cypress" />
import { Login_page } from '../locators';
import * as data from '../../fixtures/login-credential.json';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateWelcomePage(){
  cy.get(Login_page.button_welcome).click();
  cy.get(Login_page.page_title).contains('cortex');
}

export function superuserLogin(){
   cy.get(Login_page.text_username).type(data.super_user.username);
   cy.get(Login_page.text_password).type(data.super_user.password);
   cy.get(Login_page.button_login).click();
   cy.url().should('include','select-ward');
}
