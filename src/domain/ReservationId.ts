import { ValidationError } from "./errors/index.js"

export class ReservationId {
    private readonly value: string

    constructor(value: string) {
        this.validate(value)
        this.value = value
    }

    private validate(value: string): void {
        if (value.length === 0) {
            throw new ValidationError("Reservation idは空文字列にできません。")
        }
    }

    getValue(): string {
        return this.value
    }

    toString(): string {
        return this.value
    }

    equals(other: ReservationId): boolean {
        if (!(other instanceof ReservationId)) {
            return false
        }
        return this.value === other.value
    }

    static create(value: string): ReservationId {
        return new ReservationId(value)
    }
}
