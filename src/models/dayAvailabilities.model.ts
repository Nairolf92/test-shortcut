// eslint-disable-next-line require-jsdoc
export class DayAvailabilitiesModel {
  dayNumber: number = 0;
  slot: SlotAvailabilities[] = [];
}
// eslint-disable-next-line require-jsdoc
export class SlotAvailabilities {
  hour: string = '';
  status: boolean = true;
}
