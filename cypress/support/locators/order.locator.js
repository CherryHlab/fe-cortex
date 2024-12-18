export default {
  title: '[data-testid="secondary-header-title"]',
  oneDayHeader: '[data-testid="tab-trigger-one_day_order"]',

  searchUnvailableMed: '[data-testid="search-unavailable-medication"]',
  orderSearch: '[data-testid="order-search-input"] input',
  orderDetail: '[data-testid="auto-complete-input"]',
  orderSuggestion: '[data-testid^="suggestion-item-syntax"]',
  stat: '[data-testid="STAT"]',
  addMed: '[data-testid="add-request-button"]',

  addDetail: 'iconify-icon._icon-wrapper_18r0f_24',
  detailMed: '._suggestion-item_wdkpp_77 _active-item_wdkpp_86',

  //HAD
  hadTitle: '[data-testid="allergy-modal-title"]',
  drugName: '[data-testid="allergy-drug-title"]',
  hadReason: '[data-testid="patient-allergy-modal-container"] input',
  hadSubmit: '[data-testid="submit-drug-alert"]',

  //Modal
  modal: '[data-testid="medication-instruction-modal"]',
  modalDetail: '[data-testid="medication-instruction-modal"] [data-testid="auto-complete-input"]',
  modalStat: '[data-testid="medication-instruction-modal"] [data-testid="med-stat"]',
  modalReason: '[data-testid="medication-instruction-modal"] [data-testid="select-trigger-af-reason"]',
  modalDiagnosis: '[data-testid="medication-instruction-modal"] [data-testid="diagnosis"]',
  modalDoctorNumber: '[data-testid="medication-instruction-modal"] [data-testid="license"] input[type="text"]',
  modalSubmit: '[data-testid="medication-instruction-modal"] [data-testid="submit-button"]',

  //Lab
  labUrgency: '[data-testid="select-trigger-urgency"]',
  labDate: '[name="order-lab-date"]',
  labTime: '[data-testid="time-picker-order-lab-time"]',
  labHour: '[data-testid="time-picker-order-lab-time"] input:first',
  labMinute: '[data-testid="time-picker-order-lab-time"] input:last',
  labNote: '[data-testid="additional-instruction"]',
  labButtonApply: '[data-testid="apply-button"]',
  labButtonReset: '[data-testid="reset-button"]',

  //Activity
  activityUrgency: '[data-testid="select-trigger-urgency-activity"]',
  activityDate: '[name="order-activity-date"]',
  activityFrequency: '[data-testid="order-activity-daily-frequency"]',
  activityNote: '[data-testid="order-activity-note"]',
  activityAddButton: 'span[data-accent-color="blue"]:first',

  //Additional order
  template: '[data-testid="add-template"]',
  templateSelectModal: '[data-testid="template-selector-modal"]',
  templateSearch: '[data-testid="template-search"]',
  templateItem: '[data-testid="template-item"]',
  templateButtonSubmit: '[data-testid="submit-button"]',
  templateButtonCancel: '[data-testid="cancel-button"]',
  templateInput: '.ck-content',

  //license number
  licenseNumber: '[data-testid="input-select-undefined"]:last',


  //Edit order
  medItem: '[data-testid="one-day-order"] [data-testid="medication-item"]',
  buttonEdit: '[data-testid="popover-trigger-btn"]',
  allergy: '[data-testid="allergy-symbol"]',



  toast: 'ol',
  listBox: '[role="listbox"]',
  option: '[role="option"]',
  buttonSubmit: '[data-testid="submit-btn"]',
  
};
