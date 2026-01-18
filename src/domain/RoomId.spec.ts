import { test, suite, expect } from 'vitest'
import { RoomId } from './RoomId.js'

suite('RoomId validation', () => {

    test('正常系 - 8桁の英数字', () => {
        const roomId = new RoomId('room0001')
        expect(roomId.getValue()).toBe('room0001')
        expect(roomId.toString()).toBe('room0001')
    })

    test('正常系 - 大文字小文字混在', () => {
        const roomId = new RoomId('Room1234')
        expect(roomId.getValue()).toBe('Room1234')
    })

    test('正常系 - 数字のみ', () => {
        const roomId = new RoomId('12345678')
        expect(roomId.getValue()).toBe('12345678')
    })

    test('正常系 - 英字のみ', () => {
        const roomId = new RoomId('abcdefgh')
        expect(roomId.getValue()).toBe('abcdefgh')
    })

    test('異常系 - room id が8桁より短い場合', () => {
        const wrongId = 'room001'
        expect(() => { new RoomId(wrongId) }).toThrow('Room idは8桁の英数字である必要があります。')
    })

    test('異常系 - room id が8桁より長い場合', () => {
        const wrongId = 'room00001'
        expect(() => { new RoomId(wrongId) }).toThrow('Room idは8桁の英数字である必要があります。')
    })

    test('異常系 - room id にハイフンが含まれる場合', () => {
        const wrongId = 'room-001'
        expect(() => { new RoomId(wrongId) }).toThrow('Room idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - room id に記号が含まれる場合', () => {
        const wrongId = 'room@001'
        expect(() => { new RoomId(wrongId) }).toThrow('Room idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - room id にスペースが含まれる場合', () => {
        const wrongId = 'room 001'
        expect(() => { new RoomId(wrongId) }).toThrow('Room idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - room id にアンダースコアが含まれる場合', () => {
        const wrongId = 'room_001'
        expect(() => { new RoomId(wrongId) }).toThrow('Room idは英数字以外の文字が含まれてはいけません。')
    })

})

suite('RoomId.create factory method', () => {

    test('正常系 - ファクトリメソッドでRoomIdを作成', () => {
        const roomId = RoomId.create('roomid01')
        expect(roomId.getValue()).toBe('roomid01')
    })

})

suite('RoomId.equals method', () => {

    test('正常系 - 同じ値のRoomIdは等しい', () => {
        const roomId1 = new RoomId('room0001')
        const roomId2 = new RoomId('room0001')
        expect(roomId1.equals(roomId2)).toBe(true)
    })

    test('正常系 - 異なる値のRoomIdは等しくない', () => {
        const roomId1 = new RoomId('room0001')
        const roomId2 = new RoomId('room0002')
        expect(roomId1.equals(roomId2)).toBe(false)
    })

})
