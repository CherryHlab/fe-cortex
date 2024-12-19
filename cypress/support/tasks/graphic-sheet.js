/// <reference types="cypress" />
import { GraphicSheetPage } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateGraphicSheete() {
  cy.get(PatientPage.graphicSheetForm).click();
  cy.get(GraphicSheetPage.graphicSheetForm).should('be.visible');
}

export function navigateGraphicSheetePage() {
  cy.get(PatientPage.graphicSheetForm).click();
  cy.get(GraphicSheetPage.title).should('have.text', 'Graphic Sheet');
}

export function addGraphicSheet(
  isEdit = false,
  myFixture = 'graphic-sheet.json',
) {

  cy.intercept('/emr-api/note-templates/*').as('noteTemplate')
  cy.intercept('/thinkehr/rest/v1/draft/*').as('thinkehr')

  cy.fixture(myFixture).then((d) => {
    let pn = d.graphicSheet;
    for (let i = 0; i < pn.length; i++) {
      if (!isEdit) navigateGraphicSheetePage();

      cy.wait('@noteTemplate', {timeout: 10000})
      cy.wait('@thinkehr', {timeout: 10000})

      if (pn[i].time.performTime == 'now') {
        cy.get(GraphicSheetPage.buttonToday).click();
      } else {

        cy.get(GraphicSheetPage.performDate).should('be.visible');
        cy.get(GraphicSheetPage.buttonToday).should('have.class', 'disabled');
        cy.get(GraphicSheetPage.performDate).clear()

        
        cy.get(GraphicSheetPage.performDate).clear();
        
        cy.get(GraphicSheetPage.performDate).type(pn[i].time.performDate);

        cy.get(GraphicSheetPage.performDate).invoke('val',pn[i].time.performDate);

        cy.get(GraphicSheetPage.performHour).clear()
        
        cy.get(GraphicSheetPage.performHour).type(pn[i].time.performHour);

        cy.get(GraphicSheetPage.performMinute).clear()

        cy.get(GraphicSheetPage.performMinute).type(pn[i].time.performMinute);
      }

      cy.get(GraphicSheetPage.systolic).find('input').clear();
      cy.get(GraphicSheetPage.systolic).type(pn[i].systolic);

      cy.get(GraphicSheetPage.diastolic).find('input').clear();
      cy.get(GraphicSheetPage.diastolic).type(pn[i].diastolic);

      cy.get(GraphicSheetPage.PR).find('input').clear();
      cy.get(GraphicSheetPage.PR).type(pn[i].PR);

      cy.get(GraphicSheetPage.RR).find('input').clear();
      cy.get(GraphicSheetPage.RR).type(pn[i].RR);

      cy.get(GraphicSheetPage.BT).find('input').clear();
      cy.get(GraphicSheetPage.BT).type(pn[i].BT);

      cy.get(GraphicSheetPage.SPO2).type(pn[i].SPO2);

      cy.get(GraphicSheetPage.Height).find('input').clear();
      cy.get(GraphicSheetPage.Height).type(pn[i].Height);

      cy.get(GraphicSheetPage.Weight).type(pn[i].Weight);
      

      if (!isEdit) submitGraphicSheetForm(true);
      else submitGraphicSheetForm();
    }
  });
}

export function submitGraphicSheetForm(isEdit = false) {
  cy.get(GraphicSheetPage.buttonSubmit).click();
  if (isEdit)
    cy.get(GraphicSheetPage.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(GraphicSheetPage.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(GraphicSheetPage.toast).should('not.be.visible');
}
