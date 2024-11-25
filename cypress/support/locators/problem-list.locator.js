export default {
  title: '[data-testid="secondary-header-title"]',
  problem_list_header: 'button[data-testid="tab-trigger-add_problem"]',

  problem:
    'textarea[aria-labelledby="this_visit_problem/problem_diagnosis/problem_diagnosis_name-label"]',
  problem_status: '[data-ehr-path="generic-coded_text-6178802"] input',

  list_option: '[role="option"]',

  severity:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/severity"] input',
  start_date:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] [placeholder="dd/MM/yyyy"]',
  start_hour:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] [placeholder="HH"]',
  start_minute:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] [placeholder="MM"]',
  button_start_set_today:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_clinically_recognised"] .set-today-button',

  end_date:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] [placeholder="dd/MM/yyyy"]',
  end_hour:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] [placeholder="HH"]',
  end_minute:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] [placeholder="MM"]',
  button_end_set_today:
    '[data-ehr-path="this_visit_problem/problem_diagnosis/date_time_of_resolution"] .set-today-button',

  detail:
    'textarea[aria-labelledby="this_visit_problem/problem_diagnosis/comment-label"]',

  button_edit: '[data-testid="problem-list-item-icon-edit"]',

  view_problem_item: '[data-testid="problem-list-item-wrapper"]',
  view_problem_name: '[data-testid="problem-list-item-name"]',
  view_problem_status:
    '[data-testid="problem-list-item-status-wrapper"] [data-testid="chip-label"]',
  view_severity:
    '[data-testid="problem-list-item-status-severity"] [data-testid="chip-label"]',
  view_start_date: '[data-testid="problem-list-item-save-date-time"]',
  view_end_date: '[data-testid="problem-list-item-end-date-time-value"]',
  view_end_date_empty:
    '[data-testid="problem-list-item-end-date-time-no-value"]',
  view_detail: '[data-testid="problem-list-item-remark"]',

  button_ellipsis:
    '[data-testid="problem-list-item-icon-ellipsis"] [data-testid="popover-trigger-btn"]',
  button_remove: '[data-testid="action-button-delete"]',
  button_cancel: '[data-testid="cancel-btn"]',
  button_submit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
};
