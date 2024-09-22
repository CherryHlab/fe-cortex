/// <reference types="cypress" />
import * as Start from '../support/tasks/start';
import * as Login from '../support/tasks/login';
import * as Logout from '../support/tasks/logout';

Cypress.config('defaultCommandTimeout', 30000);

describe('template spec', () => {

  beforeEach('redirect to home page', function() {
    Start.PageRedirect('ipd','welcome');
  });


  it('should log in with super user account', function (){
    Login.navigateWelcomePage();
    Login.superuserLogin();
  });

  it('should logout from cortex-x', function (){
    Logout.navigateUserMenu();
    Logout.logoutButton();
  });
})
