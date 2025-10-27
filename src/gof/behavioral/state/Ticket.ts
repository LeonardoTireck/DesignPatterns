import TicketStatus, { RequestStatus } from "./TicketStatus";

export default class Ticket {
  status: TicketStatus;
  employeeId?: number;
  assignDate?: Date;
  startDate?: Date;
  closeDate?: Date;

  constructor(
    readonly customerId: number,
    readonly requestDate: Date,
  ) {
    this.status = new RequestStatus(this);
  }

  assign(employeeId: number, assignDate: Date) {
    this.employeeId = employeeId;
    this.assignDate = assignDate;
    this.status.assign();
  }

  start(startDate: Date) {
    this.startDate = startDate;
    this.status.start();
  }

  close(closeDate: Date) {
    this.closeDate = closeDate;
    this.status.close();
  }

  getStatus() {
    return this.status.value;
  }

  getStatistics(currrentDate: Date) {
    let assignDuration = 0;
    let jobDuration = 0;
    const requestDuration =
      ((this.assignDate || currrentDate).getTime() -
        this.requestDate.getTime()) /
      (1000 * 60 * 60);
    if (this.assignDate)
      assignDuration =
        ((this.startDate || currrentDate).getTime() -
          this.assignDate.getTime()) /
        (1000 * 60 * 60);
    if (this.startDate) {
      jobDuration =
        ((this.closeDate || currrentDate).getTime() -
          this.startDate.getTime()) /
        (1000 * 60 * 60);
    }
    return {
      requestDuration,
      assignDuration,
      jobDuration,
    };
  }
}
