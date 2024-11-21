export default {
  title: '[data-testid="secondary-header-title"]',
  progress_note_header: 'button[data-testid="tab-trigger-progress_note"]',

  perform_date:
    '[data-ehr-path="doctor_progress_note/context/perform_time/specific_datetime"] [placeholder="dd/MM/yyyy"]',
  perform_hour:
    '[data-ehr-path="doctor_progress_note/context/perform_time/specific_datetime"] [placeholder="HH"]',
  perform_minute:
    '[data-ehr-path="doctor_progress_note/context/perform_time/specific_datetime"] [placeholder="MM"]',
  button_today: '.set-today-button',

  subjective:
    'textarea[aria-labelledby="doctor_progress_note/soap_headings/subjective_s/story_history/story-label"]',
  objective:
    'textarea[aria-labelledby="doctor_progress_note/soap_headings/objective_o/physical_examination_findings/description-label"]',
  assessment:
    'textarea[aria-labelledby="doctor_progress_note/soap_headings/assessment_a/clinical_synopsis/synopsis-label"]',
  plan: 'textarea[aria-labelledby="doctor_progress_note/soap_headings/plan_p/service_request/narrative-label"]',

  button_edit: '[data-testid="edit-button"]',

  view_perform_time: '[data-testid="perform-time"] [data-testid="content"]',
  view_subjective: '[data-testid="subjective"] [data-testid="content"]',
  view_objective: '[data-testid="objective"] [data-testid="content"]',
  view_assessment: '[data-testid="assessment"] [data-testid="content"]',
  view_plan: '[data-testid="plan"] [data-testid="content"]',

  button_cancel: '[data-testid="cancel-btn"]',
  button_submit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
};
