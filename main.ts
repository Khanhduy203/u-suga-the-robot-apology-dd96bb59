// The Robot Apology — writes a two-line robot confession to entry.txt.
// Node stdlib only. The grader runs `node /bot/main.ts` with no network,
// no clock and no randomness; the entry text is fixed and embedded below.

const fs = require('node:fs');
const path = require('node:path');

const ENTRY_LINES = [
  "I'm sorry I watered the fern on the windowsill and left your basil to wilt, because I grabbed the can without reading the tag on the pot.",
  'I have learned to read the tag on every pot before I lift the can, and to water only the plant the tag names.',
];

function validate(text) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    throw new Error('entry must not be only whitespace');
  }
  if (text.length < 1 || text.length > 400) {
    throw new Error(`entry must be 1-400 characters, got ${text.length}`);
  }
  const lines = text.split('\n');
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error('entry lines must not be empty');
    }
    // Each line must be a single sentence: exactly one sentence-ending
    // full stop, at the end of the line.
    const stops = (line.match(/\./g) || []).length;
    if (stops !== 1 || !line.trimEnd().endsWith('.')) {
      throw new Error(`each line must be exactly one sentence: ${JSON.stringify(line)}`);
    }
  }
}

function main() {
  const text = ENTRY_LINES.join('\n') + '\n';
  validate(text.trimEnd());
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  fs.mkdirSync(outDir, { recursive: true });
  const dest = path.join(outDir, 'entry.txt');
  fs.writeFileSync(dest, text, 'utf8');
  const bytes = Buffer.byteLength(text, 'utf8');
  console.log(`wrote ${dest} (${bytes} bytes)`);
}

main();
