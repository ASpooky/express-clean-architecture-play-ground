import { User } from "../domain/entities/User/User.js";
import type { IUserRepository } from "../domain/repositories/IUserRepository.js";
import type { IIdGenerator } from "./shared/IdGenerator.js";

export class CreateUser {
    UserRepository: IUserRepository
    IdGenerator: IIdGenerator

    constructor(UserRepository: IUserRepository, IdGenerator: IIdGenerator) {
        this.UserRepository = UserRepository
        this.IdGenerator = IdGenerator
    }

    async execute(name: string, email: string): Promise<void> {
        const userId = this.IdGenerator.generate()
        const user = User.create(userId, name, email)
        await this.UserRepository.save(user)
    }
}
