"""Read Codex execution status snapshots without contacting the runner."""

import argparse
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import subprocess
import sys
import time


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("run_id", nargs="?")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--watch", action="store_true")
    parser.add_argument("--watch-count", type=int, default=3)
    parser.add_argument("--interval", type=int, default=5)
    parser.add_argument("--stale-seconds", type=int, default=1800)
    parser.add_argument("--exit-code", action="store_true", help="exit 2 for stale or blocked runs")
    args = parser.parse_args()
    if args.run_id and not re.fullmatch(r"[a-zA-Z0-9][a-zA-Z0-9-]{0,63}", args.run_id):
        parser.error("Use a run ID of 1–64 letters, digits or hyphens")
    if min(args.watch_count, args.interval, args.stale_seconds) < 1:
        parser.error("Watch settings must be positive")
    return args


def snapshots(root, args):
    required = {"pattern", "mode", "state", "phase", "last_checkpoint", "failing_checks", "updated_at"}
    paths = (
        [root / args.run_id / "status.json"]
        if args.run_id else sorted(root.glob("*/status.json"))
    )
    runs, errors = [], []
    for path in paths:
        try:
            if path.is_symlink() or path.parent.is_symlink():
                raise ValueError("snapshot must be in the worktree")
            info = json.loads(path.read_text(encoding="utf-8"))
            if not isinstance(info, dict) or not required <= info.keys():
                raise ValueError("incomplete status object")
            updated = datetime.fromisoformat(info["updated_at"].replace("Z", "+00:00"))
            age = (datetime.now(timezone.utc) - updated).total_seconds()
            stale = info["state"] == "running" and age >= args.stale_seconds
            runs.append({**info, "id": path.parent.name, "stale": stale})
        except (OSError, ValueError, TypeError, AttributeError) as error:
            errors.append({"id": path.parent.name, "error": str(error)})
    return {"observed_at": datetime.now(timezone.utc).isoformat(), "runs": runs, "errors": errors}


def main():
    args = parse_args()
    git_root = subprocess.check_output(["git", "rev-parse", "--show-toplevel"], text=True).rstrip("\n")
    root = Path(git_root) / "artifacts/codex/loops"
    if root.resolve() != root:
        raise ValueError("Loop snapshots must be stored in the worktree")
    code = 0
    count = args.watch_count if args.watch else 1
    for index in range(count):
        frame = snapshots(root, args)
        if args.json:
            print(json.dumps(frame), flush=True)
        else:
            if not frame["runs"] and not frame["errors"]:
                print("No managed Codex loop snapshots found", flush=True)
            for run in frame["runs"]:
                label = " (stale)" if run["stale"] else ""
                print(f"{run['id']} {run['state']}{label} phase={run['phase']} "
                      f"checkpoint={run['last_checkpoint']} checks={run['failing_checks']}", flush=True)
            for error in frame["errors"]:
                print(f"{error['id']}: {error['error']}", file=sys.stderr, flush=True)
        if frame["errors"]:
            code = max(code, 1)
        if args.exit_code and any(
            run["stale"] or run["state"] == "blocked" or run["failing_checks"]
            for run in frame["runs"]
        ):
            code = 2
        if index + 1 < count:
            time.sleep(args.interval)
    return code


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
