import BookingRepository from "./BookingRepository";
import Usecase from "./Usecase";

export default class GetBookingByCode implements Usecase {
  constructor(readonly bookingRepository: BookingRepository) {}

  async execute(input: Input): Promise<Output> {
    const booking = await this.bookingRepository.getBookingByCode(input.code);
    if (!booking) throw new Error("Booking not found");
    return {
      duration: booking.duration,
      price: booking.price,
    };
  }
}

type Input = {
  code: string;
};

type Output = {
  duration: number;
  price: number;
};
