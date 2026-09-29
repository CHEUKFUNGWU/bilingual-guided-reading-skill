#!/usr/bin/env node
const fs = require("fs");
const os = require("os");
const path = require("path");

const pkg = require("./package.json");
const SKILL = "bilingual-guided-reading";
const SRC = path.join(__dirname, SKILL);

function usage() {
  console.log(`bilingual-guided-reading v${pkg.version} — 中英雙語導讀 (Claude Code skill)

Usage 用法:
  npx ${pkg.name} [options]

Options 選項:
  (no flags)     Install to 安裝到 ~/.claude/skills/  (all projects, default)
  --project, -p  Install to the current project 安裝到目前項目 ./.claude/skills/
  --agents       Install to 安裝到 ~/.agents/skills/
  --dir <path>   Install to a custom folder 安裝到指定資料夾
  --uninstall    Remove the skill instead 移除已安裝的 skill
  --help, -h     Show this help 顯示說明

After installing, restart Claude Code (or start a new session).
安裝後重啟 Claude Code(或開新 session)即可使用。`);
}

function parseArgs(argv) {
  const opts = { scopes: [], uninstall: false, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") opts.help = true;
    else if (a === "--project" || a === "-p") opts.scopes.push("project");
    else if (a === "--agents") opts.scopes.push("agents");
    else if (a === "--dir") {
      const v = argv[++i];
      if (!v) fail("--dir requires a path 請提供資料夾路徑");
      opts.scopes.push({ dir: path.resolve(v) });
    } else if (a === "--uninstall") opts.uninstall = true;
    else fail(`Unknown option 未知的選項: ${a}\nRun 執行 npx ${pkg.name} --help`);
  }
  if (opts.scopes.length === 0) opts.scopes.push("user");
  return opts;
}

function scopeToBase(scope) {
  if (scope === "user") return path.join(os.homedir(), ".claude", "skills");
  if (scope === "project") return path.join(process.cwd(), ".claude", "skills");
  if (scope === "agents") return path.join(os.homedir(), ".agents", "skills");
  return scope.dir;
}

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    usage();
    return;
  }
  if (!fs.existsSync(SRC)) {
    fail(`Bundled skill not found 找不到內置的 skill: ${SRC}`);
  }

  for (const scope of opts.scopes) {
    const base = scopeToBase(scope);
    const dest = path.join(base, SKILL);

    if (opts.uninstall) {
      if (!fs.existsSync(dest)) {
        console.log(`· Not installed here, skipped 此處沒有安裝,略過: ${dest}`);
        continue;
      }
      fs.rmSync(dest, { recursive: true, force: true });
      console.log(`✓ Removed 已移除: ${dest}`);
      continue;
    }

    const updating = fs.existsSync(dest);
    fs.mkdirSync(base, { recursive: true });
    fs.rmSync(dest, { recursive: true, force: true });
    fs.cpSync(SRC, dest, { recursive: true });
    if (!fs.existsSync(path.join(dest, "SKILL.md"))) {
      fail(`Install failed 安裝失敗 (SKILL.md missing): ${dest}`);
    }
    console.log(`${updating ? "↻ Updated 已更新" : "✓ Installed 已安裝"}: ${dest}`);
  }

  if (opts.uninstall) return;
  console.log(`
Next steps 下一步:
  1. Restart Claude Code / start a new session 重啟 Claude Code(或開新 session)
  2. Attach a document and say 附上文件然後說:
     「帶我讀這份報告,中英雙語」
     "Walk me through my essay bilingually"`);
}

main();
