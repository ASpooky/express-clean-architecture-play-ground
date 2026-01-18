import { Room } from "./Room.js";
import { test, suite, expect } from "vitest";

suite('Room id validation', () => {

    const id = 'room0001'
    const name = 'Conference Room A'
    const capacity = 10

    test('正常系', () => {
        const room = new Room(id, name, capacity)
        expect(room.id).toBe('room0001')
        expect(room.name).toBe('Conference Room A')
        expect(room.capacity).toBe(10)
    })

    test('room id が8桁以外の場合', () => {
        const wrongId = 'room001'
        expect(() => { new Room(wrongId, name, capacity) }).toThrow()
    })

    test('room id に英数字以外が含まれる場合', () => {
        const wrongId = 'room-001'
        expect(() => { new Room(wrongId, name, capacity) }).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

    test('room id に記号が含まれる場合', () => {
        const wrongId = 'room@001'
        expect(() => { new Room(wrongId, name, capacity) }).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

})

suite('Room name validation', () => {

    const id = 'room0001'
    const capacity = 10

    test('正常系 - 1文字の名前', () => {
        const name = 'A'
        const room = new Room(id, name, capacity)
        expect(room.name).toBe('A')
    })

    test('正常系 - 16文字の名前', () => {
        const name = '1234567890123456'
        const room = new Room(id, name, capacity)
        expect(room.name).toBe('1234567890123456')
    })

    test('名前が空文字列の場合', () => {
        const name = ''
        expect(() => { new Room(id, name, capacity) }).toThrow('User nameは1文字以上,32文字以下である必要があります。')
    })

    test('名前が32文字を超える場合', () => {
        const name = '12345678901234567abcdefghijklmnopqrstuvwxyz'
        expect(() => { new Room(id, name, capacity) }).toThrow('User nameは1文字以上,32文字以下である必要があります。')
    })

})

suite('Room capacity', () => {

    const id = 'room0001'
    const name = 'ConferenceRoomA'

    test('正常系 - 正の整数', () => {
        const capacity = 20
        const room = new Room(id, name, capacity)
        expect(room.capacity).toBe(20)
    })

    test('異常系 - 0人', () => {
        const capacity = 0
        expect(() => { new Room(id, name, capacity) }).toThrow('Capacityは正の整数でなければなりません。')
    })

    test('異常系 - -1人', () => {
        const capacity = -1
        expect(() => { new Room(id, name, capacity )}).toThrow('Capacityは正の整数でなければなりません。')
    })

})