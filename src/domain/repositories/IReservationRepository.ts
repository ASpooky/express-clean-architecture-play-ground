import { Reservation } from "../entities/Reservation/Reservation.js";
import { ReservationId } from "../entities/Reservation/ReservationId.js";
import { RoomId } from "../entities/Room/RoomId.js";
import { UserId } from "../entities/User/UserId.js";

export interface IReservationRepository{
    save(reservation: Reservation): Promise<void>
    remove(reservation: Reservation): Promise<void>
    findById(id: ReservationId): Promise<Reservation | null>
    findByUserId(userId: UserId): Promise<Reservation[]>
    findByRoomId(roomId: RoomId): Promise<Reservation[]>
    findOverlapping(roomId: RoomId, startTime: Date, endTime: Date): Promise<Reservation[]>
}
