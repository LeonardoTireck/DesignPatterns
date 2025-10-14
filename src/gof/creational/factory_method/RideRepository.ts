import Ride from "./Ride";

export default interface RideRepository {
  save(ride: Ride): Promise<void>;
  update(ride: Ride): Promise<void>;
  getById(rideId: string): Promise<Ride>;
}

export class RideRepositoryMemory implements RideRepository {
  rides: Ride[] = [];

  async save(ride: Ride): Promise<void> {
    this.rides.push(ride);
  }
  async update(ride: Ride): Promise<void> {
    const index = this.rides.findIndex((r) => r.rideId === ride.rideId);
    this.rides[index] = ride;
  }
  async getById(rideId: string): Promise<Ride> {
    const ride = this.rides.find((ride) => ride.rideId === rideId);
    if (!ride) throw new Error("Ride not found");
    return ride;
  }
}
