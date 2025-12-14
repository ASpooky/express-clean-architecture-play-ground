# Express Clean Architecture Playground 🏗️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node->=18.0.0-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)

**Express Clean Architecture Playground** は、Node.js (Express) と TypeScript を使用して、「クリーンアーキテクチャ (Clean Architecture)」の概念を実践的に理解・実験するためのプロジェクトテンプレートです。

このリポジトリは、フレームワークやDBへの依存を排除し、ビジネスロジックを中心とした堅牢でテスト可能なアプリケーション構造を学ぶことを目的としています。

## 🎯 目的 (Goals)

- **関心の分離 (Separation of Concerns):** ビジネスルール、インターフェース、インフラストラクチャを明確に分離する。
- **依存性のルール (Dependency Rule):** 依存関係は常に「外側」から「内側」へ向かうことをコードで表現する。
- **テスタビリティ (Testability):** ビジネスロジックをUI、データベース、ウェブサーバーなしでテスト可能にする。
- **柔軟性 (Flexibility):** DBや外部APIなどの詳細（Details）を容易に交換可能にする。

## 🛠️ 技術スタック (Tech Stack)

- **Runtime:** Node.js
- **Language:** TypeScript
- **Web Framework:** Express.js
- **DI Container:** InversifyJS (または Tsyringe / Manual DI)
- **Linting/Formatting:** ESLint, Prettier
