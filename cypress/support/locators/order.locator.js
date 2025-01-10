export default {
  title: '[data-testid="secondary-header-title"]',
  oneDayHeader: '[data-testid="tab-trigger-one_day_order"]',
  continueHeader: '[data-testid="tab-trigger-continue_order"]',

  searchUnvailableMed: '[data-testid="search-unavailable-medication"]',
  orderSearch: '[data-testid="order-search-input"] input',
  orderInstruction: '[data-testid="auto-complete-input"]',
  orderSuggestion: '[data-testid^="suggestion-item-syntax"]',
  stat: '[data-testid="STAT"]',
  medDetail: '[data-testid="order-search-medication-detail"]',
  addMed: '[data-testid="add-request-button"]',

  addDetail: 'iconify-icon._icon-wrapper_18r0f_24',
  detailMed: '._suggestion-item_wdkpp_77 _active-item_wdkpp_86',

  //Allergy
  allergyTitle: '[data-testid="allergy-modal-title"]',
  drugName: '[data-testid="allergy-drug-title"]',
  allergyReason: '[data-testid="patient-allergy-modal-container"] input',
  allergySubmit: '[data-testid="submit-drug-alert"]',

  //Modal
  modal: '[data-testid="medication-instruction-modal"]',
  modalInstruction:
    '[data-testid="medication-instruction-modal"] [data-testid="auto-complete-input"]',
  modalStat:
    '[data-testid="medication-instruction-modal"] [data-testid="med-stat"]',
  modalReason:
    '[data-testid="medication-instruction-modal"] [data-testid="select-trigger-af-reason"]',
  modalDiagnosis:
    '[data-testid="medication-instruction-modal"] [data-testid="diagnosis"]',
  modalDoctorNumber:
    '[data-testid="medication-instruction-modal"] [data-testid="license"] input[type="text"]',
  modalSubmit:
    '[data-testid="medication-instruction-modal"] [data-testid="submit-button"]',

  //Lab
  labUrgency: '[data-testid="select-trigger-order-lab-urgency"]',
  labSelect: '[data-testid="select-viewport-order-lab-urgency"]',
  labDate: '[name="order-lab-date"]',
  labTime: '[data-testid="time-picker-order-lab-time"] > div[type="button"]',
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

  medSearch:
    '[data-testid="order-search-input"] [data-testid="select-value-undefined"]',

  //Edit order
  oneDayOrder: '[data-testid="one-day-order"]',
  continueOrder: '[data-testid="continue-order"]',
  medItem: '[data-testid="medication-item"]',
  labItem: '[data-testid="lab-request-item"]',
  activityItem: '._activity-order-item_55g9a_1',
  additionalOrder: '[data-testid="additional-order-item"]',
  ellipsis: '[data-testid="popover-trigger-btn"]',
  editMedButton: '[data-testid="action-button-edit-medication-item"]',
  editLabButton: '[data-testid="action-button-edit-lab-order-item"]',
  editActivityButton: '[data-testid="action-button-edit-activity-order-item"]',
  editAdditionalOrder:
    '[data-testid="action-button-edit-additional-order-item"]',
  allergySymbol:
    '[data-testid="order-search-medication-detail"] [data-testid="allergy-symbol"]',
  buttonPopupSymbol:
    '[data-testid="order-search-medication-detail"] iconify-icon._icon-wrapper_18r0f_24',

  //Remove order
  buttonDelete: '[data-testid="action-button-delete-medication-item"]',
  buttonDeleteLab: '[data-testid="action-button-delete-lab-order-item"]',
  buttonDeleteActivity:
    '[data-testid="action-button-delete-activity-order-item"]',
  buttonDeleteAdditionalOrder:
    '[data-testid="action-button-delete-additional-order-item"]',

  //View order
  medName: '[data-testid="med-name"]',
  medDescription: '[data-testid="med-description-parsable-direction"]',
  medStat: '[data-testid="med-stat-tag"]',
  medAllergy: '[data-testid="allergy-symbol"]',
  medDescriptionTag: '[data-testid="med-description-tag"]',

  labName: '[data-testid="request-name"]',
  labDescription: '[data-testid="request-description-direction"]',
  labUrgencyTag: '[data-testid="lab-urgency-tag"]',

  activityName: '[data-testid="request-name"]',
  activityDescription: '[data-testid="request-description-direction"]',
  activityTag: '[data-testid="order-tag"]',

  toast: 'ol',
  toastTitle: '.toast-title',
  listBox: '[role="listbox"]',
  option: '[role="option"]',
  buttonSubmit: '[data-testid="submit-btn"]',
};
