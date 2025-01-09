export default {
  title: '[data-testid="secondary-header-title"]',
  focusNoteHeader: 'button[data-testid="tab-trigger-add_focus_note"]',

  buttonReuseForm: '[data-ehr-path="generic-button-6661179"] > button',

  performDate:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] [placeholder="dd/MM/yyyy"]',
  performHour:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] [placeholder="HH"]',
  performMinute:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] [placeholder="MM"]',
  buttonToday:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] .set-today-button',

  focus:
    'textarea[aria-labelledby="nursing_focus_note/focus/goal/goal_name-label"]',
  assessment:
    'textarea[aria-labelledby="nursing_focus_note/assessment/clinical_synopsis/synopsis-label"]',
  intervention:
    'textarea[aria-labelledby="nursing_focus_note/intervention/service_request/current_activity/description-label"]',
  interventionDate:
    '[data-ehr-path="generic-date_time-3317208"] [placeholder="dd/MM/yyyy"]',
  interventionHour:
    '[data-ehr-path="generic-date_time-3317208"] [placeholder="HH"]',
  interventionMinute:
    '[data-ehr-path="generic-date_time-3317208"] [placeholder="MM"]',
  buttonInterventionToday:
    '[data-ehr-path="generic-date_time-3317208"] .set-today-button',

  evaluation:
    'textarea[aria-labelledby="nursing_focus_note/evaluation/progress_note/progress_note-label"]',
  evaluationDate:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] [placeholder="dd/MM/yyyy"]',
  evaluationHour:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] [placeholder="HH"]',
  evaluationMinute:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] [placeholder="MM"]',
  buttonEvaluationToday:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] .set-today-button',

  buttonEdit: '[data-testid="edit-button"]',

  viewFocus: '[data-testid="focus"] [data-testid="content"]',
  viewAssessment: '[data-testid="assessment"] [data-testid="content"]',
  viewAssessmentTime:
    '[data-testid="assessment"] [data-testid="perform-time"] [data-testid="content"]',
  viewIntervention: '[data-testid="intervention"] [data-testid="content"]',
  viewInterventionTime:
    '[data-testid="intervention"] [data-testid="perform-time"] [data-testid="content"]',
  viewEvaluation: '[data-testid="evaluation"] [data-testid="content"]',
  viewEvaluationTime:
    '[data-testid="evaluation"] [data-testid="perform-time"] [data-testid="content"]',

  buttonCancel: '[data-testid="cancel-btn"]',
  buttonSubmit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
  toastTitle: '.toast-title',
};
