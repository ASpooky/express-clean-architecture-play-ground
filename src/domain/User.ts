import type { IIdGenerator } from "./shared/IdGenerator.js"

export class User {
    public readonly id : string
    public readonly name : string
    public readonly email : string

    constructor(id:string,name:string,email:string){
        this.idValidation(id)
        this.nameValidation(name)
        this.emailValidation(email)

        this.id = id
        this.name = name
        this.email = email
    }

    static create(name:string, email:string, idGenerator:IIdGenerator):User{
        const id = idGenerator.generate()

        const user = new User(id,name,email)
        return user
    }

    private idValidation(id:string){
        if(id.length != 8){
            throw new Error("User idは8桁の英数字である必要があります。")
        }

        if(!/^[a-zA-Z0-9]+$/.test(id)){
            throw new Error("User idは英数字以外の文字が含まれてはいけません。")
        }
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