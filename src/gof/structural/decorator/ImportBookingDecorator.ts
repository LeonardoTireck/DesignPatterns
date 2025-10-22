import Usecase from "./Usecase";

export default class ImportBookingDecorator implements Usecase {
  constructor(readonly useCase: Usecase) {}

  async execute(input: any): Promise<Output> {
    let bookingCodes: string[] = [];
    const bookings = input.split("\n");
    for (const booking of bookings.slice(1)) {
      const [email, checkin_date, checkout_date, category] = booking.split(";");
      const bookRoomInput = {
        email,
        checkinDate: new Date(checkin_date),
        checkoutDate: new Date(checkout_date),
        category,
      };
      const outputBookroom = await this.useCase.execute(bookRoomInput);
      bookingCodes.push(outputBookroom.code);
    }
    return {
      codes: bookingCodes,
    };
  }
}

type Output = {
  codes: string[];
};
