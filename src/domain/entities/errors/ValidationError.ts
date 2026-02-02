import { DomainError } from "./DomainError.js"

/**
 * バリデーションエラー
 * エンティティやValue Objectのバリデーション失敗時に使用
 */
export class ValidationError extends DomainError {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}
