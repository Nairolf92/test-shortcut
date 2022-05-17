// eslint-disable-next-line require-jsdoc
export class AppointmentModel {
  fromDate: Date;
  toDate: Date;

  // eslint-disable-next-line require-jsdoc
  constructor(fromDate: Date, toDate: Date) {
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
