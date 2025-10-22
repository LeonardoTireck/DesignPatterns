import crypto from "crypto";
import Room from "./Room";

export default class Booking {
  constructor(
    readonly code: string,
    readonly email: string,
    readonly roomId: string,
    readonly checkinDate: Date,
    readonly checkoutDate: Date,
    readonly duration: number,
    readonly price: number,
    private _status: string,
  ) {}

  static create(
    email: string,
    room: Room,
    checkinDate: Date,
    checkoutDate: Date,
  ) {
    const code = crypto.randomUUID();
    const duration =
      (checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24);
    const price = duration * room.price;
    return new Booking(
      code,
      email,
      room.roomId,
      checkinDate,
      checkoutDate,
      duration,
      price,
      "confirmed",
    );
  }

  cancel() {
    this._status = "cancelled";
  }

  get status() {
    return this._status;
  }
}
