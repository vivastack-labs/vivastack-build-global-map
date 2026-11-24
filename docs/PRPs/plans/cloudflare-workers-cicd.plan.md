# World Atlas の Cloudflare Workers CI/CD 実装計画

## 概要

World Atlas のメンテナーとして、PR で公開ファイルを検証し、`main` に入った変更を [global-map.vivastack-dev.workers.dev](https://global-map.vivastack-dev.workers.dev/) に自動で反映したい。GitHub Actions で `docs/html/` を検証して Cloudflare Workers Static Assets として直接デプロイし、公開後に疎通確認を行う。

2026-11-24 に `curl` で確認した時点では、本番の `/`、`/assets/world.json`、`/assets/admin/JPN.json` は HTTP 200、`/world-atlas.html`、`/about.html`、`/privacy.html` は HTTP 404。初回デプロイは既存の `global-map` Worker を更新するため、先に現在の設定とデプロイ済みバージョンを確認する。

## 必読資料

| ファイル | 確認する内容 |
| --- | --- |
| `AGENTS.md`、`.gitignore`、`.yamllint` | 既存の検証コマンド、生成物の除外、ワークフローの YAML 規約 |
| `docs/html/world-atlas.html`、`about.html`、`privacy.html` | 入口、案内ページ間のリンク、相対パスの CSS・JS・favicon |
| `docs/html/assets/atlas.js` の `init()` と詳細データ読み込み | `world.json`、国別 JSON、国旗、マスコットの遅延読み込み |
| `../vivastack-build-maps/.github/workflows/ci.yml`、`deploy.yml` | PR 検証、成果物受け渡し、`production` Environment、公開後の疎通確認 |
| `../vivastack-build-maps/wrangler.jsonc` | `jp-map` の静的アセットのみの Worker と `workers.dev` の設定 |

参照した `maps` のコミットは `59ae56a`。本リポジトリには GitHub Actions ワークフロー、ルートの npm パッケージ、Cloudflare 設定がまだない。

## 外部参照

- [Cloudflare CLI の導入と認証](https://developers.cloudflare.com/cf/get-started/) と [静的ディレクトリのデプロイと dry-run](https://developers.cloudflare.com/cf/projects/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)、[`_redirects` による内部書き換え](https://developers.cloudflare.com/workers/static-assets/redirects/)、[HTML の URL 解決](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)、[アセット上限](https://developers.cloudflare.com/workers/platform/limits/)
- [workers.dev の URL と有効化](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/)、[既存バージョンへのロールバック](https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/)
- [GitHub Actions の Environment](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments) と [同時実行の制御](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency)

## 踏襲するパターン

- `maps` の検証・デプロイ・疎通確認の job 構成を使う。各 job は同じコミット SHA を checkout し、`docs/html/` を検証、配信、照合する。Cloudflare の認証情報は `production` Environment のデプロイステップにだけ渡す。
- Action は確認済みのフルコミット SHA に固定する。`contents: read`、`persist-credentials: false`、job のタイムアウト、明示的な `bash` を設定する。本番デプロイ job では PR 側で作られたキャッシュを復元しない。
- 本サイトは GitHub Release 運用がまだ始まっていないため、`main` の push を本番公開契機とする。`maps` の Release 起点と PR プレビューの運用は今回の対象外とする。
- Cloudflare CLI はこのリポジトリで新規導入となるため `cf` を使う。アプリ用のビルドツールや Worker の JavaScript エントリーポイントを必要としない静的配信とする。

## 変更ファイル

| パス | 内容 |
| --- | --- |
| `package.json`、`package-lock.json` | `cf` のバージョンを固定し、疎通確認の npm スクリプトを定義 |
| `cloudflare.config.ts` | `global-map` の名前、互換日、`workers.dev`、HTML ルーティングを指定 |
| `docs/html/_redirects` | `/` を `/world-atlas.html` に内部書き換え |
| `scripts/smoke-site.sh` | URL を受け取り、HTTP ステータスと `docs/html/` の配信内容を確認 |
| `.github/workflows/ci.yml` | `main` 宛て PR の静的サイト検証 |
| `.github/workflows/deploy.yml` | `main` push で検証、本番デプロイ、疎通確認 |
| `.gitignore`、`README.md` | `.cloudflare/` の生成物を除外し、検証、Environment の初期設定、復旧手順を記載 |

## 対象外

- PR プレビュー、カスタムドメイン、DNS、地図の UI やデータ形式の変更。
- サイト用ビルド、`dist/` の生成、配信用 Artifact のアップロード・ダウンロード。
- コードから参照される既存の `sources/` コンテンツの復元。`git ls-files docs/html/sources` に該当がないため、初回の疎通確認では既知の欠損として扱う。

## 実装タスク

1. **ルートに地図を割り当てる。** `docs/html/_redirects` に `/ /world-atlas.html 200` を 1 行追加する。内部書き換えで `/` の URL のまま地図を表示し、既存の HTML、JSON、画像の配置を維持する。`curl` で `/` がリダイレクトの追跡なしで 200 を返し、レスポンスが `docs/html/world-atlas.html` と一致することを確認する。
2. **Workers の設定を固定する。** `cf/config` の `defineConfig` を `cloudflare.config.ts` で使い、`worker.name` を `global-map`、`worker.workersDev` を `true`、`worker.previewUrls` を `false` に設定する。`worker.assets.htmlHandling` を `none` にして既存の `.html` URL を配信し、`notFoundHandling` を `none` にして未定義のパスは 404 にする。`cf@1.0.0-rc.4` と Node.js 24.22 以上の 24 系を基準に固定し、`npm exec -- cf deploy ./docs/html --dry-run --no-provision` で検証する。互換日は動作確認に使った `2026-11-19` を初期値とする。
3. **PR の CI を追加する。** `.github/workflows/ci.yml` の `pull_request` を `main` 向けに設定する。`npm ci` で CLI を準備し、地図と案内ページの存在、`node --check docs/html/assets/atlas.js`、Cloudflare dry-run を実行する。`docs/html/` が公開ソースなので、`docs/**` を一括で除外しない。`actionlint` と PR の `ci` 実行結果で確認する。
4. **本番デプロイの job を組む。** `.github/workflows/deploy.yml` を `push.branches: [main]` で起動し、ワークフロー全体を `global-map-production` グループで直列化する。進行中の実行はキャンセルしない。`check` job は PR と同じ検証を push の SHA で行う。`deploy` job は `needs: check` と `environment: production` を設定し、同じ SHA を checkout して `npm ci` で CLI を準備する。`npm exec -- cf deploy ./docs/html --no-provision` で、checkout した公開ディレクトリを直接デプロイする。`smoke` job は `needs: deploy` とし、同じ SHA を checkout して `docs/html/` と公開レスポンスを比較する。Actions の job 依存関係と checkout 先の一致を確認する。
5. **本番接続を確認する。** GitHub の `production` Environment は `main` に限定し、`CLOUDFLARE_ACCOUNT_ID` と `CLOUDFLARE_API_TOKEN` を登録する。トークンは対象アカウントの Workers 編集用とし、値は Environment の Secrets に保存する。Cloudflare 側で `vivastack-dev` のアカウント、既存 Worker `global-map`、`workers.dev` ルート、現在のデプロイバージョン、Git 連携や別のデプロイ元の有無を確認する。既存設定との差分やリモート変更の競合を調査してから初回デプロイを実施し、Actions の結果と指定 URL を確認する。
6. **運用手順を記載する。** `README.md` に検証コマンド、`main` push 時の公開条件、Secrets の名前、公開後に失敗した場合の切り分けを記載する。必要に応じて Cloudflare の Deployments から保存済みの直前バージョンに戻し、疎通確認を再実行する。

## テスト戦略

| 検証 | 判定 |
| --- | --- |
| 本番ルート | `/`、`/world-atlas.html`、`/about.html`、`/privacy.html` は直接 200 を返し、`docs/html/` の対応 HTML と一致する |
| 本番アセット | atlas CSS・JS、favicon、D3、`assets/world.json`、`assets/admin/JPN.json`、`assets/flags/JP.svg`、日本語名のマスコット画像を取得でき、代表ファイルの内容が `docs/html/` と一致する |
| 非公開パス | `/__global_map_missing_check__` と `/_redirects` が 404 を返す |
| ブラウザ確認 | 地図が表示され、日本を選ぶと詳細データが読み込まれる。フッターから案内 2 ページに遷移し、地図に戻れる |

計画更新時に一時ディレクトリで `cf@1.0.0-rc.4` と Node.js 26.13.1 を使い、`docs/html/` を直接指定した dry-run を認証なしで実行した。Miniflare では `/` がリダイレクトなしで `world-atlas.html` を返すことを確認した。

疎通確認には `curl` を使う。接続・リクエストのタイムアウトを設定し、一時的な反映待ちには短い再試行を設ける。リダイレクトを追跡せずにステータスを検証し、HTML と代表アセットを `cmp` で比較する。スクリプトには `workers.dev` 向けに識別可能な User-Agent を設定する。

## 検証コマンド

実装後、リポジトリルートで実行する。

```bash
npm ci
test -s docs/html/world-atlas.html
test -s docs/html/about.html
test -s docs/html/privacy.html
node --check docs/html/assets/atlas.js
npm exec -- cf deploy ./docs/html --dry-run --no-provision
actionlint .github/workflows/ci.yml .github/workflows/deploy.yml
yamllint .github/workflows
markdownlint-cli2 docs/PRPs/plans/cloudflare-workers-cicd.plan.md
git diff --check
```

本番デプロイ後の確認コマンド。

```bash
npm run smoke -- https://global-map.vivastack-dev.workers.dev/
```

## 受け入れ条件

- `main` 宛て PR は Cloudflare の認証情報なしで `docs/html/` と配信設定を検証できる。検証エラーは CI の失敗として報告される。
- `main` の push で、その SHA の `docs/html/` が `global-map` へ直接デプロイされる。検証に失敗した push や PR からは本番が更新されない。
- 指定 URL のルートで地図が開き、案内 2 ページと主要アセットが配信される。存在しない URL は 404 を返す。
- 公開後の疎通確認が GitHub Actions の結果に残り、初回公開と復旧の手順を README から再現できる。

## チェックリスト

- [ ] `docs/html/` を指定した Cloudflare dry-run が手元で成功する。
- [ ] PR で `ci` が成功する。
- [ ] 既存 Worker の設定と直前のバージョンを確認し、`production` Environment を設定する。
- [ ] `main` へのマージ後に `check`、`deploy`、`smoke` が成功し、指定 URL でブラウザ確認を行う。

## リスク

- **既存 Worker の更新**。本番 URL が稼働中のため、初回公開前にリモートの Worker 設定、配信元、既存のバインディングやルートを確認する。競合を強制上書きする `--force` は付けない。
- **ルートやアセットの欠損**。`_redirects` の設定と非 ASCII のパスを疎通確認に含める。調査時点の追跡済みファイルは 520 件、最大は `mascots/徳島県.png` の 3,238,398 バイトで、確認した Workers Free の 20,000 件、単体 25 MiB の範囲内にある。
- **本番の実行順**。ワークフロー単位で直列化する。`deploy` job はデプロイ直前に、読み取り権限の `github.token` で GitHub API の `repos/{owner}/{repo}/git/ref/heads/main` を取得して対象 SHA と照合する。古い実行は公開をスキップし、公開した場合のみ job output を設定して `smoke` を実行する。旧バージョンへの切り替えには Cloudflare のロールバックを使う。
- **CLI のリリース候補版**。`cf` の版を lockfile で固定する。更新は PR の dry-run で確認し、本番で自動的に別の版を取得しない。
