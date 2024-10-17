export default {
  option: '[role="option"]',
  diagnosis: '[data-testid="input-select-diagnosis-summary"]',
  select_value_diagnosis: '[data-testid="select-value-diagnosis-summary"]',

  principle_diagnosis: 'Select principle diagnosis',
  comorbid_diagnosis: 'Select comorbid diagnosis',
  complication_diagnosis: 'Select complication diagnosis',
  other_diagnosis: 'Select other diagnosis',
  external_cause_of_injury: 'Select external cause of injury',

  or_proceduce: 'Select OR procedure',
  surgeon_name: 'Select surgeon',
  date_in:
    '[data-testid="date-picker-operationInformation.needtoreplace.finalEndDate"]',
  date_out:
    '[data-testid="date-picker-operationInformation.needtoreplace.finalEndDate"]',

  non_operating_room_procedure:
    '[data-testid="suggestion-button-needtoreplace"]',

  discharge_status:
    '[data-testid="radio-dischargeSummary.conditionOfDischarge"]',
  discharge_type: '[data-testid="radio-dischargeSummary.dischargeType"]',

  toast_submit: 'ol',
  button_submit: '[data-testid="submit-btn"]',
};
