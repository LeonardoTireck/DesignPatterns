import Location from "./Location";
import RideRepository from "./RideRepository";
import SegmentRepository from "./SegmentRepository";

export default class UpdateLocation {
  constructor(
    readonly rideRepository: RideRepository,
    readonly segmentRepository: SegmentRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository.getById(input.rideId);
    const newLocation = new Location(input.lat, input.long, input.date);
    // this is the main implementation of the GOF's factory method:
    const segment = ride.createSegment(ride.lastLocation, newLocation);
    ride.updateLocation(newLocation);
    await this.rideRepository.update(ride);
    await this.segmentRepository.save(segment);
  }
}

interface Input {
  rideId: string;
  lat: number;
  long: number;
  date: Date;
}
