import type { IIdGenerator } from "./shared/IdGenerator.js"
import { UserId } from "./UserId.js"

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
            throw new Error("User nameは1文字以上,16文字以下である必要があります。")
        }
    }

    private emailValidation(email:string){
        if (!email.includes('@')){
            throw new Error("メールアドレスの形式が不正です。")
        }
    }
}