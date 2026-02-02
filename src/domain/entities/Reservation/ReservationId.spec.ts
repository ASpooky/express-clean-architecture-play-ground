import { test, suite, expect } from 'vitest'
import { ReservationId } from './ReservationId.js'
import { ValidationError } from './errors/index.js'

suite('ReservationId validation', () => {

    test('正常系 - 任意の文字列でReservationIdを作成', () => {
        const reservationId = new ReservationId('resv001')
        expect(reservationId.getValue()).toBe('resv001')
        expect(reservationId.toString()).toBe('resv001')
    })

    test('正常系 - UUID形式', () => {
        const reservationId = new ReservationId('550e8400-e29b-41d4-a716-446655440000')
        expect(reservationId.getValue()).toBe('550e8400-e29b-41d4-a716-446655440000')
    })

    test('正常系 - 記号を含む文字列', () => {
        const reservationId = new ReservationId('resv_id@test#123')
        expect(reservationId.getValue()).toBe('resv_id@test#123')
    })

    test('正常系 - 日本語を含む文字列', () => {
        const reservationId = new ReservationId('予約123')
        expect(reservationId.getValue()).toBe('予約123')
    })

    test('異常系 - 空文字列の場合', () => {
        expect(() => { new ReservationId('') }).toThrow(ValidationError)
    })

})

suite('ReservationId.create factory method', () => {

    test('正常系 - ファクトリメソッドでReservationIdを作成', () => {
        const reservationId = ReservationId.create('test-reservation-id')
        expect(reservationId.getValue()).toBe('test-reservation-id')
    })

})

suite('ReservationId.equals method', () => {

    test('正常系 - 同じ値のReservationIdは等しい', () => {
        const reservationId1 = new ReservationId('resv001')
        const reservationId2 = new ReservationId('resv001')
        expect(reservationId1.equals(reservationId2)).toBe(true)
    })

    test('正常系 - 異なる値のReservationIdは等しくない', () => {
        const reservationId1 = new ReservationId('resv001')
        const reservationId2 = new ReservationId('resv002')
        expect(reservationId1.equals(reservationId2)).toBe(false)
    })

})
