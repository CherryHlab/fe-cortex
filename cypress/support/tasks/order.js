/// <reference types="cypress" />
import { Order } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigateOneDay() {
  cy.get(PatientPage.oneDayOrderForm).click();
  cy.get(Order.oneDayHeader).should('be.visible');
}

export function navigateContinue() {
  cy.get(PatientPage.continueOrderForm).click();
  cy.get(Order.continueHeader).should('be.visible');
}

export function navigateOneDayPage() {
  cy.get(PatientPage.orderPage).click();
  cy.get(Order.title).should('have.text', 'Order');
}

export function addOrder(orderType = 'oneDay', myFixture = 'order.json') {
  cy.intercept('medication-api/drug-administration/catalogs').as('medCatalogs');
  cy.fixture(myFixture).then((d) => {
    let om = d.med;
    if (orderType == 'oneDay') navigateOneDay();
    else if (orderType == 'continue') navigateContinue();
    cy.wait('@medCatalogs');
    for (let i = 0; i < om.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(om[i].name);
      cy.get(Order.option).contains(om[i].name).click();
      // cy.get(Order.option).first().click()
      orderMed(false, om[i]);
    }
    let os = d.supply;
    for (let i = 0; i < os.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(os[i].name);
      cy.get(Order.option).first().click();
      orderMed(false, os[i]);
    }
    let ol = d.lab;
    for (let i = 0; i < ol.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(ol[i].name);
      cy.get(Order.option).first().click();
      orderLab(false, ol[i]);
    }
    let oa = d.activity;
    for (let i = 0; i < oa.length; i++) {
      cy.get(Order.orderSearch).clear();
      cy.get(Order.orderSearch).type(oa[i].name);
      cy.get(Order.activityAddButton).click();
      orderActivity(false, oa[i]);
    }
    addTemplate(false, orderType, d.template, d.licenseNumber);
    // addLicenseNumber(d.licenseNumber)
    submitOrder(true);
  });
}

function orderMed(isEdit = false, od) {
  if (od.allergy == true && isEdit == false) {
    cy.get(Order.allergyTitle).should('have.text', 'Drug Alert');
    cy.get(Order.drugName).should('have.text', od.name);
    cy.get(Order.allergyReason).clear();
    cy.get(Order.allergyReason).type(od.allergyReason);
    cy.get(Order.allergySubmit).click();
  } else if (od.allergy == true && isEdit == true) {
    cy.get(Order.allergySymbol).click();
    cy.get(Order.allergyReason).clear();
    cy.get(Order.allergyReason).type(od.allergyReason);
    cy.get(Order.allergySubmit).click();
  }
  checkModal(isEdit, od);
  if (!isEdit) cy.get(Order.addMed).click();
}

function checkModal(isEdit = false, od) {
  if (od.autoModal == true && isEdit == false) {
    // cy.get(Order.buttonPopupSymbol).click(); //Wait for fix auto modal
    cy.get(Order.modalInstruction).clear();
    cy.get(Order.modalInstruction).type(od.instruction);
    cy.get(Order.modalStat)
      .invoke('attr', 'data-state')
      .then((state) => {
        if (state == 'unchecked' && od.stat == true) {
          cy.get(Order.modalStat).click();
        } else if (state == 'checked' && od.stat == false) {
          cy.get(Order.modalStat).click();
        }
      });
    cy.get(Order.modalReason).click({ force: true });
    cy.get(Order.option).contains(od.reason).click();
    cy.get(Order.modalDiagnosis).type(od.diagnosis);
    cy.get(Order.modalDoctorNumber).type(od.doctorNumber);
    cy.get(Order.option).contains(od.doctorNumber).click();
    cy.get(Order.modalSubmit).click();
  } else if (od.autoModal == true && isEdit == true) {
    cy.get(Order.buttonPopupSymbol).click();
    cy.get(Order.modalInstruction).clear();
    cy.get(Order.modalInstruction).type(od.instruction);
    cy.get(Order.modalStat)
      .invoke('attr', 'data-state')
      .then((state) => {
        if (state == 'unchecked' && od.stat == true) {
          cy.get(Order.modalStat).click();
        } else if (state == 'checked' && od.stat == false) {
          cy.get(Order.modalStat).click();
        }
      });
    cy.get(Order.modalReason).click({ force: true });
    cy.get(Order.option).contains(od.reason).click();
    cy.get(Order.modalDiagnosis).clear();
    cy.get(Order.modalDiagnosis).type(od.diagnosis);
    cy.get(Order.modalDoctorNumber).clear();
    cy.get(Order.modalDoctorNumber).type(od.doctorNumber);
    cy.get(Order.option).contains(od.doctorNumber).click();
    cy.get(Order.modalSubmit).click();
  } else {
    cy.get(Order.orderInstruction).clear();
    cy.get(Order.orderInstruction).type(od.instruction);
    cy.get(Order.stat)
      .invoke('attr', 'data-state')
      .then((state) => {
        if (state == 'unchecked' && od.stat == true) {
          cy.get(Order.stat).click();
        } else if (state == 'checked' && od.stat == false) {
          cy.get(Order.stat).click();
        }
      });
  }
  if (od.detail) {
    cy.get(Order.medDetail).parent().find('input').last().as('medDetail');
    cy.get('@medDetail').clear({ force: true });
    cy.get('@medDetail').type(od.detail, { force: true });
  }
}

