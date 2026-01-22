// usecase はひとつのアクションであるべき
// 部屋予約に必要なのは、ユーザid,room id,startTime,endTime

import { Reservation } from "../domain/Reservation.js"
import { RoomId } from "../domain/RoomId.js"
import { UserId } from "../domain/UserId.js"

import type { IIdGenerator } from "./shared/IdGenerator.js"

class ReserveRoom {
    // 必要な情報を受け取る(constructor)
    userId : UserId
    roomId : RoomId
    startTime: Date
    endTime: Date
    idGenerator:IIdGenerator

    constructor(user_id:string,room_id:string,start_time:Date,end_time:Date,idGenerator:IIdGenerator){
        this.userId = new UserId(user_id)
        this.roomId = new RoomId(room_id)
        this.startTime = start_time
        this.endTime = end_time
        this.idGenerator = idGenerator
    }

    // check():void
    // 入力情報のチェック
    // -入力時間が正しいかチェック
    //  -過去の時間ではないか
    //  -durationが30分以上かどうか8時間以下か
    // -部屋が予約できるか確認
    //  -部屋の状態確認
    //  -入力期間と被る予約情報がないか確認

    // execute():Reservation|udnefined
    // 部屋情報の確保
    // checkする
    // reserve domain objectを作成
}

/* 
修正のポイント 3つ
コンストラクタとexecuteの役割分担

現状: コンストラクタでデータ（userId, timeなど）を受け取っています。これだと、リクエストが来るたびに new ReserveRoom(...) する必要があります。

推奨: コンストラクタは RepositoryやIdGeneratorなどの「依存性の注入（DI）」 だけに使います。データは execute() の引数で渡します。こうすると、UseCaseをシングルトンとして扱えたり、DIコンテナとの相性が良くなります。

バリデーションの責務（ドメインへの移動）

現状: check() メソッドで「期間が30分以上か」などをチェックしようとしています。

推奨: 「30分以上8時間以下」のようなルールは、ビジネスルールそのものなので、UseCaseではなく Reservation ドメインオブジェクトの中（コンストラクタやファクトリメソッド） に閉じ込めます。UseCaseはそれを利用するだけにします。

保存処理（Repository）の追加

現状: Reservation オブジェクトを作って終わっています。

推奨: DB等に保存するための IReservationRepository が必要です。
 */