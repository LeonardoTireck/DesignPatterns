import Location from "./Location";
import crypto from "crypto";
import Segment from "./Segment";

export default class Ride {
  rideId: string;
  lastLocation: Location;
  constructor(lat: number, long: number, date: Date) {
    this.rideId = crypto.randomUUID();
    this.lastLocation = new Location(lat, long, date);
  }

  updateLocation(newLocation: Location) {
    this.lastLocation = newLocation;
  }

  calculateFare(segments: Segment[]) {
    let total = 0;
    for (const segment of segments) {
      total += segment.getDistance();
    }

    return total * 4;
  }
}
