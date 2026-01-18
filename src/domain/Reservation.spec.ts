import { test, suite, expect } from "vitest";
import { Reservation } from "./Reservation.js";
import { UserId } from "./UserId.js";
import { RoomId } from "./RoomId.js";
import { ReservationId } from "./ReservationId.js";
import { ValidationError, BusinessRuleViolationError } from "./errors/index.js";

suite("timeValidation", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')

    test("正常系 - 正しい時間範囲（3時間）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T13:00:00Z')

        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.startTime).toEqual(startTime)
        expect(reservation.endTime).toEqual(endTime)
    })

    test("正常系 - 最小時間（30分）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T10:30:00Z')

        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.getDurationMinutes()).toBe(30)
    })

    test("正常系 - 最大時間（8時間）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T18:00:00Z')

        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.getDurationHours()).toBe(8)
    })

    test("異常系 - 終了時刻が開始時刻より前", () => {
        const startTime = new Date('9999-01-01T13:00:00Z')
        const endTime = new Date('9999-01-01T10:00:00Z')

        expect(() => {
            new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        }).toThrow(ValidationError)
    })

    test("異常系 - 終了時刻と開始時刻が同じ", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T10:00:00Z')

        expect(() => {
            new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        }).toThrow(ValidationError)
    })

    test("異常系 - 過去の日時", () => {
        const startTime = new Date('2000-01-01T10:00:00Z')
        const endTime = new Date('2000-01-01T13:00:00Z')

        expect(() => {
            new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        }).toThrow(ValidationError)
    })

    test("異常系 - 予約時間が30分未満（29分）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T10:29:00Z')

        expect(() => {
            new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        }).toThrow(ValidationError)
    })

    test("異常系 - 予約時間が8時間超過（8時間1分）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T18:01:00Z')

        expect(() => {
            new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        }).toThrow(ValidationError)
    })

})

suite("Reservation.create static method", () => {

    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')
    const startTime = new Date('9999-01-01T10:00:00Z')
    const endTime = new Date('9999-01-01T13:00:00Z')

    test("IdGeneratorを使って予約を作成", () => {
        const mockIdGenerator = {
            generate: () => 'resvid12'
        }

        const reservation = Reservation.create(userId, roomId, startTime, endTime, mockIdGenerator)

        expect(reservation.id.getValue()).toBe('resvid12')
        expect(reservation.userId).toBe(userId)
        expect(reservation.roomId).toBe(roomId)
        expect(reservation.startTime).toEqual(startTime)
        expect(reservation.endTime).toEqual(endTime)
        expect(reservation.status).toBe('Confirm')
    })

})

suite("cancel method", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')
    const startTime = new Date('9999-01-01T10:00:00Z')
    const endTime = new Date('9999-01-01T13:00:00Z')

    test("正常系 - Confirmの予約をキャンセル", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        const cancelled = reservation.cancel()

        expect(cancelled.status).toBe('Cancel')
        expect(cancelled.id).toBe(reservation.id)
        expect(cancelled.startTime).toEqual(reservation.startTime)
        expect(cancelled.endTime).toEqual(reservation.endTime)
    })

    test("異常系 - すでにキャンセルされている予約", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Cancel')

        expect(() => {
            reservation.cancel()
        }).toThrow(BusinessRuleViolationError)
    })

})

suite("status check methods", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')
    const startTime = new Date('9999-01-01T10:00:00Z')
    const endTime = new Date('9999-01-01T13:00:00Z')

    test("isConfirmed - Confirmステータス", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        expect(reservation.isConfirmed()).toBe(true)
    })

    test("isConfirmed - Cancelステータス", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Cancel')
        expect(reservation.isConfirmed()).toBe(false)
    })

    test("isCancelled - Cancelステータス", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Cancel')
        expect(reservation.isCancelled()).toBe(true)
    })

    test("isCancelled - Confirmステータス", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')
        expect(reservation.isCancelled()).toBe(false)
    })

})

suite("isActive method", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')

    test("正常系 - Confirmで未来の予約（アクティブ）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T13:00:00Z')
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.isActive()).toBe(true)
    })

    test("正常系 - Cancelの予約（非アクティブ）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T13:00:00Z')
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Cancel')

        expect(reservation.isActive()).toBe(false)
    })

})

suite("isPast method", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')

    test("正常系 - 未来の予約（過去ではない）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T13:00:00Z')
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.isPast()).toBe(false)
    })

})

suite("duration methods", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')

    test("getDurationMinutes - 3時間（180分）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T13:00:00Z')
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.getDurationMinutes()).toBe(180)
    })

    test("getDurationHours - 3時間", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T13:00:00Z')
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.getDurationHours()).toBe(3)
    })

    test("getDurationMinutes - 1.5時間（90分）", () => {
        const startTime = new Date('9999-01-01T10:00:00Z')
        const endTime = new Date('9999-01-01T11:30:00Z')
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        expect(reservation.getDurationMinutes()).toBe(90)
        expect(reservation.getDurationHours()).toBe(1.5)
    })

})

