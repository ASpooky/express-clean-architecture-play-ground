import { DomainError } from "./DomainError.js"

/**
 * ビジネスルール違反エラー
 * ドメインのビジネスルールに違反した操作を試みた場合に使用
 * 例: キャンセル不可な予約のキャンセル、終了時刻が開始時刻より前など
 */
export class BusinessRuleViolationError extends DomainError {
    constructor(message: string) {
        super(message)
        this.name = 'BusinessRuleViolationError'

        Object.setPrototypeOf(this, BusinessRuleViolationError.prototype)
    }
}
