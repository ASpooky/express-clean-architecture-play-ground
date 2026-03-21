import { Reservation } from "../domain/entities/Reservation/Reservation.js";
import { BusinessRuleViolationError } from "../domain/entities/errors/index.js";
import { UserId } from "../domain/entities/User/UserId.js";
import { RoomId } from "../domain/entities/Room/RoomId.js";
import type { IReservationRepository } from "../domain/repositories/IReservationRepository.js";
import type { IUserRepository } from "../domain/repositories/IUserRepository.js";
import type { IRoomRepository } from "../domain/repositories/IRoomRepository.js";
import type { IIdGenerator } from "./shared/IdGenerator.js";

export class ReserveRoom {
    constructor(
        private readonly reservationRepository: IReservationRepository,
        private readonly userRepository: IUserRepository,
        private readonly roomRepository: IRoomRepository,
        private readonly idGenerator: IIdGenerator,
    ) {}

    async execute(userId: string, roomId: string, startTime: Date, endTime: Date): Promise<void> {
        const user = await this.userRepository.findById(new UserId(userId));
        if (!user) throw new BusinessRuleViolationError("ユーザーが見つかりません。");

        const room = await this.roomRepository.findById(new RoomId(roomId));
        if (!room) throw new BusinessRuleViolationError("会議室が見つかりません。");

        const overlapping = await this.reservationRepository.findOverlapping(room.id, startTime, endTime);
        if (overlapping.length > 0) {
            throw new BusinessRuleViolationError("指定された時間帯には既に予約が存在します。");
        }

        const reservationId = this.idGenerator.generate();
        const reservation = Reservation.create(reservationId, user.id, room.id, startTime, endTime);
        await this.reservationRepository.save(reservation);
    }
}
