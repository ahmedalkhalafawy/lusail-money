import { stripTypeScriptTypes } from 'node:module';
import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('src/money.ts', root), 'utf8');
const js = stripTypeScriptTypes(source, { mode: 'strip' });
await mkdir(new URL('dist/', root), { recursive: true });
await writeFile(new URL('dist/index.js', root), js);
await copyFile(new URL('src/index.d.ts', root), new URL('dist/index.d.ts', root));
console.log('Built dist/index.js and dist/index.d.ts');
