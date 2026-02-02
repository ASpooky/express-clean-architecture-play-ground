import { RoomId } from "./RoomId.js"
import { ValidationError } from "../errors/index.js"

type RoomStatus = "Available"|"Maintenace"|"Unavailable"

export class Room {
    public readonly id: RoomId
    public readonly name: string
    public readonly capacity: number
    public readonly roomStatus:RoomStatus

    constructor(id:RoomId,name:string,capacity:number,roomStatus:RoomStatus="Available"){

        this.nameValidation(name)
        this.capacityValidation(capacity)

        this.id = id
        this.name = name
        this.capacity = capacity
        this.roomStatus = roomStatus
    }

    static create(id:string, name:string, capacity:number):Room{
        const roomId = new RoomId(id)
        const room = new Room(roomId,name,capacity)

        return room
    }

    private nameValidation(name:string){
        if (name.length<1 || name.length>32){
            throw new ValidationError("Room nameは1文字以上,32文字以下である必要があります。")
        }
    }

    private capacityValidation(capacity:number){
        if(!Number.isInteger(capacity)){
            throw new ValidationError("Capacityは整数でなければなりません。")
        }
        if(capacity <= 0){
            throw new ValidationError("Capacityは正の整数でなければなりません。")
        }
        if(capacity >= 100){
            throw new ValidationError("100人以上を割り当てられる部屋は存在しません。")
        }
    }

    public changeName(newName:string):Room{
        return new Room(this.id,newName,this.capacity,this.roomStatus)
    }

    public changeCapacity(newCapacity:number):Room{
        return new Room(this.id,this.name,newCapacity,this.roomStatus)
    }

    public changeRoomStatus(newRoomStatus:RoomStatus):Room{
        return new Room(this.id,this.name,this.capacity,newRoomStatus)
    }

    public equals(other:Room):boolean{
        if (!(other instanceof Room)){
            return false
        }

        if(!(other.id == this.id))return false
        if(!(other.name == this.name))return false
        if(!(other.capacity == this.capacity))return false
        if(!(other.roomStatus == this.roomStatus))return false

        return true
    }

}