function orderLab(isEdit = false, od) {
  cy.get(Order.labUrgency).click();
  cy.get(Order.labSelect).contains(od.urgency).click();
  if (od.detail.length > 0) {
    cy.get(Order.labNote).clear();
    cy.get(Order.labNote).type(od.detail);
  }
  if (od.urgency == 'Future') {
    cy.get(Order.labDate).clear();
    cy.get(Order.labDate).type(od.date);
    if (isEdit == true) {
      cy.get(Order.labTime).should('be.visible');
      // cy.get(Order.labTime).click();
    }
    cy.get(Order.labTime).click();
    cy.get(Order.labButtonReset).click();
    cy.get(Order.labHour).type(od.hour);
    cy.get(Order.labMinute).type(od.minute);
    cy.get(Order.labButtonApply).click();
  }
  if (!isEdit) cy.get(Order.addMed).click();
}

function orderActivity(isEdit = false, od) {
  cy.get(Order.activityUrgency).click();
  cy.get(Order.option).contains(od.urgency).click();
  if (od.detail.length > 0) {
    cy.get(Order.activityNote).clear();
    cy.get(Order.activityNote).type(od.detail);
  }
  if (od.urgency == 'Future') {
    cy.get(Order.activityDate).clear();
    cy.get(Order.activityDate).type(od.date);
    cy.get(Order.activityFrequency).clear();
    cy.get(Order.activityFrequency).type(od.frequency);
  } else if (od.urgency == 'Routine') {
    cy.get(Order.activityFrequency).clear();
    cy.get(Order.activityFrequency).type(od.frequency);
  }
  if (!isEdit) cy.get(Order.addMed).click();
}

function addTemplate(isEdit = false, orderType, template, licenseNumber) {
  cy.intercept('/emr-api/note-templates/*').as('getTemplate');
  if (orderType == 'oneDay') cy.get(Order.oneDayOrder).as('orderMed');
  else if (orderType == 'continue') {
    cy.get(Order.continueOrder).as('orderMed');
  }

  if (template && isEdit == true) {
    cy.get('@orderMed')
      .find(Order.additionalOrder)
      .find(Order.ellipsis)
      .click();
    cy.get('@orderMed').find(Order.editAdditionalOrder).click();
  }
  cy.get(Order.template).click();
  cy.get(Order.templateSearch).clear();
  cy.get(Order.templateSearch).type(template);
  cy.wait('@getTemplate').then(() => {
    cy.get(Order.templateItem).should('have.length', 1);
    cy.get(Order.templateItem).click();
    cy.get(Order.templateButtonSubmit).click();
    cy.get(Order.toast).should('have.text', 'คัดลอกสำเร็จ');
    cy.get(Order.toastTitle).should('not.exist');
    cy.get(Order.toast).should('not.be.visible');
  });
  addLicenseNumber(licenseNumber);
  if (isEdit) submitOrder();
}

function deleteTemplate(template) {
  if (!template) {
    cy.get(Order.additionalOrder).find(Order.ellipsis).click();
    cy.get(Order.buttonDeleteAdditionalOrder).click();
    deleteSuccess();
  }
}

