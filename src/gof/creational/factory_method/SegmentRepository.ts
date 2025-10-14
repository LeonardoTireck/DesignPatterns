import Segment from "./Segment";

export default interface SegmentRepository {
  save(segment: Segment): Promise<void>;
  listByRideId(rideId: string): Promise<Segment[]>;
}
export class SegmentRepositoryMemory implements SegmentRepository {
  segments: Segment[] = [];

  async save(segment: Segment): Promise<void> {
    this.segments.push(segment);
  }

  async listByRideId(rideId: string): Promise<Segment[]> {
    return this.segments.filter((segment) => segment.rideId === rideId);
  }
}
