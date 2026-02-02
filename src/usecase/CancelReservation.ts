import { BusinessRuleViolationError } from "../domain/entities/errors/index.js";
import type { ReservationId } from "../domain/entities/Reservation/ReservationId.js";
import type { IReservationRepository } from "../domain/repositories/IReservationRepository.js";

export class CancelReservation {
    ReservationRepository: IReservationRepository

    constructor(ReservationRepository: IReservationRepository) {
        this.ReservationRepository = ReservationRepository
    }

    async execute(reservationId: ReservationId): Promise<void> {
        const reservation = await this.ReservationRepository.findById(reservationId)
        if (!reservation) {
            throw new BusinessRuleViolationError("予約が見つかりません。")
        }

        const cancelledReservation = reservation.cancel()
        await this.ReservationRepository.save(cancelledReservation)
    }
}
