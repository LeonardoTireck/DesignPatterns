import FlightTicket from "../../../../src/gof/creational/builder/FlightTicket";
import FlightTicketBuilder from "../../../../src/gof/creational/builder/FlightTicketBuilder";

test("Deve criar uma passagem aerea", function () {
  const builder = new FlightTicketBuilder()
    .setFlight("Azul", "9876")
    .setTrip("FLN", "GRU")
    .setPassenger("John Doe", "john.doe@gmail.com", "111.111.111-11", "M")
    .setEmergencyContact("Bob Simpson", "5511999999999")
    .setSeat("8A")
    .setCheckedBags(2)
    .setCheckinInformation(true, "1", "4A")
    .setPriority(5);
  const flightTicket = new FlightTicket(builder);
  console.log(flightTicket);
  expect(flightTicket.passangerName).toBe("John Doe");
});
