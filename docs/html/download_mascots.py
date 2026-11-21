#!/usr/bin/env python3
"""world-atlas.html の MASCOT_EXTRA が参照する外部マスコット画像を
ダウンロードし、ローカル参照 (mascots/<名前>.<ext>) に書き換える。標準ライブラリのみ。

使い方 (WSL):
  cd /mnt/c/Users/cndon/Downloads/TODOS/global-word/docs/html
  python3 download_mascots.py --dry-run   # 対象の一覧だけ表示 (変更なし)
  python3 download_mascots.py             # 実行 (初回は world-atlas.html.bak を作成)

再実行しても安全: すでにローカル化済みのエントリと存在するファイルはスキップする。
"""
import argparse
import json
import sys
import time
import urllib.request
from pathlib import Path
from urllib.parse import quote, urlsplit

HTML_NAME = "world-atlas.html"
START = "MASCOT_EXTRA="
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


def sniff_ext(data: bytes, content_type: str, url: str):
    """中身から画像形式を判定して拡張子を返す。画像でなければ None。"""
    if data.startswith(b"\x89PNG"):
        return ".png"
    if data.startswith(b"\xff\xd8"):
        return ".jpg"
    if data.startswith(b"GIF8"):
        return ".gif"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return ".webp"
    head = data[:512].lstrip().lower()
    if head.startswith(b"<svg") or (head.startswith(b"<?xml") and b"<svg" in data[:2048].lower()):
        return ".svg"
    return None


def fetch(url: str, timeout: int = 30):
    parts = urlsplit(url)
    req = urllib.request.Request(url, headers={
        "User-Agent": UA,
        "Referer": f"{parts.scheme}://{parts.netloc}/",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    })
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read(), r.headers.get("Content-Type", "")


def download(url: str, retries: int = 2):
    last = None
    for i in range(retries + 1):
        try:
            data, ctype = fetch(url)
            ext = sniff_ext(data, ctype, url)
            if not data or ext is None:
                raise ValueError(f"画像ではないレスポンス (type={ctype!r}, {len(data)} bytes)")
            return data, ext
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.0 * (i + 1))
    raise last


def is_remote(u):
    return isinstance(u, str) and u.startswith(("http://", "https://"))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--html", default=None, help=f"対象HTML (既定: スクリプトと同じ場所の {HTML_NAME})")
    ap.add_argument("--dry-run", action="store_true", help="一覧表示のみ。ダウンロードも書き換えもしない")
    args = ap.parse_args()

    base = Path(__file__).resolve().parent
    html_path = Path(args.html) if args.html else base / HTML_NAME
    base = html_path.resolve().parent
    text = html_path.read_text(encoding="utf-8")

    i = text.index(START) + len(START)
    obj, end = json.JSONDecoder().raw_decode(text, i)
    print(f"MASCOT_EXTRA: {len(obj)} 件 / 外部URL: "
          f"src={sum(is_remote(v.get('src')) for v in obj.values())}, "
          f"fallback={sum(is_remote(v.get('fallback')) for v in obj.values())}")

    if args.dry_run:
        for k, v in obj.items():
            for f in ("src", "fallback"):
                if is_remote(v.get(f)):
                    print(f"  {k} [{f}] {v[f]}")
        return 0

    out_dir = base / "mascots"
    out_dir.mkdir(exist_ok=True)
    ok, failed = [], []

    for key, v in obj.items():
        if not (is_remote(v.get("src")) or is_remote(v.get("fallback"))):
            continue
        stem = (v.get("local") or "mascots/" + key.replace("/", "_")).strip("/")
        if not stem.startswith("mascots/"):
            stem = "mascots/" + stem
        done = None
        errs = []
        for field in ("src", "fallback"):
            url = v.get(field)
            if not is_remote(url):
                continue
            try:
                data, ext = download(url)
                rel = stem + ext
                (base / rel).parent.mkdir(parents=True, exist_ok=True)
                (base / rel).write_bytes(data)
                done = rel
                print(f"OK   {key} <- {url} ({len(data):,} bytes) -> {rel}")
                break
            except Exception as e:  # noqa: BLE001
                errs.append(f"{field}: {url} ({e})")
            time.sleep(0.3)
        if done:
            v["src"] = quote(done, safe="/")
            v.pop("fallback", None)
            ok.append(key)
        else:
            failed.append((key, errs))
            print(f"FAIL {key}: " + " | ".join(errs))
        time.sleep(0.3)

    if ok:
        bak = html_path.with_suffix(html_path.suffix + ".bak")
        if not bak.exists():
            bak.write_bytes(html_path.read_bytes())
            print(f"バックアップ: {bak.name}")
        new_text = text[:i] + json.dumps(obj, ensure_ascii=False, indent=2) + text[end:]
        html_path.write_text(new_text, encoding="utf-8")
        print(f"{html_path.name} を更新しました")

    print(f"\n成功 {len(ok)} 件 / 失敗 {len(failed)} 件")
    for key, errs in failed:
        print(f"  未取得: {key}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
