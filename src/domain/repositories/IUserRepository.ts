import { User } from "../entities/User/User.js";

export interface IUserRepository{
    save(user:User):Promise<void>
    remove(user: User):Promise<void>
    findById(user:User):Promise<void>
}