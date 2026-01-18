import { test, suite, expect } from 'vitest'
import { UserId } from './UserId.js'

suite('UserId validation', () => {

    test('正常系 - 8桁の英数字', () => {
        const userId = new UserId('birubiru')
        expect(userId.getValue()).toBe('birubiru')
        expect(userId.toString()).toBe('birubiru')
    })

    test('正常系 - 大文字小文字混在', () => {
        const userId = new UserId('Test1234')
        expect(userId.getValue()).toBe('Test1234')
    })

    test('正常系 - 数字のみ', () => {
        const userId = new UserId('12345678')
        expect(userId.getValue()).toBe('12345678')
    })

    test('正常系 - 英字のみ', () => {
        const userId = new UserId('abcdefgh')
        expect(userId.getValue()).toBe('abcdefgh')
    })

    test('異常系 - user id が8桁より短い場合', () => {
        const wrongId = 'test123'
        expect(() => { new UserId(wrongId) }).toThrow('User idは8桁の英数字である必要があります。')
    })

    test('異常系 - user id が8桁より長い場合', () => {
        const wrongId = 'fap9bnf823'
        expect(() => { new UserId(wrongId) }).toThrow('User idは8桁の英数字である必要があります。')
    })

    test('異常系 - user id にハイフンが含まれる場合', () => {
        const wrongId = 'test-123'
        expect(() => { new UserId(wrongId) }).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - user id に記号が含まれる場合', () => {
        const wrongId = 'test@123'
        expect(() => { new UserId(wrongId) }).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

    test('異常系 - user id にスペースが含まれる場合', () => {
        const wrongId = 'test 123'
        expect(() => { new UserId(wrongId) }).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

})

suite('UserId.create factory method', () => {

    test('正常系 - ファクトリメソッドでUserIdを作成', () => {
        const userId = UserId.create('testid12')
        expect(userId.getValue()).toBe('testid12')
    })

})

suite('UserId.equals method', () => {

    test('正常系 - 同じ値のUserIdは等しい', () => {
        const userId1 = new UserId('birubiru')
        const userId2 = new UserId('birubiru')
        expect(userId1.equals(userId2)).toBe(true)
    })

    test('正常系 - 異なる値のUserIdは等しくない', () => {
        const userId1 = new UserId('birubiru')
        const userId2 = new UserId('testid12')
        expect(userId1.equals(userId2)).toBe(false)
    })

})
