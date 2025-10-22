import BookingRepository from "./BookingRepository";
import Usecase from "./Usecase";

export default class CancelBooking implements Usecase {
  constructor(readonly bookingRepository: BookingRepository) {}

  async execute(input: Input): Promise<Output> {
    const booking = await this.bookingRepository.getBookingByCode(input.code);
    if (!booking) throw new Error("Booking not found");
    booking.cancel();
    await this.bookingRepository.update(booking);
    return {
      status: booking.status,
    };
  }
}

type Input = {
  code: string;
};

type Output = {
  status: string;
};
