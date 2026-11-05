import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFile,readdir,mkdir,writeFile} from 'node:fs/promises';
import {join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {publicPaths} from '../http-handler.mjs';

test('build publishes all public assets and removes stale private files',async()=>{
 const root=new URL('../',import.meta.url),output=new URL('public/',root);
 await mkdir(output,{recursive:true});
 await writeFile(new URL('private-stale.txt',output),'must not be published');
 execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root});
 const files=await readdir(output,{recursive:true,withFileTypes:true});
 const names=files.filter(entry=>entry.isFile()).map(entry=>relative(fileURLToPath(output),join(entry.parentPath,entry.name)).replaceAll('\\','/'));
 assert.deepEqual(names.sort(),[...publicPaths].sort());
 const html=await readFile(new URL('index.html',output),'utf8');
 for(const [,file] of html.matchAll(/(?:src|href)="([^"#]+)"/g))assert.ok(names.includes(file),`Missing asset: ${file}`);
 const config=JSON.parse(await readFile(new URL('vercel.json',root)));
 assert.equal(config.outputDirectory,'public');
 assert.equal(config.buildCommand,'npm run build');
});
