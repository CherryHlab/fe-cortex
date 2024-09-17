/// <reference types="Cypress" />

import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';

Cypress.config('defaultCommandTimeout', 30000);


describe('template spec', function (){

  Cypress.config('defaultCommandTimeout', 50000);

  beforeEach('redirect to home page', function() {
    
    Start.PageRedirect('ipd','welcome');
  });

  it('should log in with super user account', function (){
  
    Login.navigateWelcomePage();
    Login.superuserLogin();
   
  });
  
    /*cy.get('[data-testid="searchbox-trigger-select-department"]').click();
    cy.get('[data-testid="searchbox-result-1"]').click();

    cy.get('[data-testid="searchbox-trigger-select-ward"]').click();
    //.should('have.text', 'อายุรศาสตร์'); 
    cy.get('[data-testid="searchbox-result-1"]').click();
    //.should('have.text', 'อายุรกรรม ชาย');
    cy.get('[data-testid="submit-select-ward"]').click();

    //cy.get('[data-testid="layout-sidebar-collapsible-root"]').scrollTo(0, 500);*/
})