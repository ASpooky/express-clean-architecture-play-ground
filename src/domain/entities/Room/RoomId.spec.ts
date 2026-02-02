import { test, suite, expect } from 'vitest'
import { RoomId } from './RoomId.js'
import { ValidationError } from './errors/index.js'

suite('RoomId validation', () => {

    test('正常系 - 任意の文字列でRoomIdを作成', () => {
        const roomId = new RoomId('room001')
        expect(roomId.getValue()).toBe('room001')
        expect(roomId.toString()).toBe('room001')
    })

    test('正常系 - UUID形式', () => {
        const roomId = new RoomId('550e8400-e29b-41d4-a716-446655440000')
        expect(roomId.getValue()).toBe('550e8400-e29b-41d4-a716-446655440000')
    })

    test('正常系 - 記号を含む文字列', () => {
        const roomId = new RoomId('room_id@test#123')
        expect(roomId.getValue()).toBe('room_id@test#123')
    })

    test('正常系 - 日本語を含む文字列', () => {
        const roomId = new RoomId('会議室A')
        expect(roomId.getValue()).toBe('会議室A')
    })

    test('異常系 - 空文字列の場合', () => {
        expect(() => { new RoomId('') }).toThrow(ValidationError)
    })

})

suite('RoomId.create factory method', () => {

    test('正常系 - ファクトリメソッドでRoomIdを作成', () => {
        const roomId = RoomId.create('test-room-id')
        expect(roomId.getValue()).toBe('test-room-id')
    })

})

suite('RoomId.equals method', () => {

    test('正常系 - 同じ値のRoomIdは等しい', () => {
        const roomId1 = new RoomId('room001')
        const roomId2 = new RoomId('room001')
        expect(roomId1.equals(roomId2)).toBe(true)
    })

    test('正常系 - 異なる値のRoomIdは等しくない', () => {
        const roomId1 = new RoomId('room001')
        const roomId2 = new RoomId('room002')
        expect(roomId1.equals(roomId2)).toBe(false)
    })

})
