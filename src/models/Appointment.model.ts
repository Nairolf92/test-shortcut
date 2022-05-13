// eslint-disable-next-line require-jsdoc
export class AppointmentModel {
  fromDate: Date;
  toDate: Date;

  // eslint-disable-next-line require-jsdoc
  constructor(fromDate, toDate) {
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