function addLicenseNumber(licenseNumber) {
  if (licenseNumber) {
    cy.get(Order.licenseNumber).clear();
    cy.get(Order.licenseNumber).type(licenseNumber);
    cy.get(Order.option).contains(licenseNumber).click();
  } else {
    cy.get(Order.licenseNumber).clear();
  }
}

export function submitOrder(isEdit = false) {
  cy.get(Order.buttonSubmit).click();
  if (isEdit) cy.get(Order.toast).should('have.text', 'บันทึกข้อมูลสำเร็จ');
  else cy.get(Order.toast).should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  cy.get(Order.toastTitle).should('not.exist');
  cy.get(Order.toast).should('not.be.visible');
}

function deleteSuccess() {
  cy.get(Order.toast).should('have.text', 'ยกเลิก Order สำเร็จ');
  cy.get(Order.toastTitle).should('not.exist');
  cy.get(Order.toast).should('not.be.visible');
}

export function editOrder(orderType = 'oneDay', myFixture = 'edit-order.json') {
  if (orderType == 'oneDay') cy.get(Order.oneDayOrder).as('orderMed');
  else if (orderType == 'continue') {
    cy.get(Order.continueOrder).as('orderMed');
  }
  cy.intercept('emr-api/medications/by-ids').as('medicationId');
  cy.fixture(myFixture).then((d) => {
    let om = d.med;
    for (let i = 0; i < om.length; i++) {
      cy.get('@orderMed')
        .find(Order.medItem)
        .contains(om[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.medItem, om[i].name)
        .find(Order.ellipsis)
        .click();
      cy.get(Order.editMedButton).click();
      cy.wait('@medicationId');
      orderMed(true, om[i]);
      submitOrder();
    }
    let os = d.supply;
    for (let i = 0; i < os.length; i++) {
      cy.get('@orderMed')
        .find(Order.medItem)
        .contains(os[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.medItem, os[i].name)
        .find(Order.ellipsis)
        .click({ force: true });
      cy.get(Order.editMedButton).click();
      cy.wait('@medicationId');
      cy.get(Order.orderInstruction).clear();
      cy.get(Order.orderInstruction).type(os[i].instruction);
      orderMed(true, os[i]);
      submitOrder();
    }
    let ol = d.lab;
    for (let i = 0; i < ol.length; i++) {
      cy.get('@orderMed')
        .find(Order.labItem)
        .contains(ol[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.labItem, ol[i].name)
        .find(Order.ellipsis)
        .click();
      cy.get(Order.editLabButton).click();
      orderLab(true, ol[i]);
      submitOrder();
    }
    let oa = d.activity;
    for (let i = 0; i < oa.length; i++) {
      cy.get('@orderMed')
        .find(Order.activityItem)
        .contains(oa[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.activityItem, oa[i].name)
        .find(Order.ellipsis)
        .click();
      cy.get(Order.editActivityButton).click();
      orderActivity(true, oa[i]);
      submitOrder();
    }
    addTemplate(true, orderType, d.template, d.licenseNumber);
  });
}

export function removeOrder(
  orderType = 'oneDay',
  myFixture = 'remove-one-day-order',
) {
  if (orderType == 'oneDay') cy.get(Order.oneDayOrder).as('orderMed');
  else if (orderType == 'continue') {
    cy.get(Order.continueOrder).as('orderMed');
  }
  cy.intercept('DELETE', 'emr-api/ipd/orders').as('medicationDelete');
  cy.fixture(myFixture).then((d) => {
    let om = d.med;
    for (let i = 0; i < om.length; i++) {
      cy.get('@orderMed')
        .find(Order.medItem)
        .contains(om[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.medItem, om[i].name)
        .find(Order.ellipsis)
        .click();
      cy.get(Order.buttonDelete).click();
      deleteSuccess();
    }
    let os = d.supply;
    for (let i = 0; i < os.length; i++) {
      cy.get('@orderMed')
        .find(Order.medItem)
        .contains(os[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.medItem, os[i].name)
        .find(Order.ellipsis)
        .click({ force: true });
      cy.get(Order.buttonDelete).click();
      deleteSuccess();
    }
    let ol = d.lab;
    for (let i = 0; i < ol.length; i++) {
      cy.get('@orderMed')
        .find(Order.labItem)
        .contains(ol[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.labItem, ol[i].name)
        .find(Order.ellipsis)
        .click();
      cy.get(Order.buttonDeleteLab).click();
      deleteSuccess();
    }
    let oa = d.activity;
    for (let i = 0; i < oa.length; i++) {
      cy.get('@orderMed')
        .find(Order.activityItem)
        .contains(oa[i].name)
        .scrollIntoView();
      cy.get('@orderMed')
        .contains(Order.activityItem, oa[i].name)
        .find(Order.ellipsis)
        .click();
      cy.get(Order.buttonDeleteActivity).click();
      deleteSuccess();
    }
    deleteTemplate(d.template);
  });
}

function checkViewOrder(item) {
  if (item.stat) {
    cy.get('@medItem').find(Order.medStat).should('be.visible');
    cy.get('@medItem').find(Order.medStat).should('have.text', 'STAT');
  }
  if (item.allergy) {
    cy.get('@medItem').find(Order.medAllergy).should('be.visible');
    cy.get('@medItem').find(Order.medAllergy).should('have.text', 'A');
  }
  if (item.reason && item.diagnosis && item.doctorNumber && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should(
        'have.text',
        `${item.reason}, ${item.diagnosis}, ว. ${item.doctorNumber}, ${item.detail}`,
      );
  } else if (item.reason && item.doctorNumber && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should(
        'have.text',
        `${item.reason}, ว. ${item.doctorNumber}, ${item.detail}`,
      );
  } else if (item.reason && item.diagnosis && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.reason}, ${item.diagnosis}, ${item.detail}`);
  } else if (item.reason && item.diagnosis && item.doctorNumber) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should(
        'have.text',
        `${item.reason}, ${item.diagnosis}, ว. ${item.doctorNumber}`,
      );
  } else if (item.reason && item.diagnosis) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.reason}, ${item.diagnosis}`);
  } else if (item.reason && item.doctorNumber) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.reason}, ว. ${item.doctorNumber}`);
  } else if (item.reason && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.reason}, ${item.detail}`);
  } else if (item.reason) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.reason}`);
  } else if (item.diagnosis && item.doctorNumber && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should(
        'have.text',
        `${item.diagnosis}, ว. ${item.doctorNumber}, ${item.detail}`,
      );
  } else if (item.diagnosis && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.diagnosis}, ${item.detail}`);
  } else if (item.diagnosis && item.doctorNumber) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.diagnosis}, ว. ${item.doctorNumber}`);
  } else if (item.diagnosis) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.diagnosis}`);
  } else if (item.doctorNumber && item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `ว. ${item.doctorNumber}, ${item.detail}`);
  } else if (item.doctorNumber) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `ว. ${item.doctorNumber}`);
  } else if (item.detail) {
    cy.get('@medItem').find(Order.medDescriptionTag).should('be.visible');
    cy.get('@medItem')
      .find(Order.medDescriptionTag)
      .should('have.text', `${item.detail}`);
  }
}

