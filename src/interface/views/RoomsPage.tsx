import { Layout } from "./Layout.js";
import type { RoomViewData } from "../presenter/RoomViewPresenter.js";

type Props = { rooms: RoomViewData[] };

export const RoomsPage = ({ rooms }: Props) => (
    <Layout currentPath="/rooms">
        <h2>会議室一覧</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名前</th>
                    <th>収容人数</th>
                    <th>ステータス</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.name}</td>
                        <td>{room.capacity}</td>
                        <td>{room.statusLabel}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h3>会議室を追加</h3>
        <form action="/rooms/create" method="POST">
            <input name="name" placeholder="名前" required />
            <input name="capacity" type="number" placeholder="収容人数" required style="width:120px" />
            <button type="submit" class="btn">追加</button>
        </form>
    </Layout>
);
