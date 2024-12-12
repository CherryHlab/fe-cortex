export default {
  title: '[data-testid="secondary-header-title"]',
  progressNoteHeader: 'button[data-testid="tab-trigger-progress_note"]',

  performDate:
    '[data-ehr-path="doctor_progress_note/context/perform_time/specific_datetime"] [placeholder="dd/MM/yyyy"]',
  performHour:
    '[data-ehr-path="doctor_progress_note/context/perform_time/specific_datetime"] [placeholder="HH"]',
  performMinute:
    '[data-ehr-path="doctor_progress_note/context/perform_time/specific_datetime"] [placeholder="MM"]',
  buttonToday: '.set-today-button',

  subjective:
    'textarea[aria-labelledby="doctor_progress_note/soap_headings/subjective_s/story_history/story-label"]',
  objective:
    'textarea[aria-labelledby="doctor_progress_note/soap_headings/objective_o/physical_examination_findings/description-label"]',
  assessment:
    'textarea[aria-labelledby="doctor_progress_note/soap_headings/assessment_a/clinical_synopsis/synopsis-label"]',
  plan: 'textarea[aria-labelledby="doctor_progress_note/soap_headings/plan_p/service_request/narrative-label"]',

  buttonEdit: '[data-testid="edit-button"]',

  viewPerformTime: '[data-testid="perform-time"] [data-testid="content"]',
  viewSubjective: '[data-testid="subjective"] [data-testid="content"]',
  viewObjective: '[data-testid="objective"] [data-testid="content"]',
  viewAssessment: '[data-testid="assessment"] [data-testid="content"]',
  viewPlan: '[data-testid="plan"] [data-testid="content"]',

  buttonCancel: '[data-testid="cancel-btn"]',
  buttonSubmit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
};
