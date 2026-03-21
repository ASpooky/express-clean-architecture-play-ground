import type { Pool } from "pg";
import type { IReservationRepository } from "../../domain/repositories/IReservationRepository.js";
import { Reservation } from "../../domain/entities/Reservation/Reservation.js";
import { ReservationId } from "../../domain/entities/Reservation/ReservationId.js";
import { UserId } from "../../domain/entities/User/UserId.js";
import { RoomId } from "../../domain/entities/Room/RoomId.js";

export class ReservationRepository implements IReservationRepository {
    constructor(private readonly pool: Pool) {}

    private rowToReservation(row: Record<string, unknown>): Reservation {
        return new Reservation(
            new ReservationId(row.id as string),
            new UserId(row.user_id as string),
            new RoomId(row.room_id as string),
            new Date(row.start_time as string),
            new Date(row.end_time as string),
            row.status as "Confirm" | "Cancel"
        );
    }

    async save(reservation: Reservation): Promise<void> {
        await this.pool.query(
            `INSERT INTO reservations (id, user_id, room_id, start_time, end_time, status)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (id) DO UPDATE
               SET user_id = $2, room_id = $3, start_time = $4, end_time = $5, status = $6`,
            [
                reservation.id.getValue(),
                reservation.userId.getValue(),
                reservation.roomId.getValue(),
                reservation.startTime,
                reservation.endTime,
                reservation.status,
            ]
        );
    }

    async remove(reservation: Reservation): Promise<void> {
        await this.pool.query(
            `DELETE FROM reservations WHERE id = $1`,
            [reservation.id.getValue()]
        );
    }

    async findById(id: ReservationId): Promise<Reservation | null> {
        const result = await this.pool.query(
            `SELECT id, user_id, room_id, start_time, end_time, status
             FROM reservations WHERE id = $1`,
            [id.getValue()]
        );
        if (result.rows.length === 0) return null;
        return this.rowToReservation(result.rows[0]);
    }

    async findByUserId(userId: UserId): Promise<Reservation[]> {
        const result = await this.pool.query(
            `SELECT id, user_id, room_id, start_time, end_time, status
             FROM reservations WHERE user_id = $1`,
            [userId.getValue()]
        );
        return result.rows.map((row) => this.rowToReservation(row));
    }

    async findByRoomId(roomId: RoomId): Promise<Reservation[]> {
        const result = await this.pool.query(
            `SELECT id, user_id, room_id, start_time, end_time, status
             FROM reservations WHERE room_id = $1`,
            [roomId.getValue()]
        );
        return result.rows.map((row) => this.rowToReservation(row));
    }

    async findOverlapping(
        roomId: RoomId,
        startTime: Date,
        endTime: Date
    ): Promise<Reservation[]> {
        const result = await this.pool.query(
            `SELECT id, user_id, room_id, start_time, end_time, status
             FROM reservations
             WHERE room_id = $1
               AND status = 'Confirm'
               AND start_time < $3
               AND end_time > $2`,
            [roomId.getValue(), startTime, endTime]
        );
        return result.rows.map((row) => this.rowToReservation(row));
    }
}
