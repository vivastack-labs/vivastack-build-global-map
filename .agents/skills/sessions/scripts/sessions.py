"""Manage repository-local Codex handoff notes."""

import argparse
import re
import subprocess
import sys
from pathlib import Path

NOTE = re.compile(r"(\d{4}-\d{2}-\d{2})-([a-z0-9]+)-session\.md\Z")
ALIAS = re.compile(r"[a-zA-Z0-9][a-zA-Z0-9._-]{0,63}\Z")


def repo_root():
    return Path(subprocess.check_output(
        ["git", "rev-parse", "--show-toplevel"], text=True
    ).rstrip("\n"))


def notes_in(root):
    return sorted(
        (p for p in root.glob("*-session.md")
         if NOTE.fullmatch(p.name) and p.is_file() and not p.is_symlink()),
        key=lambda p: (p.stat().st_mtime_ns, p.name),
        reverse=True,
    )


def aliases_in(root):
    return {
        p.stem: p.read_text(encoding="utf-8").strip()
        for p in sorted((root / "aliases").glob("*.txt"))
        if ALIAS.fullmatch(p.stem) and p.is_file() and not p.is_symlink()
    }


def resolve(selector, notes, aliases):
    if selector == "latest":
        matches = notes[:1]
    else:
        target = aliases.get(selector, selector)
        matches = [
            p for p in notes
            if target == p.name or target in NOTE.fullmatch(p.name).groups()
        ]
        if not matches and len(target) >= 4:
            matches = [p for p in notes if NOTE.fullmatch(p.name)[2].startswith(target)]
    if not matches:
        raise ValueError(f"No handoff found for {selector!r}")
    if len(matches) > 1:
        names = ", ".join(p.name for p in matches)
        raise ValueError(f"Ambiguous selector {selector!r}. Choose from {names}")
    return matches[0]


def metadata(contents):
    result = {}
    for line in contents.splitlines():
        if line.startswith("## "):
            break
        key, _, value = line.partition(":")
        if key in {"Project", "Branch", "Worktree"}:
            result[key] = value.strip()
    return result


def describe(note, aliases):
    contents = note.read_text(encoding="utf-8")
    stats = note.stat()
    fields = metadata(contents)
    names = ", ".join(name for name, target in aliases.items() if target == note.name)
    return fields, names, len(contents.splitlines()), stats.st_size


def alias_path(root, name):
    if not ALIAS.fullmatch(name) or name == "latest":
        raise ValueError("Use an alias of 1–64 letters, digits, dots, underscores or hyphens")
    folder = root / "aliases"
    if folder.is_symlink():
        raise ValueError("Aliases must be stored in the worktree")
    return folder / f"{name}.txt"


def parse_args():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest="command")
    listing = commands.add_parser("list", help="show recent handoffs")
    listing.add_argument("--limit", type=int, default=50)
    listing.add_argument("--date")
    listing.add_argument("--search")
    commands.add_parser("load", help="print one note").add_argument("selector")
    commands.add_parser("info", help="show note metadata").add_argument(
        "selector", nargs="?", default="latest"
    )
    alias = commands.add_parser("alias", help="create or remove an alias")
    alias.add_argument("selector", nargs="?")
    alias.add_argument("name", nargs="?")
    alias.add_argument("--remove")
    commands.add_parser("unalias", help="remove an alias").add_argument("name")
    commands.add_parser("aliases", help="list all aliases")
    commands.add_parser("help", help="show usage")
    args = parser.parse_args()
    if args.command == "help":
        parser.print_help()
        parser.exit()
    if args.command is None:
        return parser.parse_args(["list"])
    if args.command == "list" and args.limit < 1:
        parser.error("--limit must be positive")
    if args.command == "alias":
        if args.remove and (args.selector or args.name):
            parser.error("Provide either --remove NAME or SELECTOR NAME")
        if not args.remove and not (args.selector and args.name):
            parser.error("Provide either --remove NAME or SELECTOR NAME")
    return args


def main():
    args = parse_args()
    root = repo_root() / "artifacts/codex/sessions"
    if root.resolve() != root or (root / "aliases").is_symlink():
        raise ValueError("Handoffs and aliases must be stored in the worktree")
    notes = notes_in(root)
    aliases = aliases_in(root)
    if args.command == "list":
        matches = [
            p for p in notes if (not args.date or NOTE.fullmatch(p.name)[1] == args.date)
            and (not args.search or args.search.lower() in p.name.lower())
        ]
        print(f"Handoffs: {min(len(matches), args.limit)} of {len(matches)}")
        for note in matches[:args.limit]:
            fields, names, _, _ = describe(note, aliases)
            print(f"{note.name}\t{fields.get('Branch', '-')}\t{fields.get('Worktree', '-')}\t{names}")
    elif args.command == "aliases":
        for name, target in aliases.items():
            print(f"{name}\t{target}")
    elif args.command == "unalias" or (args.command == "alias" and args.remove):
        name = args.name if args.command == "unalias" else args.remove
        alias_path(root, name).unlink()
        print(f"Alias removed: {name}")
    elif args.command == "alias":
        note = resolve(args.selector, notes, aliases)
        target = alias_path(root, args.name)
        target.parent.mkdir(parents=True, exist_ok=True)
        with target.open("x", encoding="utf-8") as handle:
            handle.write(note.name + "\n")
        print(f"{args.name} -> {note.name}")
    else:
        note = resolve(args.selector, notes, aliases)
        if args.command == "load":
            sys.stdout.write(note.read_text(encoding="utf-8"))
        else:
            fields, names, lines, size = describe(note, aliases)
            print(f"Path: {note}\nLines: {lines}\nBytes: {size}\nAliases: {names or '-'}")
            for key, value in fields.items():
                print(f"{key}: {value}")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
