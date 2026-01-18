import { ValidationError } from "./errors/index.js"

export class RoomId {
    private readonly value: string

    constructor(value: string) {
        this.validate(value)
        this.value = value
    }

    private validate(value: string): void {
        if (value.length === 0) {
            throw new ValidationError("Room idは空文字列にできません。")
        }
    }

    getValue(): string {
        return this.value
    }

    toString(): string {
        return this.value
    }

    equals(other: RoomId): boolean {
        if (!(other instanceof RoomId)) {
            return false
        }
        return this.value === other.value
    }

    static create(value: string): RoomId {
        return new RoomId(value)
    }
}