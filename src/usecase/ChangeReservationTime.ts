import { BusinessRuleViolationError } from "../domain/entities/errors/index.js";
import type { ReservationId } from "../domain/entities/Reservation/ReservationId.js";
import type { IReservationRepository } from "../domain/repositories/IReservationRepository.js";

export class ChangeReservationTime {
    ReservationRepository: IReservationRepository

    constructor(ReservationRepository: IReservationRepository) {
        this.ReservationRepository = ReservationRepository
    }

    async execute(reservationId: ReservationId, newStartTime: Date, newEndTime: Date): Promise<void> {
        const reservation = await this.ReservationRepository.findById(reservationId)
        if (!reservation) {
            throw new BusinessRuleViolationError("予約が見つかりません。")
        }

        const overlapping = await this.ReservationRepository.findOverlapping(reservation.roomId, newStartTime, newEndTime)
        const overlappingExcludingSelf = overlapping.filter(r => !r.id.equals(reservationId))
        if (overlappingExcludingSelf.length > 0) {
            throw new BusinessRuleViolationError("指定された時間帯には既に予約が存在します。")
        }

        const updatedReservation = reservation.changeTime(newStartTime, newEndTime)
        await this.ReservationRepository.save(updatedReservation)
    }
}