export function viewOrder(orderType = 'oneDay', myFixture = 'order.json') {
  if (orderType == 'oneDay') cy.get(Order.oneDayOrder).as('orderMed');
  else if (orderType == 'continue') {
    cy.get(Order.continueOrder).as('orderMed');
  }
  cy.fixture(myFixture).then((d) => {
    let om = d.med;
    for (let i = 0; i < om.length; i++) {
      let medName = om[i].name.trim();
      cy.get('@orderMed').find(Order.medItem).contains(medName).as('medName');
      cy.get('@medName').parentsUntil(Order.medItem).parent().as('medItem');
      cy.get('@medItem').find(Order.medName).scrollIntoView();
      cy.get('@medItem').find(Order.medName).should('have.text', medName);
      cy.get('@medItem')
        .find(Order.medDescription)
        .should('have.text', om[i].instruction);
      checkViewOrder(om[i]);
    }
    let os = d.supply;
    for (let i = 0; i < os.length; i++) {
      let medSupply = os[i].name.trim();
      cy.get('@orderMed').find(Order.medItem).contains(medSupply).as('medName');
      cy.get('@medName').parentsUntil(Order.medItem).parent().as('medItem');
      cy.get('@medItem').find(Order.medName).scrollIntoView();
      cy.get('@medItem').find(Order.medName).should('have.text', medSupply);
      cy.get('@medItem')
        .find(Order.medDescription)
        .should('have.text', os[i].instruction);
      checkViewOrder(os[i]);
    }
    let ol = d.lab;
    for (let i = 0; i < ol.length; i++) {
      let labName = ol[i].name.trim();
      let myDate = '';
      let arrayTime = [];
      let arrayLength = 0;
      let olDate = [];
      let olTime = '';

      cy.get('@orderMed').find(Order.labItem).contains(labName).as('labName');
      cy.get('@labName').parentsUntil(Order.labItem).parent().as('labItem');
      cy.get('@labItem').find(Order.labName).scrollIntoView();
      cy.get('@labItem').find(Order.labName).should('have.text', labName);
      if (ol[i].urgency != 'Routine') {
        cy.get('@labItem').find(Order.labUrgencyTag).should('be.visible');
        if (ol[i].urgency == 'Fast track') {
          let labUrgency = 'Fast Track';
          cy.get('@labItem')
            .find(Order.labUrgencyTag)
            .should('have.text', labUrgency);
        } else {
          cy.get('@labItem')
            .find(Order.labUrgencyTag)
            .should('have.text', ol[i].urgency);
        }
      }
      if (ol[i].urgency == 'Future') {
        myDate = ol[i].date;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        olDate = arrayTime.join('/');
        olTime = `${olDate}, ${ol[i].hour}:${ol[i].minute}`;
      }
      if (ol[i].urgency == 'Future' && ol[i].detail) {
        cy.get('@labItem').find(Order.labDescription).should('be.visible');
        cy.get('@labItem')
          .find(Order.labDescription)
          .should('have.text', `วันที่สั่งเก็บ ${olTime}, ${ol[i].detail}`);
      } else if (ol[i].detail) {
        cy.get('@labItem').find(Order.labDescription).should('be.visible');
        cy.get('@labItem')
          .find(Order.labDescription)
          .should('have.text', `${ol[i].detail}`);
      } else if (ol[i].urgency == 'Future') {
        cy.get('@labItem').find(Order.labDescription).should('be.visible');
        cy.get('@labItem')
          .find(Order.labDescription)
          .should('have.text', `วันที่สั่งเก็บ ${olTime}`);
      }
    }
    let oa = d.activity;
    for (let i = 0; i < oa.length; i++) {
      let activityName = oa[i].name.trim();
      let myDate = '';
      let arrayTime = [];
      let arrayLength = 0;
      let oaDate = [];

      cy.get('@orderMed')
        .find(Order.activityItem)
        .contains(activityName)
        .as('activityName');
      cy.get('@activityName')
        .parentsUntil(Order.activityItem)
        .parent()
        .as('activityItem');
      cy.get('@activityItem').find(Order.activityName).scrollIntoView();
      cy.get('@activityItem')
        .find(Order.activityName)
        .should('have.text', activityName);
      if (oa[i].urgency != 'Routine') {
        cy.get('@activityItem').find(Order.activityTag).should('be.visible');
        cy.get('@activityItem')
          .find(Order.activityTag)
          .should('have.text', oa[i].urgency);
      }
      if (oa[i].urgency == 'Future') {
        myDate = oa[i].date;
        arrayTime = myDate.split('/');
        arrayLength = arrayTime.length - 1;
        arrayTime[arrayLength] = Number(arrayTime[arrayLength]) + 543;
        oaDate = arrayTime.join('/');
      }
      if (oa[i].urgency == 'Future' && oa[i].detail) {
        cy.get('@activityItem')
          .find(Order.activityDescription)
          .should('be.visible');
        cy.get('@activityItem')
          .find(Order.activityDescription)
          .should('have.text', `วันที่สั่งให้ทำ ${oaDate}, ${oa[i].detail}`);
      } else if (oa[i].detail) {
        cy.get('@activityItem')
          .find(Order.activityDescription)
          .should('be.visible');
        cy.get('@activityItem')
          .find(Order.activityDescription)
          .should('have.text', `${oa[i].detail}`);
      } else if (oa[i].urgency == 'Future') {
        cy.get('@activityItem')
          .find(Order.activityDescription)
          .should('be.visible');
        cy.get('@activityItem')
          .find(Order.activityDescription)
          .should('have.text', `วันที่สั่งให้ทำ ${oaDate}`);
      }
    }
  });
}
