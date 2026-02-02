import type { Room } from "../domain/entities/Room/Room.js";
import type { IRoomRepository } from "../domain/repositories/IRoomRepository.js";

export class GetAllRooms {
    RoomRepository: IRoomRepository

    constructor(RoomRepository: IRoomRepository) {
        this.RoomRepository = RoomRepository
    }

    async execute(): Promise<Room[]> {
        return await this.RoomRepository.findAll()
    }
}
