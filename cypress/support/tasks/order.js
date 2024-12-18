/// <reference types="cypress" />
import { Order } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateOneDay() {
  cy.get(PatientPage.oneDayOrderForm).click();
  cy.get(Order.oneDayHeader).should('be.visible');
}

export function navigateOneDayPage() {
  cy.get(PatientPage.orderPage).click();
  cy.get(Order.title).should('have.text', 'Order');
}

export function addOrder(
  myFixture = 'order.json'
) {
  cy.intercept('medication-api/drug-administration/catalogs').as('medCatalogs')
  cy.fixture(myFixture).then((d) => {
    let om = d.med;
    navigateOneDay();
    cy.wait('@medCatalogs')
      for (let i = 0; i < om.length; i++) {
        cy.get(Order.orderSearch).clear();
        cy.get(Order.orderSearch).type(om[i].name);
        cy.get(Order.option).first().click()
        orderMed(false, om[i])
      }
    let os = d.supply
    for (let i = 0; i < os.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(os[i].name);
      cy.get(Order.option).first().click()
      orderMed(false, os[i])
    }
    let ol = d.lab
    for (let i = 0; i < ol.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(ol[i].name);
      cy.get(Order.option).first().click()
      orderLab(false, ol[i])
    }
    let oa = d.activity
    for (let i = 0; i < oa.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(oa[i].name);
      cy.get(Order.activityAddButton).click()
      orderActivity(false, oa[i])
    }
    addTemplate(d.template)
    addLicenseNumber(d.licenseNumber)
    submitOrder(true);
  });
}

function orderMed (isEdit = false, od) {
  if (od.had == true  && isEdit == false) {
    cy.get(Order.hadTitle).should('have.text','Drug Alert');
    cy.get(Order.drugName).should('have.text',od.name);
    cy.get(Order.hadReason).type(od.hadReason)
    cy.get(Order.hadSubmit).click() 
  } else if (od.had == true && isEdit == true) {
    cy.get(Order.allergySymbol).click()
    cy.get(Order.hadReason).type(od.hadReason)
    cy.get(Order.hadSubmit).click() 
  }
  checkModal(isEdit, od)
  if(!isEdit) cy.get(Order.addMed).click();
}

function checkModal (isEdit = false, od) {
    if (od.autoModal == true && isEdit == false) {
      cy.get(Order.modalDetail).clear();
      cy.get(Order.modalDetail).type(od.detail);
      cy.get(Order.modalStat).invoke('attr','data-state').then((state) => {
        if (state == "unchecked" && od.stat == true) {
          cy.get(Order.modalStat).click();
        } else if (state == "checked" && od.stat == false) {
          cy.get(Order.modalStat).click();
        }
      });
      cy.get(Order.modalReason).click({ force: true })
      cy.get(Order.option).contains(od.reason).click()
      cy.get(Order.modalDiagnosis).type(od.diagnosis);
      cy.get(Order.modalDoctorNumber).type(od.doctorNumber);
      cy.get(Order.option).contains(od.doctorNumber).click()
      cy.get(Order.modalSubmit).click()
    } else if (od.autoModal == true && isEdit == true) {
      cy.get(Order.buttonPopupSymbol).click()
      cy.get(Order.modalDetail).clear();
      cy.get(Order.modalDetail).type(od.detail);
      cy.get(Order.modalStat).invoke('attr','data-state').then((state) => {
        if (state == "unchecked" && od.stat == true) {
          cy.get(Order.modalStat).click();
        } else if (state == "checked" && od.stat == false) {
          cy.get(Order.modalStat).click();
        }
      });
      cy.get(Order.modalReason).click({ force: true })
      cy.get(Order.option).contains(od.reason).click()
      cy.get(Order.modalDiagnosis).clear();
      cy.get(Order.modalDiagnosis).type(od.diagnosis);
      cy.get(Order.modalDoctorNumber).clear();
      cy.get(Order.modalDoctorNumber).type(od.doctorNumber);
      cy.get(Order.option).contains(od.doctorNumber).click()
      cy.get(Order.modalSubmit).click()
    } else {
      cy.get(Order.orderDetail).clear();
      cy.get(Order.orderDetail).type(od.detail);
      cy.get(Order.stat).invoke('attr','data-state').then((state) => {
        if (state == "unchecked" && od.stat == true) {
          cy.get(Order.stat).click();
        } else if (state == "checked" && od.stat == false) {
          cy.get(Order.stat).click();
        }
      });

    }
}

function orderLab (isEdit = false, od) {
  cy.get(Order.labUrgency).click();
  cy.get(Order.option).contains(od.urgency).click()
  if (od.detail.length > 0) {
    cy.get(Order.labNote).clear();
    cy.get(Order.labNote).type(od.detail);
  }
  if (od.urgency == "Future") {
    cy.get(Order.labDate).clear();
    cy.get(Order.labDate).type(od.date);
    if (isEdit == true) {
      cy.get(Order.labTime).should('be.visible')
      cy.get(Order.labTime).click();
    }
    cy.get(Order.labTime).click();
    cy.get(Order.labHour).type(od.hour);
    cy.get(Order.labMinute).type(od.minute);
    cy.get(Order.labButtonApply).click();
  }
  if(!isEdit) cy.get(Order.addMed).click();
}

