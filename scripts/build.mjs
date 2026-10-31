import {mkdir,copyFile,writeFile,rm,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {publicPaths} from '../http-handler.mjs';
const root=fileURLToPath(new URL('..',import.meta.url)),out=path.join(root,'public');
if(path.dirname(out)!==path.resolve(root)||path.basename(out)!=='public')throw Error('Destino de build inválido.');
try{if((await lstat(out)).isSymbolicLink())throw Error('Destino de build não pode ser um link.');}catch(e){if(e.code!=='ENOENT')throw e;}
await rm(out,{recursive:true,force:true});
await mkdir(out,{recursive:true});
for(const file of publicPaths){const dst=path.join(out,file);await mkdir(path.dirname(dst),{recursive:true});try{await copyFile(path.join(root,file),dst);}catch(e){if(e.code==='ENOENT'&&file.startsWith('portfolio/'))continue;throw e;}}
await writeFile(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /api/\n');
console.log('Build público gerado por lista explícita de arquivos.');
