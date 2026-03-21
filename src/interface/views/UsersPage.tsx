import { Layout } from "./Layout.js";

export const UsersPage = () => (
    <Layout currentPath="/users">
        <h2>ユーザー管理</h2>

        <h3>ユーザーを追加</h3>
        <form action="/users/create" method="POST">
            <input name="name" placeholder="名前" required />
            <input name="email" type="email" placeholder="メールアドレス" required style="width:220px" />
            <button type="submit" class="btn">追加</button>
        </form>

        <h3>ユーザーを削除</h3>
        <form action="/users/delete" method="POST">
            <input name="id" placeholder="ユーザーID" required style="width:300px" />
            <button type="submit" class="btn btn-danger">削除</button>
        </form>
    </Layout>
);
