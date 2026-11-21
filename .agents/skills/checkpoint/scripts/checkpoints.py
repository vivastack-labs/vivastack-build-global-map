"""Record and compare workflow checkpoints for the current worktree."""

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

NAME = re.compile(r"[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}\Z")


def git(*args):
    return subprocess.check_output(["git", *args], text=True).rstrip("\n")


def relation(commit, current):
    if commit == current:
        return "current"
    for a, b, label in [(commit, current, "behind"), (current, commit, "ahead")]:
        result = subprocess.run(["git", "merge-base", "--is-ancestor", a, b], check=False)
        if result.returncode == 0:
            return label
        if result.returncode != 1:
            return "unknown"
    return "diverged"


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command", required=True)
    create = commands.add_parser("create")
    create.add_argument("name")
    create.add_argument("--build", choices=["pass", "fail", "skipped"])
    create.add_argument("--passed", type=int)
    create.add_argument("--failed", type=int)
    create.add_argument("--coverage", type=float)
    commands.add_parser("verify").add_argument("name")
    commands.add_parser("list")
    commands.add_parser("clear", help="keep the newest five checkpoint records")
    args = parser.parse_args()
    if getattr(args, "name", None) is not None and not NAME.fullmatch(args.name):
        parser.error("Use a checkpoint name of 1–64 letters, digits, dots, underscores or hyphens")
    if args.command == "create":
        if any(n is not None and n < 0 for n in (args.passed, args.failed)):
            parser.error("Test counts must be non-negative")
        if args.coverage is not None and not 0 <= args.coverage <= 100:
            parser.error("Coverage must be between 0 and 100")
    return args


def main():
    args = parse_args()
    repo = Path(git("rev-parse", "--show-toplevel"))
    os.chdir(repo)
    root = repo / "artifacts/codex/checkpoints"
    if root.resolve() != root:
        raise ValueError("Checkpoints must be stored in the worktree")
    current = git("rev-parse", "--verify", "HEAD")
    if args.command == "create":
        root.mkdir(parents=True, exist_ok=True)
        entry = {
            "name": args.name, "commit": current,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "build": args.build, "passed": args.passed, "failed": args.failed,
            "coverage": args.coverage,
        }
        with (root / f"{args.name}.json").open("x", encoding="utf-8") as handle:
            json.dump(entry, handle)
            handle.write("\n")
        print(f"{args.name}\t{current}")
    elif args.command == "verify":
        file = root / f"{args.name}.json"
        if file.is_symlink():
            raise ValueError("Checkpoint must be a regular file in the worktree")
        entry = json.loads(file.read_text(encoding="utf-8"))
        commit = entry["commit"]
        if not re.fullmatch(r"(?:[a-f0-9]{40}|[a-f0-9]{64})", commit):
            raise ValueError("Invalid saved commit ID")
        print(json.dumps(entry, indent=2))
        print(git("diff", "--name-status", commit, "--"))
        untracked = git("ls-files", "--others", "--exclude-standard")
        if untracked:
            print("Untracked files:\n" + untracked)
    else:
        entries = [
            (file, json.loads(file.read_text(encoding="utf-8")))
            for file in root.glob("*.json") if file.is_file() and not file.is_symlink()
        ]
        entries.sort(key=lambda item: item[1]["created_at"], reverse=True)
        if args.command == "clear":
            for file, _ in entries[5:]:
                file.unlink()
            print(f"Removed {max(0, len(entries) - 5)} checkpoint records")
        else:
            for _, entry in entries:
                status = relation(entry["commit"], current)
                print(f"{entry['name']}\t{entry['created_at']}\t{entry['commit']}\t{status}")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, KeyError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
