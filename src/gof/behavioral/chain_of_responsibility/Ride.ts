import FareCalculator from "./FareCalculator";
import Segment from "./Segment";

export default class Ride {
  private segments: Segment[] = [];
  private fare = 0;

  constructor(readonly fareCalculator: FareCalculator) {}

  addSegment(distance: number, date: Date) {
    this.segments.push(new Segment(distance, date));
  }

  calculateFare() {
    this.fare = 0;

    for (const segment of this.segments) {
      this.fare += this.fareCalculator.calculate(segment);
    }
    this.fare = this.fare < 10 ? 10 : this.fare;
  }

  getFare() {
    return this.fare;
  }
}
