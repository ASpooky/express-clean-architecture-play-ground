/**
 * ドメイン層のエラー基底クラス
 */
export class DomainError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'DomainError'

        // Error継承時のプロトタイプチェーンを正しく設定
        Object.setPrototypeOf(this, DomainError.prototype)
    }
}
