# World Atlas Cloudflare Workers CI/CD 実装報告

## 概要

ブランチ `codex/cloudflare-workers-cicd` の計画コミットは `a1d8987`。`main` 宛ての PR で配信設定を検証し、`main` への push では同じコミットの `docs/html/` を `global-map` に直接配信する構成を実装した。サイトのビルドは不要。`/` へのリクエストは `_redirects` の内部書き換えで `world-atlas.html` を返す。

## 変更とタスクの結果

| タスク | ファイルと結果 |
| --- | --- |
| ルートの配信 | `docs/html/_redirects` にルートの内部書き換えを追加。元の `.html` URL も利用できる |
| Workers の設定 | `cloudflare.config.ts`、`package.json`、`package-lock.json`、`.gitignore` を更新。既存 Worker で確認した互換日 `2026-11-22` を採用し、`cf@1.0.0-rc.4` を固定した |
| PR 検証 | `.github/workflows/ci.yml` がページの存在、ルート設定、構文、Cloudflare dry-run を確認する。同じワークフローを本番側から呼び出す |
| 本番ワークフロー | `.github/workflows/deploy.yml` が `main` への push で起動する。検証が成功し、対象 SHA がまだ `main` の先端なら公開する。公開後は `scripts/smoke-site.sh` がステータスとファイル内容を照合する |
| 本番の状態確認 | 読み取り API で `workers.dev` 有効、プレビュー無効、バインディングなし、Workers Builds トリガー 0 件を確認した。確認時点のデプロイ元は Dashboard、配信バージョンは `f93af837-40a2-411b-a5da-995204d227fe` |
| 運用手順 | `README.md` に初回の Environment 設定、dry-run、公開後の疎通確認と復旧方法を追記した |

## 検証結果

- Node.js 24.22.3 で `npm ci` と `npm exec -- cf deploy ./docs/html --dry-run --no-provision` が成功した。CLI は `.ts` 設定のモジュール形式について警告を出す。既存 CommonJS フックと共存するため、ルートの `package.json` の `type` は省略した。
- `actionlint .github/workflows/ci.yml .github/workflows/deploy.yml`、`yamllint .github/workflows`、`node --check docs/html/assets/atlas.js`、`bash -n scripts/smoke-site.sh`、`shellcheck scripts/smoke-site.sh`、対象 Markdown の `markdownlint-cli2`、`git diff --check` が成功した。
- Cloudflare CLI の出力を Miniflare で配信し、その URL に対して `npm run smoke -- <URL>` が成功した。地図・案内ページ・代表アセット 12 パスでステータス 200 とファイル内容の一致を確認し、`/_redirects` と未定義パスは 404 を確認した。別のローカルサーバーで古い本文を HTTP 200 で返すと、疎通確認が失敗することも確認した。
- Chromium で地図を開き、日本の詳細 JSON が読み込まれることと、フッターから案内ページ 2 つを開いて地図に戻れることを確認した。
- 既存の Claude フックテストは 24 ファイル、Codex フックと知識ライブラリのテストは計 28 件が成功した。書き込み可能な一時ホームで実行した。

## 受け入れ条件

| 条件 | 状態 |
| --- | --- |
| PR で認証情報なしの検証が実行される | ワークフローの構文と同じ検証コマンドをローカルで確認。GitHub の PR 実行は未確認 |
| `main` の対象 SHA から `global-map` へ直接デプロイされる | checkout、検証、デプロイの依存と古い SHA のガードを実装。本番の実行は未確認 |
| 地図・案内・主要アセットと 404 が想定どおり配信される | Miniflare と Chromium で確認。本番での反映は未確認 |
| 公開後の疎通結果が Actions に残り、復旧手順を確認できる | `smoke` job と README を確認。Actions の実行結果は初回公開後に確認する |

## 残作業

GitHub API で `production` Environment が未作成であることを確認した。初回公開前に `main` 用の `production` Environment と Cloudflare の Secrets 2 件が必要。GitHub 上の PR と初回デプロイの受け入れ確認が残るため、計画は `docs/PRPs/plans/` に置いている。`sources/` の参照先ファイルの復元は別途扱う。
