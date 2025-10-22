import Booking from "./Booking";
import BookingRepository from "./BookingRepository";
import Room from "./Room";
import RoomRepository from "./RoomRepository";
import Usecase from "./Usecase";

export default class BookRoom implements Usecase {
  constructor(
    readonly roomRepository: RoomRepository,
    readonly bookingRepository: BookingRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const [availableRoom] =
      await this.roomRepository.getAvailableRoomsByPeriodAndCategory(
        input.checkinDate,
        input.checkoutDate,
        input.category,
      );
    if (!availableRoom) {
      throw new Error("No rooms available for that period and category");
    }
    const room = new Room(
      availableRoom.roomId,
      availableRoom.category,
      availableRoom.price,
      availableRoom.status,
    );
    const booking = Booking.create(
      input.email,
      room,
      input.checkinDate,
      input.checkoutDate,
    );
    await this.bookingRepository.save(booking);
    return {
      code: booking.code,
    };
  }
}

type Input = {
  email: string;
  checkinDate: Date;
  checkoutDate: Date;
  category: string;
};

type Output = {
  code: string;
};
