import {CompanyAvailabilitiesModel} from './models/companyAvailabilities.model';
import {AppointmentModel} from './models/Appointment.model';

const companyAvailibilities: CompanyAvailabilitiesModel[] = [];
let companyAvailibility: CompanyAvailabilitiesModel;
let appointment: AppointmentModel;

let startDate = new Date(2016, 6, 1, 10, 30); // July 1st, 10:30
let endDate = new Date(2016, 6, 1, 14, 0o0); // July 1st, 14:00
// eslint-disable-next-line max-len
companyAvailibility = new CompanyAvailabilitiesModel(true, true, startDate, endDate); // weekly recurring opening in calendar
companyAvailibilities.push(companyAvailibility);

// Single appoinment taken of company
startDate = new Date(2016, 6, 8, 11, 30); // July 8th 11:30
endDate = new Date(2016, 6, 8, 12, 30); // July 8th 12:30
// eslint-disable-next-line max-len
companyAvailibility = new CompanyAvailabilitiesModel(false, false, startDate, endDate); // weekly recurring opening in calendar
companyAvailibilities.push(companyAvailibility);

// Appointment from a customer
const fromDate = new Date(2016, 6, 4, 10, 0o0);
const toDate = new Date(2016, 6, 10, 10, 0o0);
appointment = new AppointmentModel(fromDate, toDate);

calculateAvailabilities(companyAvailibilities, appointment);

function calculateAvailabilities(
    companyAvailibilities: CompanyAvailabilitiesModel[],
    appointmentToCalc: AppointmentModel) : CompanyAvailabilitiesModel[] {
  let resultAvailibilities: CompanyAvailabilitiesModel[];
  return resultAvailibilities;
}
