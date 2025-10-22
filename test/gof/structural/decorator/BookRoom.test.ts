import { BookingRepositoryDatabase } from "../../../../src/gof/structural/decorator/BookingRepository";
import BookRoom from "../../../../src/gof/structural/decorator/BookRoom";
import CancelBooking from "../../../../src/gof/structural/decorator/CancelBooking";
import GetBookingByCode from "../../../../src/gof/structural/decorator/GetBookingByCode";
import { RoomRepositoryDatabase } from "../../../../src/gof/structural/decorator/RoomRepository";

describe("Testes de integracao para reserva de um quatro", function () {
  test("Deve reservar um quarto e depois cancelar a reserva", async function () {
    const roomRepository = new RoomRepositoryDatabase();
    const bookingResository = new BookingRepositoryDatabase();
    const bookRoom = new BookRoom(roomRepository, bookingResository);
    const input = {
      email: "john.doe@gmail.com",
      checkinDate: new Date("2025-10-10T10:00:00"),
      checkoutDate: new Date("2025-10-15T10:00:00"),
      category: "suite",
    };
    const outputBookRoom = await bookRoom.execute(input);
    const getBookingByCode = new GetBookingByCode(bookingResository);
    const outputGetBookingByCode = await getBookingByCode.execute({
      code: outputBookRoom.code,
    });
    expect(outputGetBookingByCode.price).toBe(2500);
    expect(outputGetBookingByCode.duration).toBe(5);
    const cancelBooking = new CancelBooking(bookingResository);
    const outputCancelBooking = await cancelBooking.execute({
      code: outputBookRoom.code,
    });
    expect(outputCancelBooking.status).toBe("cancelled");
  });
});
