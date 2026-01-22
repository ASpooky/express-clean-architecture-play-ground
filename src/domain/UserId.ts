import { ValidationError } from "./errors/index.js"

export class UserId {
    private readonly value: string

    constructor(value: string) {
        this.validate(value)
        this.value = value
    }

    private validate(value: string): void {
        if (value.length === 0) {
            throw new ValidationError("User idは空文字列にできません。")
        }
    }

    getValue(): string {
        return this.value
    }

    toString(): string {
        return this.value
    }

    equals(other: UserId): boolean {
        if (!(other instanceof UserId)) {
            return false
        }
        return this.value === other.value
    }

    static create(value: string): UserId {
        return new UserId(value)
    }
}