suite("isOverlapping method", () => {

    const reservationId1 = new ReservationId('resv0001')
    const reservationId2 = new ReservationId('resv0002')
    const userId = new UserId('spbgspbg')
    const roomId1 = new RoomId('room0001')
    const roomId2 = new RoomId('room0002')

    test("正常系 - 同じ部屋で時間が重複", () => {
        const reservation1 = new Reservation(
            reservationId1, userId, roomId1,
            new Date('9999-01-01T10:00:00Z'),
            new Date('9999-01-01T12:00:00Z'),
            'Confirm'
        )

        const reservation2 = new Reservation(
            reservationId2, userId, roomId1,
            new Date('9999-01-01T11:00:00Z'),
            new Date('9999-01-01T13:00:00Z'),
            'Confirm'
        )

        expect(reservation1.isOverlapping(reservation2)).toBe(true)
        expect(reservation2.isOverlapping(reservation1)).toBe(true)
    })

    test("正常系 - 同じ部屋で時間が重複しない（連続）", () => {
        const reservation1 = new Reservation(
            reservationId1, userId, roomId1,
            new Date('9999-01-01T10:00:00Z'),
            new Date('9999-01-01T12:00:00Z'),
            'Confirm'
        )

        const reservation2 = new Reservation(
            reservationId2, userId, roomId1,
            new Date('9999-01-01T12:00:00Z'),
            new Date('9999-01-01T14:00:00Z'),
            'Confirm'
        )

        expect(reservation1.isOverlapping(reservation2)).toBe(false)
        expect(reservation2.isOverlapping(reservation1)).toBe(false)
    })

    test("正常系 - 同じ部屋で時間が完全に離れている", () => {
        const reservation1 = new Reservation(
            reservationId1, userId, roomId1,
            new Date('9999-01-01T10:00:00Z'),
            new Date('9999-01-01T12:00:00Z'),
            'Confirm'
        )

        const reservation2 = new Reservation(
            reservationId2, userId, roomId1,
            new Date('9999-01-01T14:00:00Z'),
            new Date('9999-01-01T16:00:00Z'),
            'Confirm'
        )

        expect(reservation1.isOverlapping(reservation2)).toBe(false)
        expect(reservation2.isOverlapping(reservation1)).toBe(false)
    })

    test("正常系 - 異なる部屋（時間は重複）", () => {
        const reservation1 = new Reservation(
            reservationId1, userId, roomId1,
            new Date('9999-01-01T10:00:00Z'),
            new Date('9999-01-01T12:00:00Z'),
            'Confirm'
        )

        const reservation2 = new Reservation(
            reservationId2, userId, roomId2,
            new Date('9999-01-01T11:00:00Z'),
            new Date('9999-01-01T13:00:00Z'),
            'Confirm'
        )

        expect(reservation1.isOverlapping(reservation2)).toBe(false)
        expect(reservation2.isOverlapping(reservation1)).toBe(false)
    })

    test("正常系 - 同じ部屋で一方が他方を完全に含む", () => {
        const reservation1 = new Reservation(
            reservationId1, userId, roomId1,
            new Date('9999-01-01T09:00:00Z'),
            new Date('9999-01-01T15:00:00Z'),
            'Confirm'
        )

        const reservation2 = new Reservation(
            reservationId2, userId, roomId1,
            new Date('9999-01-01T10:00:00Z'),
            new Date('9999-01-01T12:00:00Z'),
            'Confirm'
        )

        expect(reservation1.isOverlapping(reservation2)).toBe(true)
        expect(reservation2.isOverlapping(reservation1)).toBe(true)
    })

})

suite("changeTime method", () => {

    const reservationId = new ReservationId('omgomgom')
    const userId = new UserId('spbgspbg')
    const roomId = new RoomId('12345678')
    const startTime = new Date('9999-01-01T10:00:00Z')
    const endTime = new Date('9999-01-01T13:00:00Z')

    test("正常系 - Confirmの予約の時間を変更", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        const newStartTime = new Date('9999-01-01T14:00:00Z')
        const newEndTime = new Date('9999-01-01T16:00:00Z')

        const changed = reservation.changeTime(newStartTime, newEndTime)

        expect(changed.startTime).toEqual(newStartTime)
        expect(changed.endTime).toEqual(newEndTime)
        expect(changed.status).toBe('Confirm')
        expect(changed.id).toBe(reservation.id)
    })

    test("異常系 - Cancelの予約の時間を変更", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Cancel')

        const newStartTime = new Date('9999-01-01T14:00:00Z')
        const newEndTime = new Date('9999-01-01T16:00:00Z')

        expect(() => {
            reservation.changeTime(newStartTime, newEndTime)
        }).toThrow(BusinessRuleViolationError)
    })

    test("異常系 - 不正な時間に変更しようとする", () => {
        const reservation = new Reservation(reservationId, userId, roomId, startTime, endTime, 'Confirm')

        const newStartTime = new Date('9999-01-01T14:00:00Z')
        const newEndTime = new Date('9999-01-01T14:10:00Z') // 10分しかない

        expect(() => {
            reservation.changeTime(newStartTime, newEndTime)
        }).toThrow(ValidationError)
    })

})