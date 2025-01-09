export default {
  title: '[data-testid="secondary-header-title"]',
  problemListHeader: 'button[data-testid="tab-trigger-add_problem"]',

  problem:
    'textarea[aria-labelledby="this_visit_problem/problem_diagnosis/problem_diagnosis_name-label"]',
  problemStatus: '[data-ehr-path="generic-coded_text-6178802"] input',

  listOption: '[role="option"]',

  severity:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/severity"] input',
  startDate:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] [placeholder="dd/MM/yyyy"]',
  startHour:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] [placeholder="HH"]',
  startMinute:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] [placeholder="MM"]',
  buttonStartSetToday:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] .set-today-button',

  endDate:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] [placeholder="dd/MM/yyyy"]',
  endHour:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] [placeholder="HH"]',
  endMinute:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] [placeholder="MM"]',
  buttonEndSetToday:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] .set-today-button',

  detail:
    'textarea[aria-labelledby="this_visit_problem/problem_diagnosis/comment-label"]',

  buttonEdit: '[data-testid="problem-list-item-icon-edit"]',

  viewProblemItem: '[data-testid="problem-list-item-wrapper"]',
  viewProblemName: '[data-testid="problem-list-item-name"]',
  viewProblemStatus:
    '[data-testid="problem-list-item-status-wrapper"] [data-testid="chip-label"]',
  viewSeverity:
    '[data-testid="problem-list-item-status-severity"] [data-testid="chip-label"]',
  viewStartDate: '[data-testid="problem-list-item-save-date-time"]',
  viewEndDate: '[data-testid="problem-list-item-end-date-time-value"]',
  viewEndDateEmpty: '[data-testid="problem-list-item-end-date-time-no-value"]',
  viewDetail: '[data-testid="problem-list-item-remark"]',

  buttonEllipsis:
    '[data-testid="problem-list-item-icon-ellipsis"] [data-testid="popover-trigger-btn"]',
  buttonRemove: '[data-testid="action-button-delete"]',
  buttonCancel: '[data-testid="cancel-btn"]',
  buttonSubmit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
  toastTitle: '.toast-title',
};
