import {CompanyAvailabilitiesModel} from './models/companyAvailabilities.model';
import {AppointmentModel} from './models/appointment.model';
import {DayAvailabilitiesModel, SlotAvailabilities} from './models/dayAvailabilities.model';

const companyAvailabilitiesList: CompanyAvailabilitiesModel[] = [];
const dayAvailabitiesList: DayAvailabilitiesModel[] = [];
let availability: CompanyAvailabilitiesModel;

// recurring schedule of a company
let startDate = new Date(2016, 6, 1, 10, 30); // July 1st, 10:30
let endDate = new Date(2016, 6, 1, 14, 0o0); // July 1st, 14:00
// eslint-disable-next-line max-len
availability = new CompanyAvailabilitiesModel(true, true, startDate, endDate); // weekly recurring opening in calendar
companyAvailabilitiesList.push(availability);

// Single appoinment taken of company
startDate = new Date(2016, 6, 8, 11, 30); // July 8th 11:30
endDate = new Date(2016, 6, 8, 12, 30); // July 8th 12:30
// eslint-disable-next-line max-len
availability = new CompanyAvailabilitiesModel(false, false, startDate, endDate);
companyAvailabilitiesList.push(availability);

// Appointment from a customer
const fromDate = new Date(2016, 6, 4, 10, 0o0); // July 4th 10:00
const toDate = new Date(2016, 6, 10, 10, 0o0); // July 10th 10:00
const appointment = new AppointmentModel(fromDate, toDate);

calculateAvailabilities(companyAvailabilitiesList, appointment);

// eslint-disable-next-line require-jsdoc
function calculateAvailabilities(
    companyAvailabilitiesList: CompanyAvailabilitiesModel[],
    appointment: AppointmentModel) : void {
  // eslint-disable-next-line max-len
  // TODO : Improve func to a single loop
  for (const availability of companyAvailabilitiesList) {
    // eslint-disable-next-line max-len
    // 1) Add all available company appointments to an array (recurring & ordering == true)
    if (availability.opening === true && availability.recurring === true) {
      addCompanyRecurrentAvailibilities(appointment, availability);
    } else if (availability.opening === false && availability.recurring === false) {
      // 2) Change the appointments from dayAvailabitiesList already taken using availability (recurring & ordering == false)
      updateDayAvailabilitiesList(availability);
    }
  }
  // 3) Return the appointments available from the company
  displayAvailabilityList(appointment);
}

function displayAvailabilityList(appointment: AppointmentModel) : void {
  console.log(...dayAvailabitiesList);
  console.log(appointment.fromDate.getDay());
}

function updateDayAvailabilitiesList(availability : CompanyAvailabilitiesModel) : void {
  const appointmentDayNumber: number = availability.startDate.getDay();
  const startHour: string = formatStartHour(availability);
  const originalDiffTime: number = Math.abs(availability.startDate.getTime() - availability.endDate.getTime()) / 36e5;
  let diffTime: number = 0;
  for (const day of dayAvailabitiesList) {
    if (day.dayNumber === appointmentDayNumber) {
      // Iterate through all the slots to see if schedule is already taken
      for (const slot of day.slot) {
        // If slot.hour is equal to the apointment already taken or if there is a still difference time between the appointment start date and end date
        if (slot.hour === startHour || diffTime !== 0) {
          if (diffTime !== originalDiffTime) {
            // 0.5 is corresponding to 30min
            diffTime = diffTime + 0.5;
            slot.status = false;
          }
        }
      }
    }
  }
}

function addZeroAfter(n: number) : string {
  return n + (n < 10 ? '0' : '');
}

function formatStartHour(availability: CompanyAvailabilitiesModel) : string {
  return addZeroAfter(availability.startDate.getHours())+':'+addZeroAfter(availability.startDate.getMinutes());
}

function formatEndHour(availability: CompanyAvailabilitiesModel) : string {
  return addZeroAfter(availability.endDate.getHours())+':'+addZeroAfter(availability.endDate.getMinutes());
}

// Add to dayAvailabitiesList the number of day concerned and a list of appointments with a status equal true
function addCompanyRecurrentAvailibilities(
    appointment : AppointmentModel,
    availability : CompanyAvailabilitiesModel) : void {
  const dayAvailabilities: DayAvailabilitiesModel = new DayAvailabilitiesModel();
  dayAvailabilities.dayNumber = availability.startDate.getDay();
  let startHour: string = formatStartHour(availability);
  const endHour: string = formatEndHour(availability);
  let splitArray: string[] = [];
  // @ts-ignore
  const slotsList: SlotAvailibitilies[] = [];
  while (startHour !== endHour) {
    const slot: SlotAvailabilities = new SlotAvailabilities();
    slot.hour = startHour;
    slot.status = true;
    slotsList.push(slot);
    splitArray = startHour.split(':', 2);
    if (splitArray[1] == '30') {
      startHour = (parseInt(splitArray[0]) + 1)+':'+'00';
    } else {
      startHour = splitArray[0]+':'+'30';
    }
  }
  dayAvailabilities.slot = slotsList;
  dayAvailabitiesList.push(dayAvailabilities);
}
