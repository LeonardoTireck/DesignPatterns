import Booking from "./Booking";
import pgp from "pg-promise";

export default interface BookingRepository {
  save(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  getBookingByCode(code: string): Promise<Booking | undefined>;
}

export class BookingRepositoryDatabase implements BookingRepository {
  async save(booking: Booking): Promise<void> {
    const connection = pgp()(
      "postgresql://myuser:mypassword@localhost:5432/mydb",
    );
    await connection.query(
      "insert into design_patterns.booking (code, room_id, email, checkin_date,checkout_date, duration, price, status) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        booking.code,
        booking.roomId,
        booking.email,
        booking.checkinDate,
        booking.checkoutDate,
        booking.duration,
        booking.price,
        booking.status,
      ],
    );
    await connection.$pool.end();
  }

  async update(booking: Booking): Promise<void> {
    const connection = pgp()(
      "postgresql://myuser:mypassword@localhost:5432/mydb",
    );
    await connection.query(
      "update design_patterns.booking set status = $1 where code = $2",
      [booking.status, booking.code],
    );
    await connection.$pool.end();
  }

  async getBookingByCode(code: string): Promise<Booking | undefined> {
    const connection = pgp()(
      "postgresql://myuser:mypassword@localhost:5432/mydb",
    );
    const booking = await connection.query(
      "select * from design_patterns.booking where code = $1",
      [code],
    );
    await connection.$pool.end();
    return new Booking(
      booking[0].code,
      booking[0].email,
      booking[0].room_id,
      new Date(booking[0].checkin_date),
      new Date(booking[0].checkout_date),
      parseFloat(booking[0].duration),
      parseFloat(booking[0].price),
      booking[0].status,
    );
  }
}
