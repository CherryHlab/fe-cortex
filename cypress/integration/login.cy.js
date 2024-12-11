/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as LogIn from '../support/tasks/login';
import * as LogOut from '../support/tasks/logout';

Cypress.config('defaultCommandTimeout', 30000);

describe('LogIn and logout', () => {
  beforeEach('redirect to home page', function () {
    Start.PageRedirect('ipd', 'welcome');
  });

  it('should log in with super user account', function () {
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
  });

  it('should log in with x-physician account', function () {
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.physician);
    });
  });

  it('should log in with x-nurse account', function () {
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.nurse);
    });
  });

  it('should log in with x-pharmacist account', function () {
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn(data.pharmacist);
    });
  });

  it('should logout from cortex-x', function () {
    LogIn.navigateWelcomePage();
    cy.fixture('login-credential').then((data) => {
      LogIn.userLogIn();
    });
    LogOut.navigateUserMenu();
    LogOut.logOutButton();
  });
});
