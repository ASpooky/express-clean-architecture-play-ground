import { Room } from "./Room.js";
import { RoomId } from "./RoomId.js";
import { test, suite, expect } from "vitest";

suite('Room name validation', () => {

    const id = new RoomId('room0001')
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

    const id = new RoomId('room0001')
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

suite('Room.create static method', () => {

    const name = 'Conference Room A'
    const capacity = 10

    test('IdGeneratorを使ってルームを作成', () => {
        const mockIdGenerator = {
            generate: () => 'roomid12'
        }
        const room = Room.create(name, capacity, mockIdGenerator)
        expect(room.id.getValue()).toBe('roomid12')
        expect(room.name).toBe('Conference Room A')
        expect(room.capacity).toBe(10)
    })

})