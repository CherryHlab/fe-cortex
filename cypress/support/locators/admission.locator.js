export default {
  admission_note_header:
    'button[data-testid="tab-trigger-add_doctor_admission_note"]',

  chief_complaint:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/reason_for_encounter/presenting_problem-label"]',
  present_illness:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/history_of_present_illness/any_event/story-label"]',
  initial_diagnosis:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/diagnosis/diagnosis_name-label"]',
  past_history:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/history_of_past_illness/any_event/story-label"]',
  family_history:
    'textarea[aria-labelledby="doctor_admission_note/family_history/family_history/summary-label"]',
  history_of_drug_allergy:
    '[aria-labelledby="generic-layout_group-2705772|0/generic-layout_group-2845799|0/generic-coded_text-6837067-label"]',
  history_of_other_allergy:
    '[aria-labelledby="generic-layout_group-2705772|0/generic-layout_group-1713758|0/generic-coded_text-3642432-label"]',

  //Drug allergy
  type_of_allergy:
    '[data-ehr-path="doctor_admission_note/adverse_reaction_list/adverse_drug_reaction_risk/category"] input',
  option_of_selection: '[role="option"]',
  allergic:
    '[data-ehr-path="doctor_admission_note/adverse_reaction_list/adverse_drug_reaction_risk/substance"] input',
  symptom:
    '[aria-labelledby="doctor_admission_note/adverse_reaction_list/adverse_drug_reaction_risk/adverse_reaction_event/reaction_description-label"]',
  button_add_more:
    '[aria-controls="adverse_drug_reaction_risk-container-content"] [aria-label="Add container"]',
  button_remove_more:
    '[aria-controls="adverse_drug_reaction_risk-container-content"] [aria-label="Remove container"]',

  //Other allergy
  type_of_other_allergy:
    '[data-ehr-path="doctor_admission_note/adverse_reaction_list/adverse_reaction_risk/category"] input',
  other_allergic:
    'textarea[aria-labelledby="doctor_admission_note/adverse_reaction_list/adverse_reaction_risk/substance-label"]',
  other_symptom:
    'textarea[aria-labelledby="doctor_admission_note/adverse_reaction_list/adverse_reaction_risk/adverse_reaction_event/reaction_description-label"]',
  button_add_other:
    '[aria-controls="adverse_reaction_risk-container-content"] [aria-label="Add container"]',
  button_remove_other:
    '[aria-controls="adverse_reaction_risk-container-content"] [aria-label="Remove container"]',

  physical_exam:
    '[aria-labelledby="doctor_admission_note/examination_findings/physical_examination_findings/any_event/description-label"]',
  template_selection: '[role="combobox"]:last > input',
  template_input: '.ck-content',

  toast_submit: 'ol',

  //View admission note
  view_admission_note:
    '[data-testid="admission-note-card-item-value-container"]',
  view_allergy_display:
    '[data-testid="past-illess-allergy-display-needtoreplace"]',
  view_allergy_allergen:
    '[data-testid="past-illess-allergy-allergen-needtoreplace"]',
  view_allergy_reaction:
    '[data-testid="past-illess-allergy-reaction-needtoreplace"]',

  button_set_today: '.set-today-button',
  button_edit: '[data-testid="edit-button"]',
  button_submit: '[data-testid="submit-btn"]',
};
