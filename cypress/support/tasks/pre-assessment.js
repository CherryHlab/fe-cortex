/// <reference types="cypress" />
import { PreAssessment } from '../locators';
import { PatientPage } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigatePreAssessment() {
  cy.get(PatientPage.preAssessmentForm).click();
  cy.get(PreAssessment.preAssessmentHeader).should('be.visible');
}

export function navigatePreAssessmentPage() {
  cy.get(PatientPage.preAssessmentPage).click();
  cy.get(PatientPage.title).should('have.text', 'Pre-Assessment');
}

export function addPreAssessment(myFixture = 'pre-assessment.json') {
  cy.fixture(myFixture).then((d) => {
    const pa = d.preAssessment;
    // cy.get(PreAssessment.performDate).should('not.be.empty');
    let receive = PreAssessment.receive.replace('needtoreplace', pa.receive);
    cy.get(receive).check({ force: true });

    if (pa.time.performDate == 'now') {
      cy.get(PreAssessment.buttonSetToday).click();
    } else {
      cy.get(PreAssessment.performDate).clear();
      cy.get(PreAssessment.performDate).type(pa.time.performDate);

      cy.get(PreAssessment.performHour).clear();
      cy.get(PreAssessment.performHour).type(pa.time.performHour);

      cy.get(PreAssessment.performMinute).clear();
      cy.get(PreAssessment.performMinute).type(pa.time.performMinute);
    }

    cy.get(PreAssessment.receiveDetail).clear();
    cy.get(PreAssessment.receiveDetail).type(pa.receiveDetail);

    let arrive = PreAssessment.arrive.replace('needtoreplace', pa.arrive);
    cy.get(arrive).check({ force: true });

    let informat = PreAssessment.informat.replace('needtoreplace', pa.informat);
    cy.get(informat).check({ force: true });

    cy.get(PreAssessment.informatDetail).clear();
    cy.get(PreAssessment.informatDetail).type(pa.informatDetail);

    cy.get(PreAssessment.systolic).clear();
    cy.get(PreAssessment.systolic).type(pa.systolic);

    cy.get(PreAssessment.diastolic).clear();
    cy.get(PreAssessment.diastolic).type(pa.diastolic);

    cy.get(PreAssessment.pr).clear();
    cy.get(PreAssessment.pr).type(pa.pr);

    cy.get(PreAssessment.rr).clear();
    cy.get(PreAssessment.rr).type(pa.rr);

    cy.get(PreAssessment.bt).clear();
    cy.get(PreAssessment.bt).type(pa.bt);

    cy.get(PreAssessment.spo).clear();
    cy.get(PreAssessment.spo).type(pa.spo);

    cy.get(PreAssessment.height).clear();
    cy.get(PreAssessment.height).type(pa.height);

    cy.get(PreAssessment.weight).clear();
    cy.get(PreAssessment.weight).type(pa.weight);

    cy.get(PreAssessment.weightType).click();
    if (pa.weightType == 'kg') cy.get(PreAssessment.listOption).first().click();
    else cy.get(PreAssessment.listOption).last().click();

    cy.get(PreAssessment.chiefComplaint).clear();
    cy.get(PreAssessment.chiefComplaint).type(pa.chiefComplaint);

    cy.get(PreAssessment.presentIllness).clear();
    cy.get(PreAssessment.presentIllness).type(pa.presentIllness);

    cy.get(PreAssessment.nursingDiagnosis).clear();
    cy.get(PreAssessment.nursingDiagnosis).type(pa.nursingDiagnosis);

    cy.get(PreAssessment.pastHistory).clear();
    cy.get(PreAssessment.pastHistory).type(pa.pastHistory);

    cy.get(PreAssessment.familyHistory).clear();
    cy.get(PreAssessment.familyHistory).type(pa.familyHistory);

    let congenitalDisease = PreAssessment.congenitalDisease.replace(
      'needtoreplace',
      pa.congenitalDisease,
    );
    cy.get(congenitalDisease).check({ force: true });

    cy.get(PreAssessment.congenitalDiseaseDetail).clear();
    cy.get(PreAssessment.congenitalDiseaseDetail).type(
      pa.congenitalDiseaseDetail,
    );

    //Drug allergy
    let drugAllergy = pa.historyOfDrugAllergy;
    if (drugAllergy.length > 0) {
      cy.get(PreAssessment.historyOfDrugAllergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      cy.get(PreAssessment.typeOfDrug).then((list) => {
        if (list.length > drugAllergy.length) {
          for (let i = 0; i < drugAllergy.length; i++) {
            cy.get(PreAssessment.buttonRemoveMore).last().click();
          }
        }
      });
      for (let i = 0; i < drugAllergy.length; i++) {
        cy.get(PreAssessment.typeOfDrug)
          .eq(i)
          .type(drugAllergy[i].typeOfDrug, { force: true });
        cy.get(PreAssessment.optionOfSelection).eq(0).click();
        cy.get(PreAssessment.allergic)
          .eq(i)
          .type(drugAllergy[i].medication, { force: true });
        cy.get(PreAssessment.optionOfSelection).eq(0).click();
        cy.get(PreAssessment.symptom).eq(i).clear();
        cy.get(PreAssessment.symptom).eq(i).type(drugAllergy[i].symptom);
        if (i + 1 < drugAllergy.length)
          cy.get(PreAssessment.buttonAddMore).click();
      }
    } else {
      cy.get(PreAssessment.historyOfDrugAllergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }

    //Other allergy
    let otherAllergy = pa.otherAllergy;
    if (otherAllergy.length > 0) {
      cy.get(PreAssessment.historyOfOtherAllergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      cy.get(PreAssessment.typeOfOtherAllergy).then((list) => {
        if (list.length > otherAllergy.length) {
          for (let i = 0; i < otherAllergy.length; i++) {
            cy.get(PreAssessment.buttonRemoveOther).last().click();
          }
        }
      });
      for (let i = 0; i < otherAllergy.length; i++) {
        cy.get(PreAssessment.typeOfOtherAllergy)
          .eq(i)
          .type(otherAllergy[i].typeOfOther, { force: true });
        cy.get(PreAssessment.optionOfSelection).eq(0).click();
        cy.get(PreAssessment.otherAllergic).eq(i).clear();
        cy.get(PreAssessment.otherAllergic)
          .eq(i)
          .type(otherAllergy[i].otherThing);
        cy.get(PreAssessment.otherSymptom).eq(i).clear();
        cy.get(PreAssessment.otherSymptom)
          .eq(i)
          .type(otherAllergy[i].otherSymptom);
        if (i + 1 < otherAllergy.length)
          cy.get(PreAssessment.buttonAddOther).click();
      }
    } else {
      cy.get(PreAssessment.historyOfOtherAllergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }

    let cigarette = PreAssessment.cigarette.replace(
      'needtoreplace',
      pa.cigarette,
    );
    cy.get(cigarette).check({ force: true });
    let spirits = PreAssessment.spirits.replace('needtoreplace', pa.spirits);
    cy.get(spirits).check({ force: true });
    let narcotic = PreAssessment.narcotic.replace('needtoreplace', pa.narcotic);
    cy.get(narcotic).check({ force: true });
    if (pa.lifeStyleRisk.length > 0) {
      for (let i = 0; i < pa.lifeStyleRisk.length; i++) {
        cy.get(PreAssessment.lifeStyleRisk).eq(i).clear({ force: true });
        if (pa.lifeStyleRisk[i])
          cy.get(PreAssessment.lifeStyleRisk)
            .eq(i)
            .type(pa.lifeStyleRisk[i], { force: true });
      }
    }

    cy.get(PreAssessment.e).click({ force: true });
    cy.get(PreAssessment.e).type(pa.e, { force: true });
    cy.get(PreAssessment.optionOfSelection).eq(0).click();
    cy.get(PreAssessment.v).click({ force: true });
    cy.get(PreAssessment.v).type(pa.v, { force: true });
    cy.get(PreAssessment.optionOfSelection).eq(0).click();
    cy.get(PreAssessment.m).click({ force: true });
    cy.get(PreAssessment.m).type(pa.m, { force: true });
    cy.get(PreAssessment.optionOfSelection).eq(0).click();

    let skin = PreAssessment.skin.replace('needtoreplace', pa.skin);
    cy.get(skin).check({ force: true });
    let bone = PreAssessment.bone.replace('needtoreplace', pa.bone);
    cy.get(bone).check({ force: true });

    if (pa.physicalExam.length > 0) {
      for (let i = 0; i < pa.physicalExam.length; i++) {
        cy.get(PreAssessment.physicalExam).eq(i).clear({ force: true });
        if (pa.physicalExam[i])
          cy.get(PreAssessment.physicalExam)
            .eq(i)
            .type(pa.physicalExam[i], { force: true });
      }
    }

    let pulse = PreAssessment.pulse.replace('needtoreplace', pa.pulse);
    cy.get(pulse).check({ force: true });
    let breathe = PreAssessment.breathe.replace('needtoreplace', pa.breathe);
    cy.get(breathe).check({ force: true });
    if (pa.respiratoryAndBlood.length > 0) {
      for (let i = 0; i < pa.respiratoryAndBlood.length; i++) {
        cy.get(PreAssessment.respiratoryAndBlood).eq(i).clear({ force: true });
        if (pa.respiratoryAndBlood[i])
          cy.get(PreAssessment.respiratoryAndBlood)
            .eq(i)
            .type(pa.respiratoryAndBlood[i], { force: true });
      }
    }

    let vision = PreAssessment.vision.replace('needtoreplace', pa.vision);
    cy.get(vision).check({ force: true });
    let speak = PreAssessment.speak.replace('needtoreplace', pa.speak);
    cy.get(speak).check({ force: true });
    let movement = PreAssessment.movement.replace('needtoreplace', pa.movement);
    cy.get(movement).check({ force: true });
    if (pa.selfCare.length > 0) {
      for (let i = 0; i < pa.selfCare.length; i++) {
        cy.get(PreAssessment.selfCare).eq(i).clear({ force: true });
        if (pa.selfCare[i])
          cy.get(PreAssessment.selfCare)
            .eq(i)
            .type(pa.selfCare[i], { force: true });
      }
    }

    let weightLoss = PreAssessment.weightLoss.replace(
      'needtoreplace',
      pa.weightLoss,
    );
    cy.get(weightLoss).check({ force: true });
    let foodLess = PreAssessment.foodLess.replace('needtoreplace', pa.foodLess);
    cy.get(foodLess).check({ force: true });
    let bmi = PreAssessment.bmi.replace('needtoreplace', pa.bmi);
    cy.get(bmi).check({ force: true });
    let crisis = PreAssessment.crisis.replace('needtoreplace', pa.crisis);
    cy.get(crisis).check({ force: true });
    if (pa.nutritionalRisk.length > 0) {
      for (let i = 0; i < pa.nutritionalRisk.length; i++) {
        cy.get(PreAssessment.nutritionalRisk).eq(i).clear({ force: true });
        if (pa.nutritionalRisk[i])
          cy.get(PreAssessment.nutritionalRisk)
            .eq(i)
            .type(pa.nutritionalRisk[i], { force: true });
      }
    }

    let drinkingWater = PreAssessment.drinkingWater.replace(
      'needtoreplace',
      pa.drinkingWater,
    );
    cy.get(drinkingWater).check({ force: true });
    let appetite = PreAssessment.appetite.replace('needtoreplace', pa.appetite);
    cy.get(appetite).check({ force: true });
    let howToFeed = PreAssessment.howToFeed.replace(
      'needtoreplace',
      pa.howToFeed,
    );
    cy.get(howToFeed).check({ force: true });
    let oralCavity = PreAssessment.oralCavity.replace(
      'needtoreplace',
      pa.oralCavity,
    );
    cy.get(oralCavity).check({ force: true });
    let foodType = PreAssessment.foodType.replace('needtoreplace', pa.foodType);
    cy.get(foodType).check({ force: true });
    if (pa.meal.length > 0) {
      for (let i = 0; i < pa.meal.length; i++) {
        cy.get(PreAssessment.meal).eq(i).clear({ force: true });
        if (pa.meal[i])
          cy.get(PreAssessment.meal).eq(i).type(pa.meal[i], { force: true });
      }
    }

    let urine = PreAssessment.urine.replace('needtoreplace', pa.urine);
    cy.get(urine).check({ force: true });
    let stool = PreAssessment.stool.replace('needtoreplace', pa.stool);
    cy.get(stool).check({ force: true });
    if (pa.excretorySystemRisk.length > 0) {
      for (let i = 0; i < pa.excretorySystemRisk.length; i++) {
        cy.get(PreAssessment.excretorySystemRisk).eq(i).clear({ force: true });
        if (pa.excretorySystemRisk[i])
          cy.get(PreAssessment.excretorySystemRisk)
            .eq(i)
            .type(pa.excretorySystemRisk[i], { force: true });
      }
    }

    if (pa.lmp) {
      cy.get(PreAssessment.lmp).clear();
      cy.get(PreAssessment.lmp).type(pa.lmp);
    }
    let menstruationProblems = PreAssessment.menstruationProblems.replace(
      'needtoreplace',
      pa.menstruationProblems,
    );
    cy.get(menstruationProblems).check({ force: true });
    let contraception = PreAssessment.contraception.replace(
      'needtoreplace',
      pa.contraception,
    );
    cy.get(contraception).check({ force: true });
    let pregnancy = PreAssessment.pregnancy.replace(
      'needtoreplace',
      pa.pregnancy,
    );
    cy.get(pregnancy).check({ force: true });
    if (pa.reproductiveSystemRisk.length > 0) {
      for (let i = 0; i < pa.reproductiveSystemRisk.length; i++) {
        cy.get(PreAssessment.reproductiveSystemRisk)
          .eq(i)
          .clear({ force: true });
        if (pa.reproductiveSystemRisk[i])
          cy.get(PreAssessment.reproductiveSystemRisk)
            .eq(i)
            .type(pa.reproductiveSystemRisk[i], { force: true });
      }
    }

    let disturbing = PreAssessment.disturbing.replace(
      'needtoreplace',
      pa.disturbing,
    );
    cy.get(disturbing).check({ force: true });
    let riskOfFalls = PreAssessment.riskOfFalls.replace(
      'needtoreplace',
      pa.riskOfFalls,
    );
    cy.get(riskOfFalls).check({ force: true });
    let pressureSoreRisk = PreAssessment.pressureSoreRisk.replace(
      'needtoreplace',
      pa.pressureSoreRisk,
    );
    cy.get(pressureSoreRisk).check({ force: true });
    if (pa.symptomsAndRisk.length > 0) {
      for (let i = 0; i < pa.symptomsAndRisk.length; i++) {
        cy.get(PreAssessment.symptomsAndRisk).eq(i).clear({ force: true });
        if (pa.symptomsAndRisk[i])
          cy.get(PreAssessment.symptomsAndRisk)
            .eq(i)
            .type(pa.symptomsAndRisk[i], { force: true });
      }
    }

    let knowledge = PreAssessment.knowledge.replace(
      'needtoreplace',
      pa.knowledge,
    );
    cy.get(knowledge).check({ force: true });
    if (pa.advice.length > 0) {
      for (let i = 0; i < pa.advice.length; i++) {
        cy.get(PreAssessment.advice).eq(i).clear({ force: true });
        if (pa.advice[i])
          cy.get(PreAssessment.advice)
            .eq(i)
            .type(pa.advice[i], { force: true });
      }
    }

    let emotion = PreAssessment.emotion.replace('needtoreplace', pa.emotion);
    cy.get(emotion).check({ force: true });
    if (pa.emotionRisk.length > 0) {
      for (let i = 0; i < pa.emotionRisk.length; i++) {
        cy.get(PreAssessment.emotionRisk).eq(i).clear({ force: true });
        if (pa.emotionRisk[i])
          cy.get(PreAssessment.emotionRisk)
            .eq(i)
            .type(pa.emotionRisk[i], { force: true });
      }
    }

    if (pa.template.length != 0) {
      cy.get(PreAssessment.templateSelection).clear({ force: true });
      cy.get(PreAssessment.templateSelection).click({ force: true });
      cy.get(PreAssessment.templateSelection).type(pa.template, {
        force: true,
      });
      cy.get(PreAssessment.optionOfSelection).eq(0).click();

      cy.wait(3000); // can't use another that why i use wait with time. (ckEditor so slow to re-render)
      cy.get(PreAssessment.templateInput).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData);
        const ckEditorData = editor.getData();
        return cy.wrap(ckData).as('ckData');
      });
    }
    if (pa.templateDetail.length != 0) {
      cy.get(PreAssessment.templateInput).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData.concat(d.templateDetail));
        const ckEditorData = editor.getData();
        return cy.wrap(ckEditorData).as('ckData');
      });
    }
  });
}

export function submitPreAssessment(isEdit = false) {
  cy.get(PreAssessment.buttonSubmit).click();
  if (isEdit) {
    cy.get(PreAssessment.toastSubmit)
      .first()
      .should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  } else {
    cy.get(PreAssessment.toastSubmit)
      .first()
      .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  }
  cy.get(PreAssessment.toastSubmit).first().should('not.be.visible');
}

export function editPreAssessment(myFixture = 'edit-pre-assessment.json') {
  cy.get(PreAssessment.buttonEdit).click();
  addPreAssessment(myFixture);
}

export function viewPreAssessment(myFixture = 'view-pre-assessment.json') {
  cy.fixture(myFixture).then((d) => {
    const pa = d.preAssessment;
    const paLength = pa.length;
    cy.reload();
    for (let i = 0; i < paLength; i++) {
      // cy.get(PreAssessment.viewContent).eq(i).should('have.text',pa[i]);
      cy.get(PreAssessment.viewContent).eq(i).contains(pa[i]);
    }
  });
}
