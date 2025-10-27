import Ticket from "./Ticket";

export default interface TicketStatus {
  value: string;
  assign(): void;
  start(): void;
  close(): void;
}

export class RequestStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "requested";
  }
  assign(): void {
    this.ticket.status = new AssignStatus(this.ticket);
  }
  start(): void {
    throw new Error("Could not start ticket");
  }
  close(): void {
    throw new Error("Could not close ticket");
  }
}

export class AssignStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "assigned";
  }
  assign(): void {
    throw new Error("Could not assign ticket");
  }
  start(): void {
    this.ticket.status = new StartStatus(this.ticket);
  }
  close(): void {
    throw new Error("Could not close ticket");
  }
}

export class StartStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "in_progress";
  }
  assign(): void {
    throw new Error("Could not assign ticket");
  }
  start(): void {
    throw new Error("Could not start ticket");
  }
  close(): void {
    this.ticket.status = new CloseStatus(this.ticket);
  }
}

export class CloseStatus implements TicketStatus {
  value: string;

  constructor(readonly ticket: Ticket) {
    this.value = "closed";
  }
  assign(): void {
    throw new Error("Could not assign ticket");
  }
  start(): void {
    throw new Error("Could not start ticket");
  }
  close(): void {
    throw new Error("Could not close ticket");
  }
}
