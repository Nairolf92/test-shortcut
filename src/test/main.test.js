import {addToCompanyAvailabilitiesList, calculateAvailabilities} from '../main';
const {AppointmentModel} = require('../models/appointment.model');

test('return outPutText I\'m available from July 8, at 10:30, 11:00, 12:30, 13:00, and 13:30', () => {
  // recurring schedule of a company
  let startDate = new Date(2016, 6, 1, 10, 30); // July 1st, 10:30
  let endDate = new Date(2016, 6, 1, 14, 0o0); // July 1st, 14:00
  addToCompanyAvailabilitiesList(true, true, startDate, endDate);

  // Single appoinment taken of company
  startDate = new Date(2016, 6, 8, 11, 30); // July 8th 11:30
  endDate = new Date(2016, 6, 8, 12, 30); // July 8th 12:30
  addToCompanyAvailabilitiesList(false, false, startDate, endDate);

  // Appointment from a customer
  const fromDate = new Date(2016, 6, 4, 10, 0o0); // July 4th 10:00
  const toDate = new Date(2016, 6, 10, 10, 0o0); // July 10th 10:00
  const appointment = new AppointmentModel(fromDate, toDate);

  const outPutText = calculateAvailabilities(appointment);

  expect(outPutText).toBe(`I'm available from July 8, at 10:30, 11:00, 12:30, 13:00, and 13:30`);
});

// TODO : Fix test with startHour issue
test('2', () => {
  // recurring schedule of a company
  let startDate = new Date(2016, 6, 1, 10, 30); // July 1st, 10:30
  let endDate = new Date(2016, 6, 1, 14, 0o0); // July 1st, 14:00
  addToCompanyAvailabilitiesList(true, true, startDate, endDate);

  startDate = new Date(2016, 6, 4, 0o7, 30); // July 4th, 07:30
  endDate = new Date(2016, 6, 4, 18, 0o0); // July 4th, 18:00
  addToCompanyAvailabilitiesList(true, true, startDate, endDate);

  // Single appoinment taken of company
  startDate = new Date(2016, 6, 8, 11, 30); // July 8th 11:30
  endDate = new Date(2016, 6, 8, 12, 30); // July 8th 12:30
  addToCompanyAvailabilitiesList(false, false, startDate, endDate);

  startDate = new Date(2016, 6, 12, 11, 30); // July 12th 11:30
  endDate = new Date(2016, 6, 12, 14, 30); // July 12th 14:30
  addToCompanyAvailabilitiesList(false, false, startDate, endDate);

  // Appointment from a customer
  const fromDate = new Date(2016, 6, 4, 10, 0o0); // July 4th 10:00
  const toDate = new Date(2016, 6, 18, 10, 0o0); // July 18th 10:00
  const appointment = new AppointmentModel(fromDate, toDate);

  const outPutText = calculateAvailabilities(appointment);

  expect(outPutText).toBe(`I'm available from July 8, at 10:30, 11:00, 12:30, 13:00, and 13:30`);
});

