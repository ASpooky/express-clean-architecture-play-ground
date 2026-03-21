import type { Pool } from "pg";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { User } from "../../domain/entities/User/User.js";
import { UserId } from "../../domain/entities/User/UserId.js";

export class UserRepository implements IUserRepository {
    constructor(private readonly pool: Pool) {}

    async save(user: User): Promise<void> {
        await this.pool.query(
            `INSERT INTO users (id, name, email)
             VALUES ($1, $2, $3)
             ON CONFLICT (id) DO UPDATE SET name = $2, email = $3`,
            [user.id.getValue(), user.name, user.email]
        );
    }

    async remove(user: User): Promise<void> {
        await this.pool.query(
            `DELETE FROM users WHERE id = $1`,
            [user.id.getValue()]
        );
    }

    async findById(id: UserId): Promise<User | null> {
        const result = await this.pool.query(
            `SELECT id, name, email FROM users WHERE id = $1`,
            [id.getValue()]
        );
        if (result.rows.length === 0) return null;
        const row = result.rows[0];
        return User.create(row.id, row.name, row.email);
    }

    async findAll(): Promise<User[]> {
        const result = await this.pool.query(
            `SELECT id, name, email FROM users`
        );
        return result.rows.map((row) => User.create(row.id, row.name, row.email));
    }
}
