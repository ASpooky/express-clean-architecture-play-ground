import type { Reservation } from "../domain/entities/Reservation/Reservation.js";
import type { UserId } from "../domain/entities/User/UserId.js";
import type { IReservationRepository } from "../domain/repositories/IReservationRepository.js";

export class GetUserReservations {
    ReservationRepository: IReservationRepository

    constructor(ReservationRepository: IReservationRepository) {
        this.ReservationRepository = ReservationRepository
    }

    async execute(userId: UserId): Promise<Reservation[]> {
        return await this.ReservationRepository.findByUserId(userId)
    }
}
