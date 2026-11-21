# Claude Code から Codex CLI へのエージェント移行

`.claude/agents/` 以下の Markdown を再帰的に調べ、frontmatter を持つ
24件を同名の Codex ロールとして登録した。`README.md` は一覧と運用手順の
参照に使った。`.claude/` と既存の Codex フック、スキル、親セッション設定は変更していない。

## 起動方法

信頼済みのリポジトリで Codex CLI を開き、使うロールと担当範囲を
指定する。たとえば「`code-explorer` サブエージェントを1件起動し、
`.codex/hooks/run.js` のイベント処理を追って、主要なパスと依存先を返して」。
起動後のスレッドは `/subagents` で確認できる。
[Codex サブエージェント](https://learn.chatgpt.com/docs/agent-configuration/subagents)

親セッションは、独立した調査や別視点のレビューが必要なときに担当ロールを
選ぶ。委譲時には対象ファイル、入力、期待する返り値を渡す。既存の同時起動上限
2件を使い、同じ調査を複数のロールに依頼しない。必要な入力を依頼文だけで
渡せる場合は、親の会話履歴を引き継がない起動を選ぶ。子から次のロールが必要に
なった場合は親に返す。GAN の計画、実装、評価は親が順番と反復上限を管理し、
PR レビューでは実際の差分に必要な観点だけを選ぶ。

## 移行したロール

表の「閲覧」は Claude の `Read`、`Grep`、`Glob`、
「診断」は追加の `Bash`、「編集」は `Write` と `Edit` を指す。
`gan-planner` の書き込みは `Write` のみで、`tdd-guide` に `Glob` はなかった。
各 Codex ファイル名は `.codex/agents/<ロール>.toml`。

| ロール | Claude モデル・ツール | Codex モデル | 推論 | 起動条件と成果物 |
| --- | --- | --- | --- | --- |
| `architect` | opus・閲覧 | `gpt-6.2-astra` | high | 大きな設計判断。トレードオフ、設計案、ADR |
| `build-error-resolver` | sonnet・閲覧、診断、編集 | `gpt-6.2-sol` | medium | ビルド・型エラー。最小差分、ビルドと型検査結果 |
| `code-architect` | sonnet・閲覧、診断 | `gpt-6.2-sol` | high | 機能設計。対象ファイル、境界、データフロー、実装順 |
| `code-explorer` | sonnet・閲覧 | `gpt-6-luna` | high | 変更前の調査。入口、実行経路、レイヤー、依存先 |
| `code-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | high | 実装後の総合レビュー。確信度80%超の指摘、重大度と判定 |
| `code-simplifier` | sonnet・閲覧、診断、編集 | `gpt-6.2-sol` | medium | 最近の変更を整理。振る舞いを維持した差分と検証結果 |
| `comment-analyzer` | haiku・閲覧 | `gpt-6-luna` | medium | コメントの精査。誤り、情報の欠落、陳腐化リスク |
| `e2e-runner` | sonnet・閲覧、診断、編集 | `gpt-6.2-sol` | medium | E2E テストの作成・実行。失敗証拠、フレーク、HTML・JUnit レポート |
| `gan-evaluator` | sonnet・閲覧、診断、Write、Playwright MCP | `gpt-6.2-sol` | high | 各反復を採点。評価モード、証拠、判定、反復ごとのフィードバック |
| `gan-generator` | sonnet・閲覧、診断、編集 | `gpt-6.2-sol` | high | GAN の割り当て反復。実装、確認結果、`generator-state.md` |
| `gan-planner` | sonnet・閲覧、Write | `gpt-6.2-sol` | high | GAN の初期計画。仕様、スプリント、評価ルーブリック |
| `java-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | high | Java 差分。Spring Boot／Quarkus を判別し、データアクセスや並行性をレビュー |
| `planner` | opus・閲覧 | `gpt-6.2-astra` | high | 複雑な機能・リファクタリング。順序、依存、リスク、テスト計画 |
| `pr-test-analyzer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | medium | PR のテスト。変更した挙動、境界条件、未検証経路 |
| `python-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | medium | Python 差分。型、慣用表現、セキュリティ、承認条件 |
| `react-build-resolver` | sonnet・閲覧、診断、編集 | `gpt-6.2-sol` | high | React ビルド失敗。バンドラ、JSX／TSX、hydration、サーバー境界の診断と修正 |
| `react-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | high | React 差分。Hooks、描画、境界、アクセシビリティの指摘と判定 |
| `refactor-cleaner` | sonnet・閲覧、診断、編集 | `gpt-6.2-sol` | medium | 未使用コードや依存。確認済みの削除、前後の検証と復元手順 |
| `rust-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | high | Rust 差分。所有権、ライフタイム、unsafe、並行性、承認条件 |
| `security-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-astra` | high | 認証、入力、境界や機密データの防御的レビュー。根拠、影響、修正案 |
| `silent-failure-hunter` | sonnet・閲覧、診断 | `gpt-6.2-sol` | medium | エラー経路。握りつぶし、不安全なフォールバック、伝播漏れ |
| `tdd-guide` | sonnet・Read、Grep、診断、編集 | `gpt-6.2-sol` | high | 機能・バグ修正・整理。RED → GREEN → 改善と80%以上のカバレッジ |
| `type-design-analyzer` | sonnet・閲覧 | `gpt-6.2-sol` | medium | 型の設計。カプセル化、不変条件の表現と強制 |
| `typescript-reviewer` | sonnet・閲覧、診断 | `gpt-6.2-sol` | high | TS／JS 差分。型、非同期処理、ランタイムの安全性、承認条件 |

探索とコメント分析には Luna、通常の診断・実装・言語別レビューには Sol、
全体設計・複雑な計画・セキュリティレビューには Astra を選んだ。
短い `description` で選択条件を示し、詳細なチェックリストと出力形式は
選ばれたロールの `developer_instructions` に置いた。計画の長い作例を省略し、
ビルド修復はプロジェクトの固定済みツールと限定した差分を使うよう整理した。

## 設定の対応と代替手段

| Claude の設定・呼び出し | Codex での対応 |
| --- | --- |
| `name`、`description`、Markdown 本文 | 同名のロールを `[agents.<name>]` に登録し、`config_file` で TOML を参照。ファイルに `name`、`description`、`developer_instructions` を定義 |
| `model` | ロール別に `model` と `model_reasoning_effort` を指定。親と組み込みロールの既定モデルは既存設定に従う |
| `tools`、`disallowedTools` | 閲覧はシェルのファイル読み取りと `rg`、編集は Codex の編集ツール、診断は既存チェックを利用。`disallowedTools` の指定は0件。Claude の組み込みツール許可リストと同じ制限は組めないため、各ロールの指示で行為を限定 |
| `permissionMode` | 元定義に指定なし。子は親の承認・サンドボックスを継承。閲覧専用を強制したい調査・レビューは親を `codex --sandbox read-only --ask-for-approval never` で起動 |
| `skills` | frontmatter での指定は0件。本文の依存を確認し、近い Codex スキルを必要時に参照。言語・フレームワーク固有の補足は既存の `.claude/skills/` を資料として参照 |
| `hooks` | ロール固有の定義は0件。既存プロジェクトの `.codex/hooks.json` に `SubagentStart` と `SubagentStop` があり、フックを信頼したセッションで利用可能 |
| `color` | GAN の3ロールに指定あり。元の色に対応する設定がないため、ロール名と CLI のスレッド表示で識別 |
| `Agent(subagent_type=...)`、Claude の自動委譲ルール | Codex CLI で同名のサブエージェントを明示指定。既存の Codex スキルが委譲を求める場合も、担当ロールを指定できる |

[Codex カスタムエージェントと権限](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents)、
[Codex 設定リファレンス](https://learn.chatgpt.com/docs/config-file/config-reference)、
[Codex フック](https://learn.chatgpt.com/docs/hooks)

### スキルと外部ツール

- 計画・探索・設計は `plan` と `feature-dev`、総合レビューは
  `code-review`、PR の専門レビューと簡略化は `review-pr` の該当観点を使う。
- 修正・テストでは `build-fix`、`react-build`、`react-review`、
  `react-test`、`refactor-clean` を作業に応じて使う。
  GAN の3ロールは `gan-build` の担当フェーズだけを参照する。
- E2E は対象プロジェクトで利用できる Agent Browser または Playwright を使う。
  CI への送信に必要な成果物のパスは親へ返す。
- GAN のライブ評価は親に構成された Playwright MCP、または対象プロジェクトの
  Playwright に依存する。既存プロジェクトには Playwright MCP の登録がないため、
  必要なら親側で設定する。ライブ評価ができない場合は、親と評価モードを
  確認してから `screenshot` または `code-only` の証拠で採点する。
- 読み取り用ロールによるテストや診断が親の権限で実行できない場合は、その
  コマンドと未確認項目を返す。編集ロールも親のサンドボックスと承認設定に従う。

## 変更ファイル

- [`.codex/config.toml`](../.codex/config.toml) に24件のロール登録を追加。
- [`.codex/agents/`](../.codex/agents/) に上表の全ロールの TOML 24件を追加。
- [`docs/codex-agent-migration.md`](codex-agent-migration.md) に移行手順と検証結果を記載。

## 検証

- Claude の名前と Codex の登録名・ファイル名を24件照合し、各 `config_file`
  の参照先を確認した。既存のプロジェクト設定値が一致することも比較した。
- 現行と CLI 0.170.0 の公式設定スキーマで検証した。CLI のモデルカタログで
  Astra、Sol、Luna と、各ロールの推論強度の組み合わせを確認した。
  [現行設定スキーマ](https://developers.openai.com/codex/config-schema.json)、
  [0.170.0 設定スキーマ](https://github.com/openai/codex/blob/rust-v0.170.0/codex-rs/core/config.schema.json)
- Codex CLI 0.170.0 を `--strict-config` で実行し、ローカルの模擬モデルが
  発行した起動要求で24ロールすべてを起動した。子スレッドのモデルリクエストで
  モデル、推論強度、指示本文が定義と一致した。
- 実モデルでは `planner`、`code-reviewer`、`comment-analyzer` の起動と
  子スレッドへのモデル・推論強度の反映を確認した。この検証環境ではソケット
  ディレクトリの権限により子のシェルが起動できず、ファイルを開く試行が失敗した。
  検証用のコードを依頼文に渡して再試行したところ、`comment-analyzer` は
  リトライ回数とコメントの不一致を検出した。
- `node --test .codex/hooks/run.test.js` は17件すべて通過した。
  このレポートの Markdown lint と `git diff --check` も通過した。
  ブラウザを使う E2E と GAN の評価は、対象アプリを用いた検証が残っている。
