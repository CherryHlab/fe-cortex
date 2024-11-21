export default {
  title: '[data-testid="secondary-header-title"]',
  focus_note_header: 'button[data-testid="tab-trigger-add_focus_note"]',

  button_reuse_form: '[data-ehr-path="generic-button-6661179"] > button',

  perform_date:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] [placeholder="dd/MM/yyyy"]',
  perform_hour:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] [placeholder="HH"]',
  perform_minute:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] [placeholder="MM"]',
  button_today:
    '[data-ehr-path="nursing_focus_note/assessment/clinical_synopsis/created_at/specific_datetime"] .set-today-button',

  focus:
    'textarea[aria-labelledby="nursing_focus_note/focus/goal/goal_name-label"]',
  assessment:
    'textarea[aria-labelledby="nursing_focus_note/assessment/clinical_synopsis/synopsis-label"]',
  intervention:
    'textarea[aria-labelledby="nursing_focus_note/intervention/service_request/current_activity/description-label"]',
  intervention_date:
    '[data-ehr-path="generic-date_time-3317208"] [placeholder="dd/MM/yyyy"]',
  intervention_hour:
    '[data-ehr-path="generic-date_time-3317208"] [placeholder="HH"]',
  intervention_minute:
    '[data-ehr-path="generic-date_time-3317208"] [placeholder="MM"]',
  button_intervention_today:
    '[data-ehr-path="generic-date_time-3317208"] .set-today-button',

  evaluation:
    'textarea[aria-labelledby="nursing_focus_note/evaluation/progress_note/progress_note-label"]',
  evaluation_date:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] [placeholder="dd/MM/yyyy"]',
  evaluation_hour:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] [placeholder="HH"]',
  evaluation_minute:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] [placeholder="MM"]',
  button_evaluation_today:
    '[data-ehr-path="nursing_focus_note/evaluation/progress_note/time"] .set-today-button',

  button_edit: '[data-testid="edit-button"]',

  view_focus: '[data-testid="focus"] [data-testid="content"]',
  view_assessment: '[data-testid="assessment"] [data-testid="content"]',
  view_assessment_time:
    '[data-testid="assessment"] [data-testid="perform-time"] [data-testid="content"]',
  view_intervention: '[data-testid="intervention"] [data-testid="content"]',
  view_intervention_time:
    '[data-testid="intervention"] [data-testid="perform-time"] [data-testid="content"]',
  view_evaluation: '[data-testid="evaluation"] [data-testid="content"]',
  view_evaluation_time:
    '[data-testid="evaluation"] [data-testid="perform-time"] [data-testid="content"]',

  button_cancel: '[data-testid="cancel-btn"]',
  button_submit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
};
