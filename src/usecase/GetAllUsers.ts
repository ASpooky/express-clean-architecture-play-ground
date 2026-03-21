import type { User } from "../domain/entities/User/User.js";
import type { IUserRepository } from "../domain/repositories/IUserRepository.js";

export class GetAllUsers {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}
