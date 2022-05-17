import {CompanyAvailabilitiesModel} from './models/companyAvailabilities.model';
import {AppointmentModel} from './models/appointment.model';
import {DayAvailibilitiesModel, SlotAvailibitilies} from './models/dayAvailibilities.model';

const companyAvailibilitiesList: CompanyAvailabilitiesModel[] = [];
const dayAvailibitiesList: DayAvailibilitiesModel[] = [];
let availibility: CompanyAvailabilitiesModel;
let appointment: AppointmentModel;

// recurring schedule of a company
let startDate = new Date(2016, 6, 1, 10, 30); // July 1st, 10:30
let endDate = new Date(2016, 6, 1, 14, 0o0); // July 1st, 14:00
// eslint-disable-next-line max-len
availibility = new CompanyAvailabilitiesModel(true, true, startDate, endDate); // weekly recurring opening in calendar
companyAvailibilitiesList.push(availibility);

// Single appoinment taken of company
startDate = new Date(2016, 6, 8, 11, 30); // July 8th 11:30
endDate = new Date(2016, 6, 8, 12, 30); // July 8th 12:30
// eslint-disable-next-line max-len
availibility = new CompanyAvailabilitiesModel(false, false, startDate, endDate);
companyAvailibilitiesList.push(availibility);

// Appointment from a customer
const fromDate = new Date(2016, 6, 4, 10, 0o0); // July 4th 10:00
const toDate = new Date(2016, 6, 10, 10, 0o0); // July 10th 10:00
appointment = new AppointmentModel(fromDate, toDate);

calculateAvailabilities(companyAvailibilitiesList, appointment);

// eslint-disable-next-line require-jsdoc
function calculateAvailabilities(
    companyAvailibilitiesList: CompanyAvailabilitiesModel[],
    appointment: AppointmentModel) : void {
  // eslint-disable-next-line max-len
  // TODO : Improve func to a single loop
  for (const availibility of companyAvailibilitiesList) {
    // eslint-disable-next-line max-len
    // 1) Add all available company appointments to an array (recurring & ordering == true)
    if (availibility.opening === true && availibility.recurring === true) {
      addCompanyRecurrentAvailibilities(appointment, availibility);
    } else if (availibility.opening === false && availibility.recurring === false) {
      // 2) Change the appointments from dayAvailibitiesList already taken using availibility (recurring & ordering == false)
      updatedayAvailibitiesList(availibility);
    }
  }
  // 3) Return the appointments available from the company
  displayAvailibilyList();
}

function displayAvailibilyList() : void {
  console.log(...dayAvailibitiesList);
}

function updatedayAvailibitiesList(availibility : CompanyAvailabilitiesModel) : void {
  const appointmentDayNumber: number = availibility.startDate.getDay();
  const startHour: string = formatStartHour(availibility);
  const originalDiffTime: number = Math.abs(availibility.startDate.getTime() - availibility.endDate.getTime()) / 36e5;
  let diffTime: number = 0;
  for (const day of dayAvailibitiesList) {
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

function formatStartHour(availibility: CompanyAvailabilitiesModel) : string {
  return addZeroAfter(availibility.startDate.getHours())+':'+addZeroAfter(availibility.startDate.getMinutes());
}

function formatEndHour(availibility: CompanyAvailabilitiesModel) : string {
  return addZeroAfter(availibility.endDate.getHours())+':'+addZeroAfter(availibility.endDate.getMinutes());
}

// Add to dayAvailibitiesList the number of day concerned and a list of appointments with a status equal true
function addCompanyRecurrentAvailibilities(
    appointment : AppointmentModel,
    availibility : CompanyAvailabilitiesModel) : void {
  const dayAvailibities: DayAvailibilitiesModel = new DayAvailibilitiesModel();
  dayAvailibities.dayNumber = availibility.startDate.getDay();
  let startHour: string = formatStartHour(availibility);
  const endHour: string = formatEndHour(availibility);
  let splitArray: string[] = [];
  // @ts-ignore
  const slotsList: SlotAvailibitilies[] = [];
  while (startHour !== endHour) {
    const slot: SlotAvailibitilies = new SlotAvailibitilies();
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
  dayAvailibities.slot = slotsList;
  dayAvailibitiesList.push(dayAvailibities);
}
