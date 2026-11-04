import {mkdir,copyFile,writeFile,rm,lstat,readdir} from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {publicPaths} from '../http-handler.mjs';

const moduleRoot=fileURLToPath(new URL('..',import.meta.url));
const root=process.cwd();
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

const distExists = fs.existsSync(path.join(root, 'dist'));
const distCount = distExists ? (await readdir(path.join(root, 'dist'))).length : 0;
console.log(`Build gerado com sucesso em ${root}. dist existe: ${distExists} (${distCount} arquivos).`);