function orderActivity(isEdit = false, od) {
  cy.get(Order.activityUrgency).click();
  cy.get(Order.option).contains(od.urgency).click()
  if (od.detail.length > 0) {
    cy.get(Order.activityNote).type(od.detail);
  }
  if (od.urgency == "Future") {
    cy.get(Order.activityDate).clear();
    cy.get(Order.activityDate).type(od.date);
    cy.get(Order.activityFrequency).clear();
    cy.get(Order.activityFrequency).type(od.frequency);
  } else if (od.urgency == "Routine"){
    cy.get(Order.activityFrequency).clear();
    cy.get(Order.activityFrequency).type(od.frequency);
  }
  if(!isEdit) cy.get(Order.addMed).click();
}

function addTemplate (template) {
  cy.intercept('/emr-api/note-templates/*').as('getTemplate')
  if (template) {
    cy.get(Order.template).click()
    cy.get(Order.templateSearch).clear()
    cy.get(Order.templateSearch).type(template)
    cy.wait('@getTemplate').then(() => {
      cy.get(Order.templateItem).click()
      cy.get(Order.templateButtonSubmit).click()
      cy.get(Order.toast).should('have.text', 'คัดลอกสำเร็จ');
      cy.get(Order.toast).should('not.be.visible');
    })
  }
}

function addLicenseNumber (licenseNumber) {
  if(licenseNumber) {
    cy.get(Order.licenseNumber).clear()
    cy.get(Order.licenseNumber).type(licenseNumber)
    cy.get(Order.option).contains(licenseNumber).click()
  }
}

export function submitOrder(isEdit = false) {
  cy.get(Order.buttonSubmit).click();
  if (isEdit)
    cy.get(Order.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else
    cy.get(Order.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(Order.toast).should('not.be.visible');
}

export function editOrder(
  orderType = 'oneDay',
  myFixture = 'edit-order.json',
) {
  if(orderType == 'oneDay')
    cy.get(Order.oneDayOrder).as('orderMed')
  else if (orderType == 'continue') {
    cy.get(Order.oneDayOrder).as('orderMed')
  }
  cy.intercept('emr-api/medications/by-ids').as('medicationId')
  cy.fixture(myFixture).then((d) => {
    let om = d.med
    for (let i = 0; i < om.length; i++) {
      cy.get('@orderMed').find(Order.medItem).contains(om[i].name).scrollIntoView()
      cy.get('@orderMed').contains(Order.medItem, om[i].name).find(Order.ellipsis).click()
      cy.get(Order.editMedButton).click()
      cy.wait('@medicationId')
      orderMed(true, om[i])
      submitOrder();
    }
    let os = d.supply
    for (let i = 0; i < os.length; i++) {
      cy.get('@orderMed').find(Order.medItem).contains(os[i].name).scrollIntoView()
      cy.get('@orderMed').contains(Order.medItem, os[i].name).find(Order.ellipsis).click({ force: true })
      cy.get(Order.editMedButton).click()
      cy.wait('@medicationId')
      cy.get(Order.orderDetail).clear()
      cy.get(Order.orderDetail).type(os[i].detail)
      orderMed(true, os[i])
      submitOrder();
    }
    let ol = d.lab
    for (let i = 0; i < ol.length; i++) {
      cy.get('@orderMed').find(Order.labItem).contains(ol[i].name).scrollIntoView()
      cy.get('@orderMed').contains(Order.labItem, ol[i].name).find(Order.ellipsis).click()
      cy.get(Order.editLabButton).click()
      orderLab(true, ol[i])
      submitOrder();
    }
  })
}

export function viewOneDay(myFixture = 'order.json') {
  cy.fixture(myFixture).then((d) => {
    let od = d.one_day;
    let odLength = od.length - 1;
    let j = 0;
    for (let i = odLength; i >= 0; i--) {
      if (od[i].time.perform_time != 'now') {
        let myDate = od[i].time.perform_date;
        const arrayTime = myDate.split('/');
        const arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        let odDate = arrayTime.join('/');
        let odTime = `${odDate}, ${od[i].time.perform_hour}:${od[i].time.perform_minute}`;
        cy.get(Order.view_perform_time)
          .eq(j)
          .should('have.text', odTime);
      }
      cy.get(Order.view_subjective)
        .eq(j)
        .should('have.text', od[i].subjective);
      cy.get(Order.view_objective)
        .eq(j)
        .should('have.text', od[i].objective);
      cy.get(Order.view_assessment)
        .eq(j)
        .should('have.text', od[i].assessment);
      cy.get(Order.view_plan)
        .eq(j)
        .should('have.text', od[i].plan);
      j++;
    }
  });
}
