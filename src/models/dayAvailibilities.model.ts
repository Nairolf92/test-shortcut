// eslint-disable-next-line require-jsdoc
export class DayAvailibilitiesModel {
  dayNumber: number = 0;
  slot: SlotAvailibitilies[] = [];
}
// eslint-disable-next-line require-jsdoc
export class SlotAvailibitilies {
  hour: string = '';
  status: boolean = true;
}
