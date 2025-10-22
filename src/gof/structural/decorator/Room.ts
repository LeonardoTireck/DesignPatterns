export default class Room {
  constructor(
    readonly roomId: string,
    readonly category: string,
    readonly price: number,
    readonly status: string,
  ) {}
}
