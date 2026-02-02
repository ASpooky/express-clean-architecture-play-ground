import { User } from "../entities/User/User.js";
import { UserId } from "../entities/User/UserId.js";

export interface IUserRepository{
    save(user: User): Promise<void>
    remove(user: User): Promise<void>
    findById(id: UserId): Promise<User | null>
    findAll(): Promise<User[]>
}