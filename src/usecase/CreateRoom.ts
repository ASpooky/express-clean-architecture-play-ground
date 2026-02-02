import { Room } from "../domain/entities/Room/Room.js";
import type { IRoomRepository } from "../domain/repositories/IRoomRepository.js";
import type { IIdGenerator } from "./shared/IdGenerator.js";

export class CreateRoom {
    RoomRepository: IRoomRepository
    IdGenerator: IIdGenerator

    constructor(RoomRepository: IRoomRepository, IdGenerator: IIdGenerator) {
        this.RoomRepository = RoomRepository
        this.IdGenerator = IdGenerator
    }

    async execute(name: string, capacity: number): Promise<void> {
        const roomId = this.IdGenerator.generate()
        const room = Room.create(roomId, name, capacity)
        await this.RoomRepository.save(room)
    }
}
