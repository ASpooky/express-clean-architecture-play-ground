import type { RoomId } from "./RoomId.js"
import type { IIdGenerator } from "./shared/IdGenerator.js"
import type { UserId } from "./UserId.js"
import { ReservationId } from "./ReservationId.js"

type ReservationStatus = "Confirm"|"Cancel"

export class Reservation{
    public readonly id: ReservationId
    public readonly userId: UserId
    public readonly roomId: RoomId
    public readonly startTime: Date
    public readonly endTime: Date
    public readonly status: ReservationStatus

    constructor(id:ReservationId,userId:UserId,roomId:RoomId,startTime:Date,endTime:Date,status:ReservationStatus){

        this.id = id
        this.userId = userId
        this.roomId = roomId
        this.startTime = startTime
        this.endTime = endTime
        this.status = status
    }

    static create(userId:UserId,roomId:RoomId,startTime:Date,endTime:Date,idGenerator:IIdGenerator):Reservation{
        const id = new ReservationId(idGenerator.generate())
        const status: ReservationStatus = "Confirm"

        const reservation = new Reservation(id, userId, roomId, startTime, endTime, status)
        return reservation
    }

}