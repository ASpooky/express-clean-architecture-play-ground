import type { RoomId } from "./RoomId.js"
import type { UserId } from "./UserId.js"
import { ReservationId } from "./ReservationId.js"
import { ValidationError, BusinessRuleViolationError } from "./errors/index.js"

type ReservationStatus = "Confirm"|"Cancel"

export class Reservation{
    public readonly id: ReservationId
    public readonly userId: UserId
    public readonly roomId: RoomId
    public readonly startTime: Date
    public readonly endTime: Date
    public readonly status: ReservationStatus

    constructor(id:ReservationId,userId:UserId,roomId:RoomId,startTime:Date,endTime:Date,status:ReservationStatus){
        this.timeValidation(startTime,endTime)

        this.id = id
        this.userId = userId
        this.roomId = roomId
        this.startTime = startTime
        this.endTime = endTime
        this.status = status
    }

    static create(id:string, userId:UserId, roomId:RoomId, startTime:Date, endTime:Date):Reservation{
        const reservationId = new ReservationId(id)
        const status: ReservationStatus = "Confirm"

        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, status)
        return reservation
    }

    private timeValidation(startTime:Date,endTime:Date):void{
        if(endTime<=startTime){
            throw new ValidationError("終了時刻は開始時刻より後である必要があります。")
        }

        const now = new Date()

        if(startTime<now){
            throw new ValidationError("過去の日時で予約を作成することはできません。")
        }

        const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000*60)

        if (durationMinutes < 30){
            throw new ValidationError("予約時間は最低30分必要です。")
        }

        if(durationMinutes > 480){
            throw new ValidationError("予約時間は最大8時間までです。")
        }
    }

    public cancel():Reservation{
        if (this.status === "Cancel"){
            throw new BusinessRuleViolationError("すでにキャンセルされています。")
        }

        const now = new Date()

        return new Reservation(this.id,this.userId,this.roomId,this.startTime,this.endTime,"Cancel")
    }

    public isConfirmed():boolean{
        return this.status === "Confirm"
    }

    public isCancelled():boolean{
        return this.status === "Cancel"
    }

    public isActive():boolean{
        const now = new Date()
        return this.status === "Confirm" && this.endTime>now
    }

    public isPast():boolean{
        const now = new Date()
        return this.endTime < now
    }

    public getDurationMinutes():number{
        return (this.endTime.getTime() - this.startTime.getTime())/(1000*60)
    }

    public getDurationHours():number{
        return this.getDurationMinutes()/60
    }

    public isOverlapping(other:Reservation):boolean{
        if(!this.roomId.equals(other.roomId)){
            return false
        }

        return this.startTime < other.endTime && this.endTime > other.startTime
    }

    public changeTime(newStartTime:Date,newEndTime:Date):Reservation{
        if (this.status === "Cancel"){
            throw new BusinessRuleViolationError("キャンセルされた予約の時間を変更できません。")
        }
        this.timeValidation(newStartTime,newEndTime)

        return new Reservation(this.id,this.userId,this.roomId,newStartTime,newEndTime,this.status)
    }

}