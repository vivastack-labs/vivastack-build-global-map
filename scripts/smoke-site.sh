#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 || ( "$1" != --check-files && ! "$1" =~ ^https?://[^/]+/?$ ) ]]; then
  echo "Usage: bash scripts/smoke-site.sh --check-files | <site-origin>" >&2
  exit 2
fi

base_url=${1%/}
asset_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/../docs/html" && pwd)
security_headers="$asset_dir/_headers"
for name in Content-Security-Policy X-Frame-Options X-Content-Type-Options Referrer-Policy; do
  if ! grep -Eq "^  ${name}: .+" "$security_headers"; then
    printf 'Required security header is missing from _headers: %s\n' "$name" >&2
    exit 1
  fi
done

if [[ "$1" != --check-files ]]; then
  response_dir=$(mktemp -d)
  response_file="$response_dir/body"
  response_headers="$response_dir/headers"
  trap 'rm -rf -- "$response_dir"' EXIT
fi

check_security_headers() {
  local header
  tr -d '\r' < "$response_headers" > "$response_dir/normalized-headers"
  while IFS= read -r header; do
    if ! grep -Fxiq -- "$header" "$response_dir/normalized-headers"; then
      printf 'Expected response header for %s: %s\n' "$1" "$header" >&2
      return 1
    fi
  done < <(sed -n 's/^  //p' "$security_headers")
}

check_response() {
  local path=$1 expected_status=$2 expected_file=${3:-}
  local status attempt

  for attempt in 1 2 3 4; do
    if status=$(curl --disable --silent --show-error --connect-timeout 5 --max-time 15 \
      --user-agent 'VivaStack World Atlas smoke check/1.0' \
      --dump-header "$response_headers" \
      --output "$response_file" --write-out '%{http_code}' "$base_url$path") &&
      [[ "$status" == "$expected_status" ]] &&
      { [[ -z "$expected_file" ]] || cmp -s -- "$asset_dir/$expected_file" "$response_file"; } &&
      { [[ "$expected_status" != 200 ]] || check_security_headers "$path"; }; then
      printf '%s %s\n' "$status" "$path"
      return
    fi

    if [[ "$attempt" != 4 ]]; then
      sleep 2
    fi
  done

  printf 'Unexpected response for %s (HTTP %s, expected %s with matching content and headers when applicable)\n' \
    "$path" "$status" "$expected_status" >&2
  return 1
}

check_asset() {
  local asset=$1 path=${2:-/$1}

  if [[ "$base_url" == --check-files ]]; then
    if [[ ! -s "$asset_dir/$asset" ]]; then
      printf 'Required site asset is missing or empty: %s\n' "$asset" >&2
      return 1
    fi
    return
  fi

  check_response "$path" 200 "$asset"
}

for asset in world-atlas.html about.html privacy.html assets/atlas.css assets/atlas.js \
  assets/favicon.png assets/vendor/d3.min.js assets/world.json assets/admin/JPN.json assets/flags/JP.svg; do
  check_asset "$asset"
done
check_asset 'mascots/徳島県.png' '/mascots/%E5%BE%B3%E5%B3%B6%E7%9C%8C.png'

if [[ "$base_url" != --check-files ]]; then
  check_asset world-atlas.html /
  check_response /_headers 404
  check_response /_redirects 404
  check_response /__global_map_missing_check__ 404
fi
