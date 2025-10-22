import { BookingRepositoryDatabase } from "../../../../src/gof/structural/decorator/BookingRepository";
import BookRoom from "../../../../src/gof/structural/decorator/BookRoom";
import CancelBooking from "../../../../src/gof/structural/decorator/CancelBooking";
import GetBookingByCode from "../../../../src/gof/structural/decorator/GetBookingByCode";
import ImportBookingDecorator from "../../../../src/gof/structural/decorator/ImportBookingDecorator";
import LogDecorator from "../../../../src/gof/structural/decorator/LogDecorator";
import { RoomRepositoryDatabase } from "../../../../src/gof/structural/decorator/RoomRepository";

describe("Testes de integracao para importacao de uma lista de bookings", function () {
  const bookingResository = new BookingRepositoryDatabase();
  const roomRepository = new RoomRepositoryDatabase();
  const cancelBooking = new CancelBooking(bookingResository);

  test("Deve importar uma lista de bookings e depois cancelar os bookings", async function () {
    const input = `email;checkin_date;checkout_date;category
john.doe1@gmail.com;2021-03-01T10:00:00;2021-03-05T10:00:00;suite
john.doe2@gmail.com;2021-03-06T10:00:00;2021-03-09T10:00:00;suite
john.doe3@gmail.com;2021-03-10T10:00:00;2021-03-12T10:00:00;suite
john.doe4@gmail.com;2021-03-13T10:00:00;2021-03-16T10:00:00;suite`;

    const importBooking = new LogDecorator(
      new ImportBookingDecorator(
        new LogDecorator(new BookRoom(roomRepository, bookingResository)),
      ),
    );
    const outputImportBooking = await importBooking.execute(input);

    const getBookingByCode = new GetBookingByCode(bookingResository);

    let bookings = [];

    for (const code of outputImportBooking.codes) {
      let outputGetBookingByCode = await getBookingByCode.execute({
        code,
      });
      expect(outputGetBookingByCode.duration).toBeDefined();
      expect(outputGetBookingByCode.price).toBeDefined();
      bookings.push(outputGetBookingByCode);
      await cancelBooking.execute({
        code,
      });
    }
  });
});
