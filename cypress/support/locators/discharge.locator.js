export default {
  option: '[role="option"]',
  option_add: '[data-accent-color="blue"]',
  diagnosis: '[data-testid="input-select-diagnosis-summary"]',
  select_value_diagnosis: '[data-testid="select-value-diagnosis-summary"]',

  principle_diagnosis: 'Select principle diagnosis',
  comorbid_diagnosis: 'Select comorbid diagnosis',
  complication_diagnosis: 'Select complication diagnosis',
  other_diagnosis: 'Select other diagnosis',
  external_cause_of_injury: 'Select external cause of injury',

  or_proceduce: '[data-testid="input-select-undefined"]',
  surgeon_name: 'Select surgeon',
  date_in:
    '[data-testid="date-picker-operationInformation.needtoreplace.scheduleDate"]',
  date_out:
    '[data-testid="date-picker-operationInformation.needtoreplace.finalEndDate"]',

  non_operating_input: '[data-testid="input-select-non-or-procedure"]',
  non_operating_room_procedure:
    '[data-testid="suggestion-button-needtoreplace"]',
  other_detail: '[data-testid="detail-input-needtoreplace"]',

  discharge_status:
    '[data-testid="radio-dischargeSummary.conditionOfDischarge"]',
  discharge_type: '[data-testid="radio-dischargeSummary.dischargeType"]',

  //Diagnosis
  principal: '[label="Principal diagnosis"]',
  comorbid: '[label="Comorbid diagnosis"]',
  complication: '[label="Complication diagnosis"]',
  other: '[label="Other diagnosis"]',
  external: '[label="External cause of injury"]',

  //Operation
  operating: '[label="Operating room procedure"]',
  non_operation: '[label="Non-operating room procedure"]',

  //Discharge
  status_of_discharge: '[label="Discharge status"]',
  cause_of_dead: '[label="สาเหตุการเสียชีวิต"]',
  type_of_discharge: '[label="Discharge type"]',
  transfer_to: '[label="Transfer to"]',

  //button
  button_modal: '[data-testid="modal-btn-confirm"]',
  toast_submit: 'ol',
  button_edit: '[data-testid="edit-button"]',
  button_submit: '[data-testid="submit-btn"]',
};
