export default {
  preAssessmentHeader: '[data-testid="tab-trigger-add_nurse_pre_assessment"]',

  performDate:
    '[data-ehr-path="nurse_pre_assessment/context/perform_time/specific_datetime"] [placeholder="dd/MM/yyyy"]',
  performHour:
    '[data-ehr-path="nurse_pre_assessment/context/perform_time/specific_datetime"] input[aria-label="Hours"]',
  performMinute:
    '[data-ehr-path="nurse_pre_assessment/context/perform_time/specific_datetime"] input[aria-label="Minutes"]',
  buttonSetToday: '.set-today-button',

  receive:
    '[aria-labelledby="nurse_pre_assessment/administration_information/arrival/referral_source-label"] input[id^=needtoreplace]',
  receiveDetail: 'textarea[aria-labelledby="generic-input_text-256715-label"]',
  arrive:
    '[aria-labelledby="nurse_pre_assessment/administration_information/arrival/entry_mode-label"] input[id^=needtoreplace]',
  informat:
    '[aria-labelledby="generic-layout_group-5935930|0/generic-layout_group-4579871|0/generic-coded_text-1360392-label"] input[id^=needtoreplace]',
  informatDetail:
    'textarea[aria-labelledby="generic-input_text-4930012-label"]',

  systolic:
    '[data-ehr-path="nurse_pre_assessment/vital_signs/blood_pressure/systolic"] input',
  diastolic:
    '[data-ehr-path="nurse_pre_assessment/vital_signs/blood_pressure/diastolic"] input',
  pr: '[data-ehr-path="nurse_pre_assessment/vital_signs/pulse_heart_beat/rate"] input',
  rr: '[data-ehr-path="nurse_pre_assessment/vital_signs/respiration/rate"] input',
  bt: '[data-ehr-path="nurse_pre_assessment/vital_signs/body_temperature/temperature"] input',
  spo: '[data-ehr-path="nurse_pre_assessment/vital_signs/pulse_oximetry/spo"] input',
  height:
    '[data-ehr-path="nurse_pre_assessment/weight_height/height_length/height_length"] input',
  weight:
    '[data-ehr-path="nurse_pre_assessment/weight_height/body_weight/weight"] input.form-control',
  weightType:
    '[data-ehr-path="nurse_pre_assessment/weight_height/body_weight/weight"] ng-select',

  chiefComplaint:
    'textarea[aria-labelledby="nurse_pre_assessment/patients_background/reason_for_encounter/presenting_problem-label"]',
  presentIllness:
    'textarea[aria-labelledby="nurse_pre_assessment/patients_background/history_of_present_illness/any_event/story-label"]',
  nursingDiagnosis:
    'textarea[aria-labelledby="nurse_pre_assessment/patients_background/nursing_diagnosis/clinical_description-label"]',
  pastHistory:
    'textarea[aria-labelledby="nurse_pre_assessment/patients_background/history_of_past_illness/any_event/story-label"]',
  familyHistory:
    'textarea[aria-labelledby="nurse_pre_assessment/family_history/family_history/summary-label"]',

  congenitalDisease:
    '[aria-labelledby="generic-layout_group-4774268|0/generic-layout_group-2852235|0/generic-coded_text-2956593-label"] input[id^=needtoreplace]',
  congenitalDiseaseDetail:
    'textarea[aria-labelledby="nurse_pre_assessment/patients_background/past_problem_diagnosis/clinical_description-label"]',

  historyOfDrugAllergy:
    '[aria-labelledby="generic-layout_group-4774268|0/generic-layout_group-5224977|0/generic-coded_text-9292707-label"]',
  historyOfOtherAllergy:
    '[aria-labelledby="generic-layout_group-4774268|0/generic-layout_group-2267332|0/generic-coded_text-6418018-label"]',

  //Drug_allergy
  typeOfDrug:
    '[data-ehr-path="nurse_pre_assessment/adverse_reaction_list/adverse_drug_reaction_risk/category"] input',
  optionOfSelection: '[role="option"]',
  allergic:
    '[data-ehr-path="nurse_pre_assessment/adverse_reaction_list/adverse_drug_reaction_risk/substance"] input',
  symptom:
    'textarea[aria-labelledby="nurse_pre_assessment/adverse_reaction_list/adverse_drug_reaction_risk/adverse_reaction_event/reaction_description-label"]',
  buttonAddMore:
    '[aria-controls="adverse_drug_reaction_risk-container-content"] [aria-label="Add container"]',
  buttonRemoveMore:
    '[aria-controls="adverse_drug_reaction_risk-container-content"] [aria-label="Remove container"]',

  //Other allrgey
  typeOfOtherAllergy:
    '[data-ehr-path="nurse_pre_assessment/adverse_reaction_list/adverse_reaction_risk/category"] input',
  otherAllergic:
    'textarea[aria-labelledby="nurse_pre_assessment/adverse_reaction_list/adverse_reaction_risk/substance-label"]',
  otherSymptom:
    'textarea[aria-labelledby="nurse_pre_assessment/adverse_reaction_list/adverse_reaction_risk/adverse_reaction_event/reaction_description-label"]',
  buttonAddOther:
    '[aria-controls="adverse_reaction_risk-container-content"] [aria-label="Add container"]',
  buttonRemveOther:
    '[aria-controls="adverse_reaction_risk-container-content"] [aria-label="Remove container"]',

  //Health history
  cigarette:
    '[aria-labelledby="nurse_pre_assessment/life_style_risk_assessment/substance_use_screening_questionnaire/specific_substance|0/used/coded_text_value-label"] [id^=needtoreplace]',
  spirits:
    '[aria-labelledby="nurse_pre_assessment/life_style_risk_assessment/substance_use_screening_questionnaire/specific_substance|1/used/coded_text_value-label"] [id^=needtoreplace]',
  narcotic:
    '[aria-labelledby="nurse_pre_assessment/life_style_risk_assessment/substance_use_screening_questionnaire/specific_substance|2/used/coded_text_value-label"] [id^=needtoreplace]',
  lifeStyleRisk:
    'textarea[aria-labelledby="nurse_pre_assessment/life_style_risk_assessment/substance_use_screening_questionnaire/specific_substance/comment-label"]', // Have 3

  //Evaluate physical examination
  e: '[data-ehr-path="nurse_pre_assessment/physical_examination/glasgow_coma_scale_gcs/best_eye_response_e/ordinal_value"] input',
  v: '[data-ehr-path="nurse_pre_assessment/physical_examination/glasgow_coma_scale_gcs/best_verbal_response_v/ordinal_value"] input',
  m: '[data-ehr-path="nurse_pre_assessment/physical_examination/glasgow_coma_scale_gcs/best_motor_response_m/ordinal_value"] input',
  total:
    '[aria-labelledby="nurse_pre_assessment/physical_examination/glasgow_coma_scale_gcs/total_score-label"]',
  skin: '[aria-labelledby="nurse_pre_assessment/physical_examination/physical_examination_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  bone: '[aria-labelledby="nurse_pre_assessment/physical_examination/physical_examination_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  physicalExam:
    'textarea[aria-labelledby="nurse_pre_assessment/physical_examination/physical_examination_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', // Have 2

  //Breathing and blood circulation
  pulse:
    '[aria-labelledby="nurse_pre_assessment/respiratory_and_blood_circulation/respiratory_and_blood_circulation_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  breathe:
    '[aria-labelledby="nurse_pre_assessment/respiratory_and_blood_circulation/respiratory_and_blood_circulation_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  respiratoryAndBlood:
    'textarea[aria-labelledby="nurse_pre_assessment/respiratory_and_blood_circulation/respiratory_and_blood_circulation_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 2

  //Self help
  vision:
    '[aria-labelledby="nurse_pre_assessment/self-care/self-care_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  speak:
    '[aria-labelledby="nurse_pre_assessment/self-care/self-care_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  movement:
    '[aria-labelledby="nurse_pre_assessment/self-care/self-care_screening_questionnaire/any_event/specific_symptom_sign|2/presence/coded_text_value-label"] input[id^=needtoreplace]',
  selfCare:
    'textarea[aria-labelledby="nurse_pre_assessment/self-care/self-care_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 3

  //Nutritional status
  weightLoss:
    '[aria-labelledby="nurse_pre_assessment/nutritional_risk/nutrition_risk_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  foodLess:
    '[aria-labelledby="nurse_pre_assessment/nutritional_risk/nutrition_risk_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  bmi: '[aria-labelledby="nurse_pre_assessment/nutritional_risk/nutrition_risk_screening_questionnaire/any_event/specific_symptom_sign|2/presence/coded_text_value-label"] input[id^=needtoreplace]',
  crisis:
    '[aria-labelledby="nurse_pre_assessment/nutritional_risk/nutrition_risk_screening_questionnaire/any_event/specific_symptom_sign|3/presence/coded_text_value-label"] input[id^=needtoreplace]',
  nutritionalRisk:
    'textarea[aria-labelledby="nurse_pre_assessment/nutritional_risk/nutrition_risk_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 4

  //Eating
  drinkingWater:
    '[aria-labelledby="nurse_pre_assessment/meal/meal_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  appetite:
    '[aria-labelledby="nurse_pre_assessment/meal/meal_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  howToFeed:
    '[aria-labelledby="nurse_pre_assessment/meal/meal_screening_questionnaire/any_event/specific_symptom_sign|2/presence/coded_text_value-label"] input[id^=needtoreplace]',
  oralCavity:
    '[aria-labelledby="nurse_pre_assessment/meal/meal_screening_questionnaire/any_event/specific_symptom_sign|3/presence/coded_text_value-label"] input[id^=needtoreplace]',
  foodType:
    '[aria-labelledby="nurse_pre_assessment/meal/meal_screening_questionnaire/any_event/specific_symptom_sign|4/presence/coded_text_value-label"] input[id^=needtoreplace]',
  meal: 'textarea[aria-labelledby="nurse_pre_assessment/meal/meal_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]',

  //Waste excretion system
  urine:
    '[aria-labelledby="nurse_pre_assessment/excretory_system_risk/excretory_system_risk_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  stool:
    '[aria-labelledby="nurse_pre_assessment/excretory_system_risk/excretory_system_risk_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  excretorySystemRisk:
    'textarea[aria-labelledby="nurse_pre_assessment/excretory_system_risk/excretory_system_risk_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 2

  //Reproductive system
  lmp: '[data-ehr-path="nurse_pre_assessment/reproductive_system_risk/last_menstrual_period/date_of_onset_lmp"] [placeholder="dd/MM/yyyy"]',
  menstruationProblems:
    '[aria-labelledby="nurse_pre_assessment/reproductive_system_risk/reproductive_system_risk_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  contraception:
    '[aria-labelledby="nurse_pre_assessment/reproductive_system_risk/reproductive_system_risk_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  pregnancy:
    '[aria-labelledby="nurse_pre_assessment/reproductive_system_risk/reproductive_system_risk_screening_questionnaire/any_event/specific_symptom_sign|2/presence/coded_text_value-label"] input[id^=needtoreplace]',
  reproductiveSystemRisk:
    'textarea[aria-labelledby="nurse_pre_assessment/reproductive_system_risk/reproductive_system_risk_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 3

  //Symptoms and risks
  disturbing:
    '[aria-labelledby="nurse_pre_assessment/care_risk/care_risk_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  riskOfFalls:
    '[aria-labelledby="nurse_pre_assessment/care_risk/care_risk_screening_questionnaire/any_event/specific_symptom_sign|1/presence/coded_text_value-label"] input[id^=needtoreplace]',
  pressureSoreRisk:
    '[aria-labelledby="nurse_pre_assessment/care_risk/care_risk_screening_questionnaire/any_event/specific_symptom_sign|2/presence/coded_text_value-label"] input[id^=needtoreplace]',
  symptomsAndRisk:
    'textarea[aria-labelledby="nurse_pre_assessment/care_risk/care_risk_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 3

  //Advice
  knowledge:
    '[aria-labelledby="nurse_pre_assessment/education_risk/education_risk_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  advice:
    'textarea[aria-labelledby="nurse_pre_assessment/education_risk/education_risk_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 1

  //Mental, social and emotional state
  emotion:
    '[aria-labelledby="nurse_pre_assessment/social_risk/social_risk_screening_questionnaire/any_event/specific_symptom_sign|0/presence/coded_text_value-label"] input[id^=needtoreplace]',
  emotionRisk:
    'textarea[aria-labelledby="nurse_pre_assessment/social_risk/social_risk_screening_questionnaire/any_event/specific_symptom_sign/comment-label"]', //Have 1

  templateSelection: '[role="combobox"]:last > input',
  templateInput: '.ck-content',

  //View Page
  viewContent: '[data-testid="pre-assessment-card-item-value-container"]',

  toastSubmit: 'ol',
  listOption: '[role="option"]',

  buttonEdit: '[data-testid="edit-button"]',
  buttonCancel: '[data-testid="cancel-btn"]',
  buttonSubmit: '[data-testid="submit-btn"]',
};
