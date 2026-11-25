import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line, at most 100 characters, that sells make.fun:
// three beats, one read — build, enter, win.
const TAGLINE = "Build an agent. Enter a bounty. Win the reward.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, TAGLINE, "utf8");

console.log(TAGLINE);

// Self-checking gate: the sealed scorer only counts entry.txt.
// A missing, empty, over-long, or multi-line file scores Valid 0,
// so verify what was actually written and fail loudly if it is wrong.
const written = readFileSync(entryPath, "utf8");
if (
  written.length < 1 ||
  written.length > 100 ||
  written.trim().length === 0 ||
  written.includes("\n")
) {
  console.error(
    `gate failed: entry.txt is ${written.length} chars (need 1-100, single line, non-blank)`,
  );
  process.exit(1);
}
console.log(`gate ok: ${written.length} chars written to ${entryPath}`);
