import { test,suite,expect } from 'vitest'
import { User } from './User.js'

suite('User id validation',()=>{

    const id = 'birubiru'
    const name = 'spbg'
    const email = 'test@test.com'

    test('正常系',()=>{
        const user = new User(id,name,email)
        expect(user.id).toBe('birubiru')
        expect(user.name).toBe('spbg')
        expect(user.email).toBe('test@test.com')
    })

    test('user id が8桁以外の場合',()=>{
        const wrongId = 'fap9bnf823'
        expect(()=>{new User(wrongId,name,email)}).toThrow()
    })

    test('user id に英数字以外が含まれる場合',()=>{
        const wrongId = 'test-123'
        expect(()=>{new User(wrongId,name,email)}).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

    test('user id に記号が含まれる場合',()=>{
        const wrongId = 'test@123'
        expect(()=>{new User(wrongId,name,email)}).toThrow('User idは英数字以外の文字が含まれてはいけません。')
    })

})

suite('User name validation',()=>{

    const id = 'birubiru'
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
        expect(()=>{new User(id,name,email)}).toThrow('User nameは1文字以上,16文字以下である必要があります。')
    })

    test('名前が16文字を超える場合',()=>{
        const name = '12345678901234567'
        expect(()=>{new User(id,name,email)}).toThrow('User nameは1文字以上,16文字以下である必要があります。')
    })

})

suite('User email validation',()=>{

    const id = 'birubiru'
    const name = 'spbg'

    test('正常系',()=>{
        const email = 'test@example.com'
        const user = new User(id,name,email)
        expect(user.email).toBe('test@example.com')
    })

    test('emailに@が含まれない場合',()=>{
        const email = 'testexample.com'
        expect(()=>{new User(id,name,email)}).toThrow('メールアドレスの形式が不正です。')
    })

})

suite('User.create static method',()=>{

    const name = 'spbg'
    const email = 'test@test.com'

    test('IdGeneratorを使ってユーザーを作成',()=>{
        const mockIdGenerator = {
            generate: ()=>'testid12'
        }
        const user = User.create(name,email,mockIdGenerator)
        expect(user.id).toBe('testid12')
        expect(user.name).toBe('spbg')
        expect(user.email).toBe('test@test.com')
    })

})