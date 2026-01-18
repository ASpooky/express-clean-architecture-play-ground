export class ReservationId {
    private readonly value: string

    constructor(value: string) {
        this.validate(value)
        this.value = value
    }

    private validate(value: string): void {
        if (value.length !== 8) {
            throw new Error("Reservation idは8桁の英数字である必要があります。")
        }

        if (!/^[a-zA-Z0-9]+$/.test(value)) {
            throw new Error("Reservation idは英数字以外の文字が含まれてはいけません。")
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
