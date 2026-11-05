import {copyFile,mkdir,rm} from 'node:fs/promises';
import {publicPaths} from '../http-handler.mjs';

const root=new URL('../',import.meta.url),output=new URL('public/',root);
await rm(output,{recursive:true,force:true});
for(const file of publicPaths){
 const target=new URL(file,output);
 await mkdir(new URL('.',target),{recursive:true});
 await copyFile(new URL(file,root),target);
}
console.log(`Publicados ${publicPaths.length} arquivos em public/.`);
