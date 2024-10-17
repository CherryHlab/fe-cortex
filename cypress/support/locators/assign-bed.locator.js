export default {
  assign_modal: '[data-testid="assign-bed-modal"]',
  chip_label: '[data-testid="chip-label"]',
  search_hn: '[data-testid="search"]',
  listbox: '[role="listbox"]',
  option: '[role="option"]',
  button_search: '[data-testid="search-patient-button"]',

  patient_hn: '[data-testid="patient-hn"]',
  patient_name: '[data-testid="patient-name"]',
  an: '[data-testid="an"]',
  phone_number: '[data-testid="phoneNumber"]',

  emergency_name: '[data-testid="emergencyContacts.0.name"]',
  emergency_relationship: '[data-testid="emergencyContacts.0.relationship"]',
  emergency_phone_number: '[data-testid="emergencyContacts.0.phoneNumber"]',

  physician: '[data-testid="input-select-primary-physician"]',
  select_physician: '[data-testid="select-value-primary-physician"]',
  department:
    '[data-testid="searchbox-trigger-select-department-needtoreplace"]',
  select_department: '[data-value="needtoreplace"]',
  consultname: '[data-testid="input-select-consult-physicians-needtoreplace"]',
  select_consult:
    '[data-testid="select-value-consult-physicians-needtoreplace"]',

  button_add_consult: '[data-testid="add-consult-physician"]',
  button_submit: '[data-testid="assign-bed-submit-button"]',
  toast_submit: 'ol',
};
