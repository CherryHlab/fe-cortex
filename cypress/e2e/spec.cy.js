/// <reference types="Cypress" />

import * as Start from '../support/start';

describe('template spec', function (){
  it('redirect to home page', function (){
  Cypress.config('defaultCommandTimeout', 50000);
   // cy.visit('/');
   // cy.visit(`//ipd/welcome`);
   Start.PageRedirect('ipd','welcome');
   //cy.visit('https://dev-x.cortexcloud.co/ipd/welcome');
   
  });
  
})