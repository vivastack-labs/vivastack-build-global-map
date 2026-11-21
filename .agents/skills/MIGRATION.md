# Claude Code コマンドの Codex 移行

`.claude/commands/` の29コマンドを同名のスキルに移行した。元ディレクトリの
`README.md` は説明書なので、29コマンドの数には含めていない。Codex CLI では
`/skills` で一覧を表示し、`$plan-prd 予約通知を追加したい` のようにスキル名と入力を
同じプロンプトに書く。`$plan` と Codex のネイティブな `/plan` は別の入口。

| 用途 | Codex スキル |
| --- | --- |
| 要件・計画 | [plan-prd](plan-prd/SKILL.md)、[plan](plan/SKILL.md)、[feature-dev](feature-dev/SKILL.md) |
| PRP | [prp-prd](prp-prd/SKILL.md)、[prp-plan](prp-plan/SKILL.md)、[prp-implement](prp-implement/SKILL.md)、[prp-commit](prp-commit/SKILL.md)、[prp-pr](prp-pr/SKILL.md) |
| 実装・修正 | [build-fix](build-fix/SKILL.md)、[react-build](react-build/SKILL.md)、[react-test](react-test/SKILL.md)、[refactor-clean](refactor-clean/SKILL.md)、[gan-build](gan-build/SKILL.md) |
| レビュー | [code-review](code-review/SKILL.md)、[review-pr](review-pr/SKILL.md)、[orch-review](orch-review/SKILL.md)、[react-review](react-review/SKILL.md)、[santa-loop](santa-loop/SKILL.md)、[astra-review](astra-review/SKILL.md) |
| 検証・Git | [verify](verify/SKILL.md)、[checkpoint](checkpoint/SKILL.md)、[pr](pr/SKILL.md) |
| セッション | [save-session](save-session/SKILL.md)、[resume-session](resume-session/SKILL.md)、[sessions](sessions/SKILL.md) |
| 実行ループ | [loop-start](loop-start/SKILL.md)、[loop-status](loop-status/SKILL.md) |
| ドキュメント | [update-codemaps](update-codemaps/SKILL.md)、[update-docs](update-docs/SKILL.md) |

## 非互換項目

| Claude Code での機能 | Codex での扱い |
| --- | --- |
| `/<name>`、引数置換、`argument-hint` | `$<name>` に続くユーザー入力を、各 `SKILL.md` の引数説明に沿って解釈する。 |
| `Agent`、`Task`、`Skill`、Claude 専用のエージェント名 | 手順内に役割・チェック項目を記載した。関連スキルの指示はファイルを読む。権限とツールがある場合は Codex のサブエージェントに委譲できる。 |
| `Workflow(...)` と並列レビュー | `orch-review` は Codex 上で観点別レビューと反証を実行する。独立検証ができない指摘はブロッカーとして残す。Claude の JS ランタイムは不要。 |
| `model: opus`、Fable による修正、別モデルの合格判定 | 親 Codex のモデル設定を使用する。`astra-review` は既存の Codex CLI 用レビュー補助を呼ぶ。対象の外部送信は許可を得てから行う。 `santa-loop` で独立した二つの結果を揃えられない場合は判定未完了。 |
| PRD・計画・レビューの保存先 | `docs/prds/`、`docs/plans/`、`docs/PRPs/`、`docs/reviews/` を使う。明示された Claude 側の成果物は入力として読める。 |
| セッションファイルと別名 | 現在の worktree の `artifacts/codex/sessions/` に Markdown と別名を保存する。既存の Claude セッション履歴・別名は自動移行しない。明示パスの引継ぎメモは読める。ネイティブ会話の再開には Codex クライアントを使う。 |
| `ecc loop-status` の Claude transcript、`ScheduleWakeup`、未完了 Bash の検出 | `artifacts/codex/loops/` の明示的なスナップショットを状態源にする。`--json`、監視頻度・回数、滞留判定と終了コードを提供する。既存 transcript の自動解析、`--home`、`--transcript`、`--bash-timeout-seconds`、`--write-dir` は対象外。 |
| Git の stash、push、PR 作成、レビュー投稿 | チェックポイントはコミット参照と検証結果を保存する。stash の作成は行わない。公開やコミットは対象と範囲が承認されてから実行する。 |
| 旧 `verify` の入口と PRP の `prp-pr` | `verify` は検証手順を内包し、`prp-pr` は共通の `pr` 手順を参照する。 |

スキルの配置と起動方法は [OpenAI のスキル仕様](https://learn.chatgpt.com/docs/build-skills)
を参照。

## 検証結果

- Claude のコマンド名とスキル名の集合が一致し、29件すべてが skill-creator の検証を通過した。
- Codex CLI 0.170.0 の `skills/list` がリポジトリのルートと `docs/` から29件を検出した。
- ローカルの模擬モデルで29件を `codex exec` から個別に明示起動し、対応する `SKILL.md` の本文が
  モデル入力に含まれることを確認した。
- 一時 Git リポジトリでセッションの一覧・読み込み・別名、チェックポイントの記録・比較・整理、
  ループの監視と滞留時の終了コードを検証した。Astra は合成差分でドライランした。
- 実モデルを用いた CLI テストは、読み取り専用環境での初期化エラーにより未確認。
  実リポジトリの push、PR 投稿、外部レビュー送信は検証対象から除外した。
