import {CompanyAvailabilitiesModel} from './models/companyAvailabilities.model';
import {AppointmentModel} from './models/appointment.model';
import {DayAvailabilitiesModel, SlotAvailabilities} from './models/dayAvailabilities.model';

const companyAvailabilitiesList: CompanyAvailabilitiesModel[] = [];

// eslint-disable-next-line require-jsdoc
export function calculateAvailabilities(appointment: AppointmentModel) : void {
  let dayAvailabilitiesList: DayAvailabilitiesModel[] = [];
  for (const availability of companyAvailabilitiesList) {
    // eslint-disable-next-line max-len
    // 1) Add all available company appointments to an array (recurring & ordering == true)
    if (availability.opening === true && availability.recurring === true) {
      dayAvailabilitiesList = addCompanyRecurrentAvailibilities(appointment, availability);
    } else if (availability.opening === false && availability.recurring === false) {
      // 2) Change the appointments from dayAvailabilitiesList already taken using availability (recurring & ordering == false)
      dayAvailabilitiesList = updateDayAvailabilitiesList(availability, dayAvailabilitiesList);
    }
  }
  // 3) Return the appointments available from the company
  displayAvailabilityList(appointment, dayAvailabilitiesList);
}

export function addToCompanyAvailabilitiesList(opening: boolean, recurring: boolean, startDate: Date, endDate: Date) : void {
  const availability: CompanyAvailabilitiesModel= new CompanyAvailabilitiesModel(opening, recurring, startDate, endDate);
  companyAvailabilitiesList.push(availability);
}

// Generate output text to display
function displayAvailabilityList(appointment: AppointmentModel, dayAvailabilitiesList: DayAvailabilitiesModel[]) : void {
  let outPutText: string;
  let outPutSlots: SlotAvailabilities[];
  const appointmentCopy: AppointmentModel = appointment;
  while (appointmentCopy.fromDate.getDay() !== appointmentCopy.toDate.getDay()) {
    for (const day of dayAvailabilitiesList) {
      if (day.dayNumber === appointmentCopy.fromDate.getDay()) {
        outPutText = `I'm available from ${appointmentCopy.fromDate.toLocaleString('en-US', {month: 'long'})}`;
        outPutText+= ` ${appointmentCopy.fromDate.getDate()}, at `;
        outPutSlots = day.slot.filter((slot) => slot.status == true);
        for (const [key, slot] of Object.entries(outPutSlots)) {
          if (Number(key) === outPutSlots.length-1) {
            outPutText+= 'and ' + slot.hour;
          } else {
            outPutText+= slot.hour + ', ';
          }
        }
        console.log(outPutText);
      }
    }
    appointmentCopy.fromDate.setDate(appointmentCopy.fromDate.getDate() + 1);
  }
}

function updateDayAvailabilitiesList(availability : CompanyAvailabilitiesModel, dayAvailabilitiesList: DayAvailabilitiesModel[]) : DayAvailabilitiesModel[] {
  const appointmentDayNumber: number = availability.startDate.getDay();
  const startHour: string = formatStartHour(availability);
  const originalDiffTime: number = Math.abs(availability.startDate.getTime() - availability.endDate.getTime()) / 36e5;
  let diffTime: number = 0;
  for (const day of dayAvailabilitiesList) {
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
  return dayAvailabilitiesList;
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

// Add to dayAvailabilitiesList the number of day concerned and a list of appointments with a status equal true
function addCompanyRecurrentAvailibilities(
    appointment : AppointmentModel,
    availability : CompanyAvailabilitiesModel) : DayAvailabilitiesModel[] {
  const dayAvailabilities: DayAvailabilitiesModel = new DayAvailabilitiesModel();
  const dayAvailabilitiesList: DayAvailabilitiesModel[] = [];
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
  dayAvailabilitiesList.push(dayAvailabilities);
  return dayAvailabilitiesList;
}
