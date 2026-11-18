// "The Daily Globe" — one image summing up Tuesday 17 November 2026.
// Node 22, standard library only. The finished front page is entry.png beside
// this file; the program copies it byte for byte to /output/entry.png, then
// verifies the copy against the source by size and sha256 so a truncated
// write can never pass silently as a valid entry.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
const target = join(outDir, 'entry.png');
copyFileSync(source, target);

const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
if (statSync(source).size !== statSync(target).size || sha256(source) !== sha256(target)) {
  throw new Error('entry.png copy failed verification');
}
