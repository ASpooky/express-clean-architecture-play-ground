// usecase はひとつのアクションであるべき
// 部屋予約に必要なのは、ユーザid,room id,startTime,endTime

import { Reservation } from "../domain/entities/Reservation/Reservation.js";
import { BusinessRuleViolationError } from "../domain/entities/errors/index.js";
import type { Room } from "../domain/entities/Room/Room.js";
import type { User } from "../domain/entities/User/User.js";
import type { IReservationRepository } from "../domain/repositories/IReservationRepository.js";
import type { IIdGenerator } from "./shared/IdGenerator.js";

export class ReserveRoom {
    // DI
    ReservationRepository:IReservationRepository
    IdGenerator:IIdGenerator
    constructor(ReservationRepository:IReservationRepository,IdGenerator:IIdGenerator){
        this.ReservationRepository = ReservationRepository
        this.IdGenerator = IdGenerator
    }

    async execute(user:User,room:Room,startTime:Date,endTime:Date):Promise<void>{
        const overlapping = await this.ReservationRepository.findOverlapping(room.id, startTime, endTime)
        if (overlapping.length > 0) {
            throw new BusinessRuleViolationError("指定された時間帯には既に予約が存在します。")
        }

        const reservationId = this.IdGenerator.generate()
        const reservation = Reservation.create(reservationId,user.id,room.id,startTime,endTime)
        await this.ReservationRepository.save(reservation)
    }
}
