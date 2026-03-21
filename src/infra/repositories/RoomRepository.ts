import type { Pool } from "pg";
import type { IRoomRepository } from "../../domain/repositories/IRoomRepository.js";
import { Room } from "../../domain/entities/Room/Room.js";
import { RoomId } from "../../domain/entities/Room/RoomId.js";

export class RoomRepository implements IRoomRepository {
    constructor(private readonly pool: Pool) {}

    async save(room: Room): Promise<void> {
        await this.pool.query(
            `INSERT INTO rooms (id, name, capacity, room_status)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (id) DO UPDATE SET name = $2, capacity = $3, room_status = $4`,
            [room.id.getValue(), room.name, room.capacity, room.roomStatus]
        );
    }

    async remove(room: Room): Promise<void> {
        await this.pool.query(
            `DELETE FROM rooms WHERE id = $1`,
            [room.id.getValue()]
        );
    }

    async findById(id: RoomId): Promise<Room | null> {
        const result = await this.pool.query(
            `SELECT id, name, capacity, room_status FROM rooms WHERE id = $1`,
            [id.getValue()]
        );
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return new Room(
            new RoomId(row.id),
            row.name,
            row.capacity,
            row.room_status
        );
    }

    async findAll(): Promise<Room[]> {
        const result = await this.pool.query(
            `SELECT id, name, capacity, room_status FROM rooms`
        );
        return result.rows.map(
            (row) => new Room(new RoomId(row.id), row.name, row.capacity, row.room_status)
        );
    }
}
