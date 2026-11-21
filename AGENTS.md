# AGENTS.md

Claude Code と Codex が共有する指示。Claude Code 固有の内容は CLAUDE.md に書く。

## このリポジトリ

- Claude Code（と Codex）で開発するための環境の雛形。アプリのソースはなく、`.claude/`・`.codex/` の設定・フック・agent・skill・command・rules そのものが成果物。
- agent・skill・command・rules の多くは ECC からのコピー。ECC との対応と、コピー後に書き換えた箇所は `docs/ecc/check-report.md` にまとめてある。

## コマンド

```bash
cd .claude/hooks && npm test                   # フックの全テスト（tests/ 以下の *.test.js を 1 ファイルずつ node で実行）
cd .claude/hooks && node tests/<name>.test.js  # 1 ファイルだけ
cd .claude/hooks && npm run coverage           # c8（先に npm install）。行・関数 80%、分岐 65%
node --test .codex/hooks/run.test.js           # Codex 用フック
node --test .claude/scripts/lib/viva-knowledge.test.js
markdownlint-cli2 "**/*.md"
yamllint .
```

## フックの仕組み

- すべてのフックは `node .claude/hooks/run-with-flags.js <hookId> <scriptPath> <profiles-csv>` 経由で動く。このディスパッチャーが、プロファイル判定（`VCW_HOOK_PROFILE` = `minimal` / `standard` / `strict`）、`VCW_DISABLED_HOOKS` による無効化、`VCW_PLUGIN_ROOT` の外にあるスクリプトの拒否、ログ記録を行い、スクリプトの `run(input)` を同じプロセスで呼ぶ。例外が起きても exit 0 で終わる（フックで Claude を止めない）。
- 1 フック = `scripts/` の 1 ファイル + `tests/` の 1 テスト。共通処理は `hooks/lib/`。テストでは `tests/helpers/test-utils.js` の `runHook`（ディスパッチャー経由のサブプロセス）か `runScript`（インプロセス）を使う。
- Hook ID は `vcw:` か `project:` で始まり、`<scope>:<event>:...:<name>` の形。
- git コマンドを見るフック（`block-no-verify`・`block-force-push`・`security-trigger`）は `hooks/lib/git-command.js` でコマンドを分解する。わざと回避する書き方までは止めない。対象外の書き方は `.claude/hooks/README.md` の「hook が見ない書き方」にある。
- 状態とログは `~/.claude/vivastack-cc-workflows/` に置く（`hooks/lib/state.js`）。
- `.codex/hooks/run.js` は Codex から同じフックを動かす。プロファイルと無効化 ID の扱いは Claude 側と同じにする（`run.test.js` で確認している）。
- フックごとの詳細は `.claude/hooks/README.md`。

## 注意

- `.gitignore` は `lib/` を無視していて、例外は `!.claude/*/lib` だけ。ほかの場所に `lib/` ディレクトリを作っても git に入らない。
