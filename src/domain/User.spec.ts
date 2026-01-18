import { test,suite,expect } from 'vitest'
import { User } from './User.js'
import { UserId } from './UserId.js'
import { ValidationError } from './errors/index.js'

suite('User name validation',()=>{

    const id = new UserId('user123')
    const email = 'test@test.com'

    test('正常系 - 1文字の名前',()=>{
        const name = 'a'
        const user = new User(id,name,email)
        expect(user.name).toBe('a')
    })

    test('正常系 - 16文字の名前',()=>{
        const name = '1234567890123456'
        const user = new User(id,name,email)
        expect(user.name).toBe('1234567890123456')
    })

    test('名前が空文字列の場合',()=>{
        const name = ''
        expect(()=>{new User(id,name,email)}).toThrow(ValidationError)
    })

    test('名前が16文字を超える場合',()=>{
        const name = '12345678901234567'
        expect(()=>{new User(id,name,email)}).toThrow(ValidationError)
    })

})

suite('User email validation',()=>{

    const id = new UserId('user123')
    const name = 'spbg'

    test('正常系',()=>{
        const email = 'test@example.com'
        const user = new User(id,name,email)
        expect(user.email).toBe('test@example.com')
    })

    test('emailに@が含まれない場合',()=>{
        const email = 'testexample.com'
        expect(()=>{new User(id,name,email)}).toThrow(ValidationError)
    })

})

suite('User.create static method',()=>{

    const name = 'spbg'
    const email = 'test@test.com'

    test('id文字列を使ってユーザーを作成',()=>{
        const user = User.create('user-test-id-123', name, email)
        expect(user.id.getValue()).toBe('user-test-id-123')
        expect(user.name).toBe('spbg')
        expect(user.email).toBe('test@test.com')
    })

    test('UUID形式のidでユーザーを作成',()=>{
        const uuid = '550e8400-e29b-41d4-a716-446655440000'
        const user = User.create(uuid, name, email)
        expect(user.id.getValue()).toBe(uuid)
    })

})

suite('User.changeName method',()=>{

    const id = new UserId('user123')
    const email = 'test@test.com'

    test('正常系 - 名前を変更',()=>{
        const user = new User(id,'oldName',email)
        const updatedUser = user.changeName('newName')
        expect(updatedUser.name).toBe('newName')
        expect(updatedUser.id).toBe(id)
        expect(updatedUser.email).toBe(email)
    })

})

suite('User.changeEmail method',()=>{

    const id = new UserId('user123')
    const name = 'spbg'

    test('正常系 - メールアドレスを変更',()=>{
        const user = new User(id,name,'old@test.com')
        const updatedUser = user.changeEmail('new@test.com')
        expect(updatedUser.email).toBe('new@test.com')
        expect(updatedUser.id).toBe(id)
        expect(updatedUser.name).toBe(name)
    })

})

suite('User.equals method',()=>{

    test('正常系 - 同じ値のUserは等しい',()=>{
        const id = new UserId('user123')
        const user1 = new User(id,'spbg','test@test.com')
        const user2 = new User(id,'spbg','test@test.com')
        expect(user1.equals(user2)).toBe(true)
    })

    test('正常系 - 異なる値のUserは等しくない',()=>{
        const id1 = new UserId('user123')
        const id2 = new UserId('user456')
        const user1 = new User(id1,'spbg','test@test.com')
        const user2 = new User(id2,'spbg','test@test.com')
        expect(user1.equals(user2)).toBe(false)
    })

})
