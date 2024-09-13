/// <reference types="Cypress" />
import * as Login_page from '../locators';

const data = require('../fixtures/login-credential.json');

Cypress.config('defaultCommandTimeout', 50000);

export function navigateWelcomePage(){
  cy.get(Login_page.button_welcome).click();
}

export function superuserLogin(){
  
   cy.get(Login_page.text_username).type(data.super_user.username);
   cy.get(Login_page.text_password).type(data.super_user.password);
   cy.get(Login_page.button_login).click();

}
