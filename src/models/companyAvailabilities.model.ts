// eslint-disable-next-line require-jsdoc
export class CompanyAvailabilitiesModel {
  opening: boolean;
  recurring: boolean;
  startDate: Date;
  endDate: Date;

  // eslint-disable-next-line require-jsdoc
  constructor(opening, recurring, startDate, endDate) {
    this.opening = opening;
    this.recurring = recurring;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
