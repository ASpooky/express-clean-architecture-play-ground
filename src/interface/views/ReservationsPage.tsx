import { Layout } from "./Layout.js";
import type { ReservationViewData } from "../presenter/ReservationViewPresenter.js";
import type { UserViewData } from "../presenter/UserViewPresenter.js";
import type { RoomViewData } from "../presenter/RoomViewPresenter.js";

type Props = {
    reservations: ReservationViewData[];
    lookupUserId: string;
    users: UserViewData[];
    rooms: RoomViewData[];
};

export const ReservationsPage = ({ reservations, lookupUserId, users, rooms }: Props) => (
    <Layout currentPath="/reservations">
        <h2>予約管理</h2>

        <h3>予約を作成</h3>
        <form action="/reservations/create" method="POST">
            <select name="userId" required>
                <option value="">ユーザーを選択</option>
                {users.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}（{u.email}）</option>
                ))}
            </select>
            <select name="roomId" required>
                <option value="">会議室を選択</option>
                {rooms.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}（定員{r.capacity}名）</option>
                ))}
            </select>
            <label style="display:flex;flex-direction:column;font-size:12px">
                開始
                <input name="startTime" type="datetime-local" required />
            </label>
            <label style="display:flex;flex-direction:column;font-size:12px">
                終了
                <input name="endTime" type="datetime-local" required />
            </label>
            <button type="submit" class="btn" style="align-self:flex-end">予約</button>
        </form>

        <h3>ユーザーの予約一覧</h3>
        <form action="/reservations" method="GET">
            <input name="userId" placeholder="ユーザーID" value={lookupUserId} required style="width:300px" />
            <button type="submit" class="btn">検索</button>
        </form>

        {reservations.length > 0 && (
            <table style="margin-top:12px">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>会議室ID</th>
                        <th>開始</th>
                        <th>終了</th>
                        <th>時間(分)</th>
                        <th>ステータス</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((r) => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.roomId}</td>
                            <td>{r.startTime}</td>
                            <td>{r.endTime}</td>
                            <td>{r.durationMinutes}</td>
                            <td>{r.statusLabel}</td>
                            <td>
                                {r.canCancel && (
                                    <form action={`/reservations/${r.id}/cancel`} method="POST" style="margin:0">
                                        <button type="submit" class="btn btn-danger" style="padding:4px 10px">
                                            キャンセル
                                        </button>
                                    </form>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}

        <h3>予約時間を変更</h3>
        <form action="/reservations/change-time" method="POST">
            <input name="id" placeholder="予約ID" required style="width:300px" />
            <label style="display:flex;flex-direction:column;font-size:12px">
                新しい開始
                <input name="startTime" type="datetime-local" required />
            </label>
            <label style="display:flex;flex-direction:column;font-size:12px">
                新しい終了
                <input name="endTime" type="datetime-local" required />
            </label>
            <button type="submit" class="btn" style="align-self:flex-end">変更</button>
        </form>
    </Layout>
);
