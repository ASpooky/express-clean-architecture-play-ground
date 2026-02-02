import { Room } from "../entities/Room/Room.js";
import { RoomId } from "../entities/Room/RoomId.js";

export interface IRoomRepository{
    save(room: Room): Promise<void>
    remove(room: Room): Promise<void>
    findById(id: RoomId): Promise<Room | null>
    findAll(): Promise<Room[]>
}
