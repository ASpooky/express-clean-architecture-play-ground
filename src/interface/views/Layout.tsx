import type { ComponentChildren } from "preact";

type Props = {
    currentPath: string;
    children: ComponentChildren;
};

export const Layout = ({ currentPath, children }: Props) => (
    <html lang="ja">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>会議室予約システム</title>
            <style>{css}</style>
        </head>
        <body>
            <div class="container">
                <h1>会議室予約システム</h1>
                <nav>
                    <a href="/rooms" class={currentPath === "/rooms" ? "active" : ""}>会議室</a>
                    <a href="/reservations" class={currentPath === "/reservations" ? "active" : ""}>予約</a>
                    <a href="/users" class={currentPath === "/users" ? "active" : ""}>ユーザー</a>
                </nav>
                {children}
            </div>
        </body>
    </html>
);

const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f9fafb; color: #111; }
.container { max-width: 900px; margin: 0 auto; padding: 24px; }
nav { display: flex; gap: 8px; margin-bottom: 24px; }
nav a { padding: 8px 16px; background: #e5e7eb; color: #111; border-radius: 6px; text-decoration: none; }
nav a.active { background: #2563eb; color: #fff; }
h1 { margin-bottom: 24px; }
h2 { margin-bottom: 16px; }
h3 { margin: 20px 0 10px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
th, td { padding: 8px; border: 1px solid #e5e7eb; text-align: left; }
thead tr { background: #f3f4f6; }
form { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; }
input { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 4px; }
.btn { padding: 6px 14px; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
.btn-danger { background: #dc2626; }
.error { color: #dc2626; margin-bottom: 12px; }
`;
