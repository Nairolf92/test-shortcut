import {CompanyAvailabilitiesModel} from '../models/companyAvailabilities.model';
import {addToCompanyAvailabilitiesList, calculateAvailabilities} from '../main';
const {AppointmentModel} = require('../models/appointment.model');

test('console.log * I\'m available from July 8, at 10:30, 11:00, 12:30, 13:00, and 13:30\n', () => {
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

  const consoleSpy = jest.spyOn(console, 'log');

  calculateAvailabilities(appointment);

  expect(consoleSpy).toHaveBeenCalledWith(`I'm available from July 8, at 10:30, 11:00, 12:30, 13:00, and 13:30`);
});

