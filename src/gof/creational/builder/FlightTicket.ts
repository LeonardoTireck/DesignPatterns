import FlightTicketBuilder from "./FlightTicketBuilder";

export default class FlightTicket {
  airline: string;
  fromAirport: string;
  toAirport: string;
  flightCode: string;
  passangerName: string;
  passangerEmail: string;
  passangerDocument: string;
  passangerGender: string;
  emergencyContactName: string;
  emergencyContactTelephone: string;
  seat: string;
  checkedBags: number;
  hasCheckin: boolean;
  terminal: string;
  gate: string;
  priority: number;

  constructor(builder: FlightTicketBuilder) {
    this.airline = builder.airline;
    this.fromAirport = builder.fromAirport;
    this.toAirport = builder.toAirtport;
    this.flightCode = builder.flightCode;
    this.passangerName = builder.passengerName;
    this.passangerEmail = builder.passengerEmail;
    this.passangerDocument = builder.passengerDocument;
    this.passangerGender = builder.passengerGender;
    this.emergencyContactName = builder.emergencyContactName;
    this.emergencyContactTelephone = builder.emergencyContactTelephone;
    this.seat = builder.seat;
    this.checkedBags = builder.checkedBags;
    this.hasCheckin = builder.hasCheckin;
    this.terminal = builder.terminal;
    this.gate = builder.gate;
    this.priority = builder.priority;
  }
}
