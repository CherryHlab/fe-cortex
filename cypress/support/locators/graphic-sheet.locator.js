export default {
  title: '[data-testid="tab-trigger-add_ipd_vital_sign"]',

  performDate:
    '[data-ehr-path="vital_signs_record_sheet/context/perform_time/specific_datetime"] [placeholder="dd/MM/yyyy"]',
  performHour:
    '[data-ehr-path="vital_signs_record_sheet/context/perform_time/specific_datetime"] [placeholder="HH"]',
  performMinute:
    '[data-ehr-path="vital_signs_record_sheet/context/perform_time/specific_datetime"] [placeholder="MM"]',

  buttonToday: '.set-today-button',

  systolic:
    '[data-ehr-path="vital_signs_record_sheet/vital_signs/blood_pressure/systolic"]',
  diastolic:
    '[data-ehr-path="vital_signs_record_sheet/vital_signs/blood_pressure/diastolic"]',
  PR: '[data-ehr-path="vital_signs_record_sheet/vital_signs/pulse_heart_beat/rate"]',
  RR: '[data-ehr-path="vital_signs_record_sheet/vital_signs/respiration/rate"]',
  BT: '[data-ehr-path="vital_signs_record_sheet/vital_signs/body_temperature/temperature"]',
  SPO2: '[aria-labelledby="vital_signs_record_sheet/vital_signs/pulse_oximetry/spo-label"]',
  Height:
    '[data-ehr-path="vital_signs_record_sheet/weight_height/height_length/height_length"]',
  Weight:
    '[data-ehr-path="vital_signs_record_sheet/weight_height/body_weight/weight"]',

  buttonCancel: '[data-testid="cancel-btn"]',
  buttonSubmit: '[data-testid="submit-btn"]',

  toast: 'ol:first',
  toastTitle: '.toast-title',
};
