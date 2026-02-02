import { BusinessRuleViolationError } from "../domain/entities/errors/index.js";
import type { UserId } from "../domain/entities/User/UserId.js";
import type { IUserRepository } from "../domain/repositories/IUserRepository.js";

export class DeleteUser {
    UserRepository: IUserRepository

    constructor(UserRepository: IUserRepository) {
        this.UserRepository = UserRepository
    }

    async execute(userId: UserId): Promise<void> {
        const user = await this.UserRepository.findById(userId)
        if (!user) {
            throw new BusinessRuleViolationError("ユーザーが見つかりません。")
        }

        await this.UserRepository.remove(user)
    }
}
