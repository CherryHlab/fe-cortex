/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';
import * as Logout from '../support/tasks/logout';

Cypress.config('defaultCommandTimeout', 30000);

describe('template spec', () => {

  beforeEach('redirect to home page', function() {
    Start.PageRedirect('ipd','welcome');
  });

  it('should log in with super user account', function() {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then(data => {
      Login.userLogin();
    });
  });

  it('should log in with x-physician account', function() {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then(data => {
      Login.userLogin(data.physician, data.physician);
    });
  });

  it('should log in with x-nurse account', function() {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then(data => {
      Login.userLogin(data.nurse, data.nurse);
    });
  });

  it('should log in with x-pharmacist account', function() {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then(data => {
      Login.userLogin(data.pharmacist, data.pharmacist);
    });
  });

  it('should logout from cortex-x', function() {
    Login.navigateWelcomePage();
    cy.fixture('login-credential').then(data => {
      Login.userLogin();
    });
    Logout.navigateUserMenu();
    Logout.logoutButton();
  });
})
