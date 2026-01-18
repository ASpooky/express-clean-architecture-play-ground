import type { IIdGenerator } from "./shared/IdGenerator.js"

export class Room {
    id: string
    name: string
    capacity: number

    constructor(id:string,name:string,capacity:number){

        this.idValidation(id)
        this.nameValidation(name)
        this.capacityValidation(capacity)

        this.id = id
        this.name = name
        this.capacity = capacity
    }

    create(name:string,capacity:number,idGenerator:IIdGenerator){
        const id = idGenerator.generate()
        const room = new Room(id,name,capacity)

        return room
    }

    idValidation(id:string){
        if(id.length != 8){
            throw new Error("User idは8桁の英数字である必要があります。")
        }

        if(!/^[a-zA-Z0-9]+$/.test(id)){
            throw new Error("User idは英数字以外の文字が含まれてはいけません。")
        }
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