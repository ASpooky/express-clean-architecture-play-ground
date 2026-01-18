import { RoomId } from "./RoomId.js"
import type { IIdGenerator } from "./shared/IdGenerator.js"

export class Room {
    public readonly id: RoomId
    public readonly name: string
    public readonly capacity: number

    constructor(id:RoomId,name:string,capacity:number){

        this.nameValidation(name)
        this.capacityValidation(capacity)

        this.id = id
        this.name = name
        this.capacity = capacity
    }

    static create(name:string,capacity:number,idGenerator:IIdGenerator):Room{
        const id = new RoomId(idGenerator.generate())
        const room = new Room(id,name,capacity)

        return room
    }

    nameValidation(name:string){
        if (name.length<1 || name.length>32){
            throw new Error("User nameは1文字以上,32文字以下である必要があります。")
        }
    }

    capacityValidation(capacity:number){
        if(capacity <= 0){
            throw new Error("Capacityは正の整数でなければなりません。")
        }
    }

}