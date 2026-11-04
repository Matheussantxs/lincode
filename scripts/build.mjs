import {mkdir,copyFile,writeFile,rm,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {publicPaths} from '../http-handler.mjs';

const moduleRoot=fileURLToPath(new URL('..',import.meta.url));
const root=process.cwd()&&path.resolve(process.cwd())===path.resolve(moduleRoot)?process.cwd():moduleRoot;
const targets=[path.join(root,'public'),path.join(root,'dist')];

for(const out of targets){
 try{if((await lstat(out)).isSymbolicLink())throw Error('Destino de build não pode ser um link.');}catch(e){if(e.code!=='ENOENT')throw e;}
 await rm(out,{recursive:true,force:true});
 await mkdir(out,{recursive:true});
 for(const file of publicPaths){
  const dst=path.join(out,file);
  await mkdir(path.dirname(dst),{recursive:true});
  try{await copyFile(path.join(root,file),dst);}
  catch(e){if(e.code==='ENOENT'&&file.startsWith('portfolio/'))continue;throw e;}
 }
 await writeFile(path.join(out,'robots.txt'),'User-agent: *\nDisallow: /api/\n');
}
console.log('Build público gerado por lista explícita de arquivos em public/ e dist/.');
