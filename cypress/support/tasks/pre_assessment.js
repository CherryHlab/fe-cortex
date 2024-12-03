/// <reference types="cypress" />
import { Pre_assessment } from '../locators';
import { Patient_page } from '../locators';

Cypress.config('defaultCommandTimeout', 50000);

export function navigatePreAssessment() {
  cy.get(Patient_page.pre_assessment_form).click();
  cy.get(Pre_assessment.pre_assessment_header).should('be.visible');
}

export function navigatePreAssessmentPage() {
  cy.get(Patient_page.pre_assessment_page).click();
  cy.get(Patient_page.title).should('have.text', 'Pre-Assessment');
}

export function addPreAssessment(myFixture = 'pre-assessment.json') {
  cy.fixture(myFixture).then((d) => {
    const pa = d.pre_assessment;
    // cy.get(Pre_assessment.perform_date).should('not.be.empty');
    let receive = Pre_assessment.receive.replace('needtoreplace', pa.receive);
    cy.get(receive).check({ force: true });

    if (pa.time.perform_date == 'now') {
      cy.get(Pre_assessment.button_set_today).click();
    } else {
      cy.get(Pre_assessment.perform_date).clear();
      cy.get(Pre_assessment.perform_date).type(pa.time.perform_date);

      cy.get(Pre_assessment.perform_hour).clear();
      cy.get(Pre_assessment.perform_hour).type(pa.time.perform_hour);

      cy.get(Pre_assessment.perform_minute).clear();
      cy.get(Pre_assessment.perform_minute).type(pa.time.perform_minute);
    }

    cy.get(Pre_assessment.receive_detail).clear();
    cy.get(Pre_assessment.receive_detail).type(pa.receive_detail);

    let arrive = Pre_assessment.arrive.replace('needtoreplace', pa.arrive);
    cy.get(arrive).check({ force: true });

    let informat = Pre_assessment.informat.replace(
      'needtoreplace',
      pa.informat,
    );
    cy.get(informat).check({ force: true });

    cy.get(Pre_assessment.informat_detail).clear();
    cy.get(Pre_assessment.informat_detail).type(pa.informat_detail);

    cy.get(Pre_assessment.systolic).clear();
    cy.get(Pre_assessment.systolic).type(pa.systolic);

    cy.get(Pre_assessment.diastolic).clear();
    cy.get(Pre_assessment.diastolic).type(pa.diastolic);

    cy.get(Pre_assessment.pr).clear();
    cy.get(Pre_assessment.pr).type(pa.pr);

    cy.get(Pre_assessment.rr).clear();
    cy.get(Pre_assessment.rr).type(pa.rr);

    cy.get(Pre_assessment.bt).clear();
    cy.get(Pre_assessment.bt).type(pa.bt);

    cy.get(Pre_assessment.spo).clear();
    cy.get(Pre_assessment.spo).type(pa.spo);

    cy.get(Pre_assessment.height).clear();
    cy.get(Pre_assessment.height).type(pa.height);

    cy.get(Pre_assessment.weight).clear();
    cy.get(Pre_assessment.weight).type(pa.weight);

    cy.get(Pre_assessment.weight_type).click();
    if (pa.weight_type == 'kg')
      cy.get(Pre_assessment.list_option).first().click();
    else cy.get(Pre_assessment.list_option).last().click();

    cy.get(Pre_assessment.chief_complaint).clear();
    cy.get(Pre_assessment.chief_complaint).type(pa.chief_complaint);

    cy.get(Pre_assessment.present_illness).clear();
    cy.get(Pre_assessment.present_illness).type(pa.present_illness);

    cy.get(Pre_assessment.nursing_diagnosis).clear();
    cy.get(Pre_assessment.nursing_diagnosis).type(pa.nursing_diagnosis);

    cy.get(Pre_assessment.past_history).clear();
    cy.get(Pre_assessment.past_history).type(pa.past_history);

    cy.get(Pre_assessment.family_history).clear();
    cy.get(Pre_assessment.family_history).type(pa.family_history);

    let congenital_disease = Pre_assessment.congenital_disease.replace(
      'needtoreplace',
      pa.congenital_disease,
    );
    cy.get(congenital_disease).check({ force: true });

    cy.get(Pre_assessment.congenital_disease_detail).clear();
    cy.get(Pre_assessment.congenital_disease_detail).type(
      pa.congenital_disease_detail,
    );

    //Drug allergy
    let drug_allergy = pa.history_of_drug_allergy;
    if (drug_allergy.length > 0) {
      cy.get(Pre_assessment.history_of_drug_allergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      cy.get(Pre_assessment.type_of_drug).then((list) => {
        if (list.length > drug_allergy.length) {
          for (let i = 0; i < drug_allergy.length; i++) {
            cy.get(Pre_assessment.button_remove_more).last().click();
          }
        }
      });
      for (let i = 0; i < drug_allergy.length; i++) {
        cy.get(Pre_assessment.type_of_drug)
          .eq(i)
          .type(drug_allergy[i].type_of_drug, { force: true });
        cy.get(Pre_assessment.option_of_selection).eq(0).click();
        cy.get(Pre_assessment.allergic)
          .eq(i)
          .type(drug_allergy[i].medication, { force: true });
        cy.get(Pre_assessment.option_of_selection).eq(0).click();
        cy.get(Pre_assessment.symptom).eq(i).clear();
        cy.get(Pre_assessment.symptom).eq(i).type(drug_allergy[i].symptom);
        if (i + 1 < drug_allergy.length)
          cy.get(Pre_assessment.button_add_more).click();
      }
    } else {
      cy.get(Pre_assessment.history_of_drug_allergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }

    //Other allergy
    let other_allergy = pa.other_allergy;
    if (other_allergy.length > 0) {
      cy.get(Pre_assessment.history_of_other_allergy)
        .eq(1)
        .find('input')
        .check({ force: true });
      cy.get(Pre_assessment.type_of_other_allergy).then((list) => {
        if (list.length > other_allergy.length) {
          for (let i = 0; i < other_allergy.length; i++) {
            cy.get(Pre_assessment.button_remove_other).last().click();
          }
        }
      });
      for (let i = 0; i < other_allergy.length; i++) {
        cy.get(Pre_assessment.type_of_other_allergy)
          .eq(i)
          .type(other_allergy[i].type_of_other, { force: true });
        cy.get(Pre_assessment.option_of_selection).eq(0).click();
        cy.get(Pre_assessment.other_allergic).eq(i).clear();
        cy.get(Pre_assessment.other_allergic)
          .eq(i)
          .type(other_allergy[i].other_thing);
        cy.get(Pre_assessment.other_symptom).eq(i).clear();
        cy.get(Pre_assessment.other_symptom)
          .eq(i)
          .type(other_allergy[i].other_symptom);
        if (i + 1 < other_allergy.length)
          cy.get(Pre_assessment.button_add_other).click();
      }
    } else {
      cy.get(Pre_assessment.history_of_other_allergy)
        .eq(0)
        .find('input')
        .check({ force: true });
    }

    let cigarette = Pre_assessment.cigarette.replace(
      'needtoreplace',
      pa.cigarette,
    );
    cy.get(cigarette).check({ force: true });
    let spirits = Pre_assessment.spirits.replace('needtoreplace', pa.spirits);
    cy.get(spirits).check({ force: true });
    let narcotic = Pre_assessment.narcotic.replace(
      'needtoreplace',
      pa.narcotic,
    );
    cy.get(narcotic).check({ force: true });
    if (pa.life_style_risk.length > 0) {
      for (let i = 0; i < pa.life_style_risk.length; i++) {
        cy.get(Pre_assessment.life_style_risk).eq(i).clear({ force: true });
        if (pa.life_style_risk[i])
          cy.get(Pre_assessment.life_style_risk)
            .eq(i)
            .type(pa.life_style_risk[i], { force: true });
      }
    }

    cy.get(Pre_assessment.e).click({ force: true });
    cy.get(Pre_assessment.e).type(pa.e, { force: true });
    cy.get(Pre_assessment.option_of_selection).eq(0).click();
    cy.get(Pre_assessment.v).click({ force: true });
    cy.get(Pre_assessment.v).type(pa.v, { force: true });
    cy.get(Pre_assessment.option_of_selection).eq(0).click();
    cy.get(Pre_assessment.m).click({ force: true });
    cy.get(Pre_assessment.m).type(pa.m, { force: true });
    cy.get(Pre_assessment.option_of_selection).eq(0).click();

    let skin = Pre_assessment.skin.replace('needtoreplace', pa.skin);
    cy.get(skin).check({ force: true });
    let bone = Pre_assessment.bone.replace('needtoreplace', pa.bone);
    cy.get(bone).check({ force: true });

    if (pa.physical_exam.length > 0) {
      for (let i = 0; i < pa.physical_exam.length; i++) {
        cy.get(Pre_assessment.physical_exam).eq(i).clear({ force: true });
        if (pa.physical_exam[i])
          cy.get(Pre_assessment.physical_exam)
            .eq(i)
            .type(pa.physical_exam[i], { force: true });
      }
    }

    let pulse = Pre_assessment.pulse.replace('needtoreplace', pa.pulse);
    cy.get(pulse).check({ force: true });
    let breathe = Pre_assessment.breathe.replace('needtoreplace', pa.breathe);
    cy.get(breathe).check({ force: true });
    if (pa.respiratory_and_blood.length > 0) {
      for (let i = 0; i < pa.respiratory_and_blood.length; i++) {
        cy.get(Pre_assessment.respiratory_and_blood)
          .eq(i)
          .clear({ force: true });
        if (pa.respiratory_and_blood[i])
          cy.get(Pre_assessment.respiratory_and_blood)
            .eq(i)
            .type(pa.respiratory_and_blood[i], { force: true });
      }
    }

    let vision = Pre_assessment.vision.replace('needtoreplace', pa.vision);
    cy.get(vision).check({ force: true });
    let speak = Pre_assessment.speak.replace('needtoreplace', pa.speak);
    cy.get(speak).check({ force: true });
    let movement = Pre_assessment.movement.replace(
      'needtoreplace',
      pa.movement,
    );
    cy.get(movement).check({ force: true });
    if (pa.self_care.length > 0) {
      for (let i = 0; i < pa.self_care.length; i++) {
        cy.get(Pre_assessment.self_care).eq(i).clear({ force: true });
        if (pa.self_care[i])
          cy.get(Pre_assessment.self_care)
            .eq(i)
            .type(pa.self_care[i], { force: true });
      }
    }

    let weight_loss = Pre_assessment.weight_loss.replace(
      'needtoreplace',
      pa.weight_loss,
    );
    cy.get(weight_loss).check({ force: true });
    let food_less = Pre_assessment.food_less.replace(
      'needtoreplace',
      pa.food_less,
    );
    cy.get(food_less).check({ force: true });
    let bmi = Pre_assessment.bmi.replace('needtoreplace', pa.bmi);
    cy.get(bmi).check({ force: true });
    let crisis = Pre_assessment.crisis.replace('needtoreplace', pa.crisis);
    cy.get(crisis).check({ force: true });
    if (pa.nutritional_risk.length > 0) {
      for (let i = 0; i < pa.nutritional_risk.length; i++) {
        cy.get(Pre_assessment.nutritional_risk).eq(i).clear({ force: true });
        if (pa.nutritional_risk[i])
          cy.get(Pre_assessment.nutritional_risk)
            .eq(i)
            .type(pa.nutritional_risk[i], { force: true });
      }
    }

    let drinking_water = Pre_assessment.drinking_water.replace(
      'needtoreplace',
      pa.drinking_water,
    );
    cy.get(drinking_water).check({ force: true });
    let appetite = Pre_assessment.appetite.replace(
      'needtoreplace',
      pa.appetite,
    );
    cy.get(appetite).check({ force: true });
    let how_to_feed = Pre_assessment.how_to_feed.replace(
      'needtoreplace',
      pa.how_to_feed,
    );
    cy.get(how_to_feed).check({ force: true });
    let oral_cavity = Pre_assessment.oral_cavity.replace(
      'needtoreplace',
      pa.oral_cavity,
    );
    cy.get(oral_cavity).check({ force: true });
    let food_type = Pre_assessment.food_type.replace(
      'needtoreplace',
      pa.food_type,
    );
    cy.get(food_type).check({ force: true });
    if (pa.meal.length > 0) {
      for (let i = 0; i < pa.meal.length; i++) {
        cy.get(Pre_assessment.meal).eq(i).clear({ force: true });
        if (pa.meal[i])
          cy.get(Pre_assessment.meal).eq(i).type(pa.meal[i], { force: true });
      }
    }

    let urine = Pre_assessment.urine.replace('needtoreplace', pa.urine);
    cy.get(urine).check({ force: true });
    let stool = Pre_assessment.stool.replace('needtoreplace', pa.stool);
    cy.get(stool).check({ force: true });
    if (pa.excretory_system_risk.length > 0) {
      for (let i = 0; i < pa.excretory_system_risk.length; i++) {
        cy.get(Pre_assessment.excretory_system_risk)
          .eq(i)
          .clear({ force: true });
        if (pa.excretory_system_risk[i])
          cy.get(Pre_assessment.excretory_system_risk)
            .eq(i)
            .type(pa.excretory_system_risk[i], { force: true });
      }
    }

    if (pa.lmp) {
      cy.get(Pre_assessment.lmp).clear();
      cy.get(Pre_assessment.lmp).type(pa.lmp);
    }
    let menstruation_problems = Pre_assessment.menstruation_problems.replace(
      'needtoreplace',
      pa.menstruation_problems,
    );
    cy.get(menstruation_problems).check({ force: true });
    let contraception = Pre_assessment.contraception.replace(
      'needtoreplace',
      pa.contraception,
    );
    cy.get(contraception).check({ force: true });
    let pregnancy = Pre_assessment.pregnancy.replace(
      'needtoreplace',
      pa.pregnancy,
    );
    cy.get(pregnancy).check({ force: true });
    if (pa.reproductive_system_risk.length > 0) {
      for (let i = 0; i < pa.reproductive_system_risk.length; i++) {
        cy.get(Pre_assessment.reproductive_system_risk)
          .eq(i)
          .clear({ force: true });
        if (pa.reproductive_system_risk[i])
          cy.get(Pre_assessment.reproductive_system_risk)
            .eq(i)
            .type(pa.reproductive_system_risk[i], { force: true });
      }
    }

    let disturbing = Pre_assessment.disturbing.replace(
      'needtoreplace',
      pa.disturbing,
    );
    cy.get(disturbing).check({ force: true });
    let risk_of_falls = Pre_assessment.risk_of_falls.replace(
      'needtoreplace',
      pa.risk_of_falls,
    );
    cy.get(risk_of_falls).check({ force: true });
    let pressure_sore_risk = Pre_assessment.pressure_sore_risk.replace(
      'needtoreplace',
      pa.pressure_sore_risk,
    );
    cy.get(pressure_sore_risk).check({ force: true });
    if (pa.symptoms_and_risk.length > 0) {
      for (let i = 0; i < pa.symptoms_and_risk.length; i++) {
        cy.get(Pre_assessment.symptoms_and_risk).eq(i).clear({ force: true });
        if (pa.symptoms_and_risk[i])
          cy.get(Pre_assessment.symptoms_and_risk)
            .eq(i)
            .type(pa.symptoms_and_risk[i], { force: true });
      }
    }

    let knowledge = Pre_assessment.knowledge.replace(
      'needtoreplace',
      pa.knowledge,
    );
    cy.get(knowledge).check({ force: true });
    if (pa.advice.length > 0) {
      for (let i = 0; i < pa.advice.length; i++) {
        cy.get(Pre_assessment.advice).eq(i).clear({ force: true });
        if (pa.advice[i])
          cy.get(Pre_assessment.advice)
            .eq(i)
            .type(pa.advice[i], { force: true });
      }
    }

    let emotion = Pre_assessment.emotion.replace('needtoreplace', pa.emotion);
    cy.get(emotion).check({ force: true });
    if (pa.emotion_risk.length > 0) {
      for (let i = 0; i < pa.emotion_risk.length; i++) {
        cy.get(Pre_assessment.emotion_risk).eq(i).clear({ force: true });
        if (pa.emotion_risk[i])
          cy.get(Pre_assessment.emotion_risk)
            .eq(i)
            .type(pa.emotion_risk[i], { force: true });
      }
    }

    if (pa.template.length != 0) {
      cy.get(Pre_assessment.template_selection).clear({ force: true });
      cy.get(Pre_assessment.template_selection).click({ force: true });
      cy.get(Pre_assessment.template_selection).type(pa.template, {
        force: true,
      });
      cy.get(Pre_assessment.option_of_selection).eq(0).click();

      cy.wait(3000); // can't use another that why i use wait with time. (ckEditor so slow to re-render)
      cy.get(Pre_assessment.template_input).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData);
        const ckEditorData = editor.getData();
        return cy.wrap(ckData).as('ckData');
      });
    }
    if (pa.template_detail.length != 0) {
      cy.get(Pre_assessment.template_input).then((el) => {
        const editor = el[0].ckeditorInstance;
        const ckData = editor.getData();
        editor.setData(ckData.concat(d.template_detail));
        const ckEditorData = editor.getData();
        return cy.wrap(ckEditorData).as('ckData');
      });
    }
  });
}

export function submitPreAssessment(isEdit = false) {
  cy.get(Pre_assessment.button_submit).click();
  if (isEdit) {
    cy.get(Pre_assessment.toast_submit)
      .first()
      .should('have.text', 'แก้ไขข้อมูลสำเร็จ');
  } else {
    cy.get(Pre_assessment.toast_submit)
      .first()
      .should('have.text', 'บันทึกข้อมูลสำเร็จ');
  }
  cy.get(Pre_assessment.toast_submit).first().should('not.be.visible');
}

export function editPreAssessment(myFixture = 'edit_pre-assessment.json') {
  cy.get(Pre_assessment.button_edit).click();
  addPreAssessment(myFixture);
}

export function viewPreAssessment(myFixture = 'view_pre-assessment.json') {
  cy.fixture(myFixture).then((d) => {
    const pa = d.pre_assessment;
    const paLength = pa.length;
    cy.reload();
    for (let i = 0; i < paLength; i++) {
      // cy.get(Pre_assessment.view_content).eq(i).should('have.text',pa[i]);
      cy.get(Pre_assessment.view_content).eq(i).contains(pa[i]);
    }
  });
}
