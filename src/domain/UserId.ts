import { ValidationError } from "./errors/index.js"

export class UserId {
    private readonly value: string

    constructor(value: string) {
        this.validate(value)
        this.value = value
    }

    private validate(value: string): void {
        if (value.length !== 8) {
            throw new ValidationError("User idは8桁の英数字である必要があります。")
        }

        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            throw new ValidationError("User idは英数字以外の文字が含まれてはいけません。")
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
