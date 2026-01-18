import type { IIdGenerator } from "./shared/IdGenerator.js"
import { UserId } from "./UserId.js"
import { ValidationError } from "./errors/index.js"

export class User {
    public readonly id : UserId
    public readonly name : string
    public readonly email : string

    constructor(id:UserId,name:string,email:string){
        this.nameValidation(name)
        this.emailValidation(email)

        this.id = id
        this.name = name
        this.email = email
    }

    static create(name:string, email:string, idGenerator:IIdGenerator):User{
        const id = new UserId(idGenerator.generate())

        const user = new User(id,name,email)
        return user
    }

    private nameValidation(name:string){
        if (name.length<1 || name.length>16){
            throw new ValidationError("User nameは1文字以上,16文字以下である必要があります。")
        }
    }

    private emailValidation(email:string){
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            throw new ValidationError("メールアドレスの形式が不正です。")
        }
    }

    public changeName(newName:string):User{
        return new User(this.id,newName,this.email)
    }

    public changeEmail(newEmail:string):User{
        return new User(this.id,this.name,newEmail)
    }

    public equals(other:User):boolean{
        if (!(other instanceof User)){
            return false
        }

        if (!(this.id == other.id)) return false
        if (!(this.name == other.name)) return false
        if (!(this.email == other.email)) return false
        
        return true
    }
}