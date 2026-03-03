/* eslint-disable no-console */
/**
 * Lighthouse audit — runs against the production build.
 *
 * Usage:
 *   npm run build && npm run lighthouse
 *   npm run lighthouse -- --build        # build first, then audit
 *
 * Override Chrome path:
 *   CHROME_PATH="/path/to/chrome" npm run lighthouse
 */

import { execSync, spawn } from "child_process";
import { existsSync } from "fs";

import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

// ─── Config ────────────────────────────────────────────────────────────────

const PORT = 4322;
const HOST = `http://localhost:${PORT}`;
const BASE = "/kanso";
const THRESHOLD = 90;

const PAGES = [
  { label: "Homepage", path: "/" },
  { label: "Writings", path: "/writing/" },
  { label: "Writing detail", path: "/writing/markdown-style-guide/" },
  { label: "Tags", path: "/tag/" },
  { label: "Tag", path: "/tag/reference/" },
  { label: "About", path: "/about/" },
  { label: "Search", path: "/search/" },
];

// ─── Chrome discovery ──────────────────────────────────────────────────────

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  // Playwright cache (macOS / Linux)
  for (const cache of [
    `${process.env.HOME}/Library/Caches/ms-playwright`,
    `${process.env.HOME}/.cache/ms-playwright`,
  ]) {
    if (!existsSync(cache)) continue;
    try {
      const hit = execSync(
        `find "${cache}" -name "Google Chrome for Testing" -type f 2>/dev/null | head -1`
      )
        .toString()
        .trim();
      if (hit) return hit;

      const chromium = execSync(`find "${cache}" -name "chromium" -type f 2>/dev/null | head -1`)
        .toString()
        .trim();
      if (chromium) return chromium;
    } catch {
      // cache exists but find failed — continue
    }
  }

  // System installs
  return (
    [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    ].find(existsSync) ?? null
  );
}

// ─── Preview server ────────────────────────────────────────────────────────

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npm", ["run", "preview", "--", "--port", String(PORT)], {
      stdio: ["ignore", "pipe", "pipe"],
    });

    const onData = data => {
      if (data.toString().includes("ready")) resolve(proc);
    };

    proc.stdout.on("data", onData);
    proc.stderr.on("data", onData);
    proc.on("error", reject);
    setTimeout(() => reject(new Error("Preview server timed out after 15s")), 15_000);
  });
}

// ─── Output ────────────────────────────────────────────────────────────────

const c = {
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  bold: "\x1b[1m",
  reset: "\x1b[0m",
};

function scoreColor(score) {
  const pct = Math.round(score * 100);
  const col = pct >= 90 ? c.green : pct >= 50 ? c.yellow : c.red;
  return `${col}${String(pct).padStart(3)}${c.reset}`;
}

function printTable(results) {
  const labelW = Math.max(...results.map(r => r.label.length), 5);
  const row = (label, perf, a11y, bp, seo) =>
    `${label.padEnd(labelW)}  ${perf}  ${a11y}  ${bp}  ${seo}`;

  const header = row("Page", "Perf", "A11y", " BP ", "SEO ");
  console.log(`\n${c.bold}${header}${c.reset}`);
  console.log("─".repeat(labelW + 24));

  for (const { label, lhr } of results) {
    const cat = lhr.categories;
    console.log(
      row(
        label,
        scoreColor(cat.performance.score),
        scoreColor(cat.accessibility.score),
        scoreColor(cat["best-practices"].score),
        scoreColor(cat.seo.score)
      )
    );
  }
  console.log();
}

function printIssues(results) {
  const scored = new Set(["performance", "accessibility", "best-practices", "seo"]);
  let anyIssues = false;

  for (const { label, lhr } of results) {
    const weightedIds = new Set(
      Object.entries(lhr.categories)
        .filter(([id]) => scored.has(id))
        .flatMap(([, cat]) => cat.auditRefs.filter(r => r.weight > 0).map(r => r.id))
    );

    const failures = Object.values(lhr.audits).filter(
      a => weightedIds.has(a.id) && a.score !== null && a.score < 1
    );

    if (!failures.length) continue;
    if (!anyIssues) {
      console.log(`${c.bold}Issues:${c.reset}`);
      anyIssues = true;
    }

    console.log(`\n  ${c.bold}${label}${c.reset}`);
    for (const audit of failures) {
      const pct = Math.round(audit.score * 100);
      const col = pct >= 50 ? c.yellow : c.red;
      console.log(`  ${col}●${c.reset} [${String(pct).padStart(3)}] ${audit.title}`);
      const snippet = audit.details?.items?.[0]?.node?.snippet;
      if (snippet) console.log(`        ${snippet.slice(0, 110)}`);
    }
  }

  if (anyIssues) console.log();
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--build")) {
    console.log("Building...");

    execSync("npm run build", { stdio: "inherit" });
  }

  const chromePath = findChrome();
  if (!chromePath) {
    console.error(
      `${c.red}No Chrome found.${c.reset} Install Google Chrome or set CHROME_PATH env var.`
    );
    process.exit(1);
  }

  console.log("Starting preview server...");
  const preview = await startPreview();

  const chrome = await launch({
    chromePath,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });

  const results = [];

  try {
    for (const { label, path } of PAGES) {
      process.stdout.write(`  Auditing ${label}...`);
      const { lhr } = await lighthouse(`${HOST}${BASE}${path}`, {
        port: chrome.port,
        output: "json",
        logLevel: "silent",
      });
      results.push({ label, lhr });
      console.log(" done");
    }
  } finally {
    await chrome.kill();
    preview.kill();
  }

  printTable(results);
  printIssues(results);

  const allPass = results.every(({ lhr }) =>
    Object.values(lhr.categories).every(cat => Math.round(cat.score * 100) >= THRESHOLD)
  );

  if (!allPass) {
    console.log(`${c.red}Some scores are below the ${THRESHOLD} threshold.${c.reset}\n`);
    process.exit(1);
  }

  console.log(`${c.green}All scores pass the ${THRESHOLD} threshold.${c.reset}\n`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
