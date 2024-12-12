export default {
  listbox: '[role="listbox"]',
  option: '[role="option"]',
  optionAdd: '[data-accent-color="blue"]',
  diagnosis: '[data-testid="input-select-diagnosis-summary"]',
  selectValueDiagnosis: '[data-testid="select-value-diagnosis-summary"]',

  principleDiagnosis: 'Select principle diagnosis',
  comorbidDiagnosis: 'Select comorbid diagnosis',
  complicationDiagnosis: 'Select complication diagnosis',
  otherDiagnosis: 'Select other diagnosis',
  externalCauseOfInjury: 'Select external cause of injury',

  orProceduce: '[data-testid="input-select-undefined"]',
  surgeonName: 'Select surgeon',
  dateIn:
    '[data-testid="date-picker-operationInformation.needtoreplace.scheduleDate"]',
  dateOut:
    '[data-testid="date-picker-operationInformation.needtoreplace.finalEndDate"]',

  nonOperatingInput: '[data-testid="input-select-non-or-procedure"]',
  nonOperatingRoomProcedure: '[data-testid="suggestion-button-needtoreplace"]',
  otherDetail: '[data-testid="detail-input-needtoreplace"]',

  dischargeStatus:
    '[data-testid="radio-dischargeSummary.conditionOfDischarge"]',
  dischargeType: '[data-testid="radio-dischargeSummary.dischargeType"]',

  //Diagnosis
  principal: '[label="Principal diagnosis"]',
  comorbid: '[label="Comorbid diagnosis"]',
  complication: '[label="Complication diagnosis"]',
  other: '[label="Other diagnosis"]',
  external: '[label="External cause of injury"]',

  //Operation
  operating: '[label="Operating room procedure"]',
  nonOperation: '[label="Non-operating room procedure"]',

  //Discharge
  statusOfDischarge: '[label="Discharge status"]',
  causeOfDead: '[label="สาเหตุการเสียชีวิต"]',
  typeOfDischarge: '[label="Discharge type"]',
  transferTo: '[label="Transfer to"]',

  //button
  buttonModal: '[data-testid="modal-btn-confirm"]',
  toastSubmit: 'ol',
  buttonEdit: '[data-testid="edit-button"]',
  buttonSubmit: '[data-testid="submit-btn"]',
};
