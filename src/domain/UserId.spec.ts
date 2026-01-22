import { test, suite, expect } from 'vitest'
import { UserId } from './UserId.js'
import { ValidationError } from './errors/index.js'

suite('UserId validation', () => {

    test('正常系 - 任意の文字列でUserIdを作成', () => {
        const userId = new UserId('user123')
        expect(userId.getValue()).toBe('user123')
        expect(userId.toString()).toBe('user123')
    })

    test('正常系 - UUID形式', () => {
        const userId = new UserId('550e8400-e29b-41d4-a716-446655440000')
        expect(userId.getValue()).toBe('550e8400-e29b-41d4-a716-446655440000')
    })

    test('正常系 - 記号を含む文字列', () => {
        const userId = new UserId('user_id@test#123')
        expect(userId.getValue()).toBe('user_id@test#123')
    })

    test('正常系 - 日本語を含む文字列', () => {
        const userId = new UserId('ユーザー123')
        expect(userId.getValue()).toBe('ユーザー123')
    })

    test('異常系 - 空文字列の場合', () => {
        expect(() => { new UserId('') }).toThrow(ValidationError)
    })

})

suite('UserId.create factory method', () => {

    test('正常系 - ファクトリメソッドでUserIdを作成', () => {
        const userId = UserId.create('test-user-id')
        expect(userId.getValue()).toBe('test-user-id')
    })

})

suite('UserId.equals method', () => {

    test('正常系 - 同じ値のUserIdは等しい', () => {
        const userId1 = new UserId('user123')
        const userId2 = new UserId('user123')
        expect(userId1.equals(userId2)).toBe(true)
    })

    test('正常系 - 異なる値のUserIdは等しくない', () => {
        const userId1 = new UserId('user123')
        const userId2 = new UserId('user456')
        expect(userId1.equals(userId2)).toBe(false)
    })

})
