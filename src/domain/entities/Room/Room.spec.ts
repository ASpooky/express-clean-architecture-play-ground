import { Room } from "./Room.js";
import { RoomId } from "./RoomId.js";
import { test, suite, expect } from "vitest";
import { ValidationError } from "../errors/index.js";

suite('Room name validation', () => {

    const id = new RoomId('room001')
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
        expect(() => { new Room(id, name, capacity) }).toThrow(ValidationError)
    })

    test('名前が32文字を超える場合', () => {
        const name = '12345678901234567abcdefghijklmnopqrstuvwxyz'
        expect(() => { new Room(id, name, capacity) }).toThrow(ValidationError)
    })

})

suite('Room capacity', () => {

    const id = new RoomId('room001')
    const name = 'ConferenceRoomA'

    test('正常系 - 正の整数', () => {
        const capacity = 20
        const room = new Room(id, name, capacity)
        expect(room.capacity).toBe(20)
    })

    test('異常系 - 0人', () => {
        const capacity = 0
        expect(() => { new Room(id, name, capacity) }).toThrow(ValidationError)
    })

    test('異常系 - -1人', () => {
        const capacity = -1
        expect(() => { new Room(id, name, capacity )}).toThrow(ValidationError)
    })

})

suite('Room.create static method', () => {

    const name = 'Conference Room A'
    const capacity = 10

    test('id文字列を使ってルームを作成', () => {
        const room = Room.create('room-test-id-123', name, capacity)
        expect(room.id.getValue()).toBe('room-test-id-123')
        expect(room.name).toBe('Conference Room A')
        expect(room.capacity).toBe(10)
    })

    test('UUID形式のidでルームを作成', () => {
        const uuid = '550e8400-e29b-41d4-a716-446655440000'
        const room = Room.create(uuid, name, capacity)
        expect(room.id.getValue()).toBe(uuid)
    })

})

suite('Room.changeName method', () => {

    const id = new RoomId('room001')
    const capacity = 10

    test('正常系 - 名前を変更', () => {
        const room = new Room(id, 'OldName', capacity)
        const updatedRoom = room.changeName('NewName')
        expect(updatedRoom.name).toBe('NewName')
        expect(updatedRoom.id).toBe(id)
        expect(updatedRoom.capacity).toBe(capacity)
    })

})

suite('Room.changeCapacity method', () => {

    const id = new RoomId('room001')
    const name = 'Conference Room A'

    test('正常系 - capacityを変更', () => {
        const room = new Room(id, name, 10)
        const updatedRoom = room.changeCapacity(20)
        expect(updatedRoom.capacity).toBe(20)
        expect(updatedRoom.id).toBe(id)
        expect(updatedRoom.name).toBe(name)
    })

})

suite('Room.changeRoomStatus method', () => {

    const id = new RoomId('room001')
    const name = 'Conference Room A'
    const capacity = 10

    test('正常系 - ステータスをMaintenaceに変更', () => {
        const room = new Room(id, name, capacity)
        const updatedRoom = room.changeRoomStatus('Maintenace')
        expect(updatedRoom.roomStatus).toBe('Maintenace')
        expect(updatedRoom.id).toBe(id)
        expect(updatedRoom.name).toBe(name)
        expect(updatedRoom.capacity).toBe(capacity)
    })

})

suite('Room.equals method', () => {

    test('正常系 - 同じ値のRoomは等しい', () => {
        const id = new RoomId('room001')
        const room1 = new Room(id, 'Conference Room A', 10)
        const room2 = new Room(id, 'Conference Room A', 10)
        expect(room1.equals(room2)).toBe(true)
    })

    test('正常系 - 異なる値のRoomは等しくない', () => {
        const id1 = new RoomId('room001')
        const id2 = new RoomId('room002')
        const room1 = new Room(id1, 'Conference Room A', 10)
        const room2 = new Room(id2, 'Conference Room A', 10)
        expect(room1.equals(room2)).toBe(false)
    })

})
