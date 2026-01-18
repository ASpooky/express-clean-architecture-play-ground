import { test, suite, expect } from 'vitest'
import { ReservationId } from './ReservationId.js'

suite('ReservationId validation', () => {

    test('正常系 - 8桁の英数字', () => {
        const reservationId = new ReservationId('resv0001')
        expect(reservationId.getValue()).toBe('resv0001')
        expect(reservationId.toString()).toBe('resv0001')
    })

    test('正常系 - 大文字小文字混在', () => {
        const reservationId = new ReservationId('Resv1234')
        expect(reservationId.getValue()).toBe('Resv1234')
    })

    test('正常系 - 数字のみ', () => {
        const reservationId = new ReservationId('12345678')
        expect(reservationId.getValue()).toBe('12345678')
    })

    test('正常系 - 英字のみ', () => {
        const reservationId = new ReservationId('abcdefgh')
        expect(reservationId.getValue()).toBe('abcdefgh')
    })

    test('異常系 - reservation id が8桁より短い場合', () => {
        const wrongId = 'resv001'
        expect(() => { new ReservationId(wrongId) }).toThrow('Reservation idは8桁の英数字である必要があります。')
    })

    test('異常系 - reservation id が8桁より長い場合', () => {
        const wrongId = 'resv00001'
        expect(() => { new ReservationId(wrongId) }).toThrow('Reservation idは8桁の英数字である必要があります。')
    })

    test('異常系 - reservation id にハイフンが含まれる場合', () => {
        const wrongId = 'resv-001'
        expect(() => { new ReservationId(wrongId) }).toThrow('Reservation idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - reservation id に記号が含まれる場合', () => {
        const wrongId = 'resv@001'
        expect(() => { new ReservationId(wrongId) }).toThrow('Reservation idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - reservation id にスペースが含まれる場合', () => {
        const wrongId = 'resv 001'
        expect(() => { new ReservationId(wrongId) }).toThrow('Reservation idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - reservation id にアンダースコアが含まれる場合', () => {
        const wrongId = 'resv_001'
        expect(() => { new ReservationId(wrongId) }).toThrow('Reservation idは英数字以外の文字が含まれてはいけません。')
    })

})

suite('ReservationId.create factory method', () => {

    test('正常系 - ファクトリメソッドでReservationIdを作成', () => {
        const reservationId = ReservationId.create('resvid01')
        expect(reservationId.getValue()).toBe('resvid01')
    })

})

suite('ReservationId.equals method', () => {

    test('正常系 - 同じ値のReservationIdは等しい', () => {
        const reservationId1 = new ReservationId('resv0001')
        const reservationId2 = new ReservationId('resv0001')
        expect(reservationId1.equals(reservationId2)).toBe(true)
    })

    test('正常系 - 異なる値のReservationIdは等しくない', () => {
        const reservationId1 = new ReservationId('resv0001')
        const reservationId2 = new ReservationId('resv0002')
        expect(reservationId1.equals(reservationId2)).toBe(false)
    })

})
