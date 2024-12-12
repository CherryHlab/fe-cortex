export default {
  admissionNoteHeader:
    'button[data-testid="tab-trigger-add_doctor_admission_note"]',

  chiefComplaint:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/reason_for_encounter/presenting_problem-label"]',
  presentIllness:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/history_of_present_illness/any_event/story-label"]',
  initialDiagnosis:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/diagnosis/diagnosis_name-label"]',
  pastHistory:
    'textarea[aria-labelledby="doctor_admission_note/patients_background/history_of_past_illness/any_event/story-label"]',
  familyHistory:
    'textarea[aria-labelledby="doctor_admission_note/family_history/family_history/summary-label"]',
  historyOfDrugAllergy:
    '[aria-labelledby="generic-layout_group-2705772|0/generic-layout_group-2845799|0/generic-coded_text-6837067-label"]',
  historyOfOtherAllergy:
    '[aria-labelledby="generic-layout_group-2705772|0/generic-layout_group-1713758|0/generic-coded_text-3642432-label"]',

  //Drug allergy
  typeOfAllergy:
    '[data-ehr-path="doctor_admission_note/adverse_reaction_list/adverse_drug_reaction_risk/category"] input',
  optionOfSelection: '[role="option"]',
  allergic:
    '[data-ehr-path="doctor_admission_note/adverse_reaction_list/adverse_drug_reaction_risk/substance"] input',
  symptom:
    '[aria-labelledby="doctor_admission_note/adverse_reaction_list/adverse_drug_reaction_risk/adverse_reaction_event/reaction_description-label"]',
  buttonAddMore:
    '[aria-controls="adverse_drug_reaction_risk-container-content"] [aria-label="Add container"]',
  buttonRemoveMore:
    '[aria-controls="adverse_drug_reaction_risk-container-content"] [aria-label="Remove container"]',

  //Other allergy
  typeOfOtherAllergy:
    '[data-ehr-path="doctor_admission_note/adverse_reaction_list/adverse_reaction_risk/category"] input',
  otherAllergic:
    'textarea[aria-labelledby="doctor_admission_note/adverse_reaction_list/adverse_reaction_risk/substance-label"]',
  otherSymptom:
    'textarea[aria-labelledby="doctor_admission_note/adverse_reaction_list/adverse_reaction_risk/adverse_reaction_event/reaction_description-label"]',
  buttonAddOther:
    '[aria-controls="adverse_reaction_risk-container-content"] [aria-label="Add container"]',
  buttonRemoveOther:
    '[aria-controls="adverse_reaction_risk-container-content"] [aria-label="Remove container"]',

  physicalExam:
    '[aria-labelledby="doctor_admission_note/examination_findings/physical_examination_findings/any_event/description-label"]',
  templateSelection: '[role="combobox"]:last > input',
  templateInput: '.ck-content',

  toastSubmit: 'ol',

  //View admission note
  viewAdmissionNote: '[data-testid="admission-note-card-item-value-container"]',
  viewAllergyDisplay:
    '[data-testid="past-illess-allergy-display-needtoreplace"]',
  viewAllergyAllergen:
    '[data-testid="past-illess-allergy-allergen-needtoreplace"]',
  viewAllergyReaction:
    '[data-testid="past-illess-allergy-reaction-needtoreplace"]',

  buttonSetToday: '.set-today-button',
  buttonEdit: '[data-testid="edit-button"]',
  buttonSubmit: '[data-testid="submit-btn"]',
};
