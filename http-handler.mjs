import {readFile,realpath,lstat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createSupabase} from './supabase-client.mjs';
import {createSecurity,headers} from './security.mjs';
import {createAccountApi} from './auth-server.mjs';
const root=fileURLToPath(new URL('.',import.meta.url));
const publicFiles=new Set(['index.html','styles.css','app.js','curriculum.js','python-chapters.js','intro.js','catalog.js','progress.js','content/javascript.js','content/java.js','content/csharp.js','content/cpp.js','content/python-fluxos.js','content/python-logica-a.js','content/python-logica-b.js','content/python-logica-extra.js','content/python-fundamentos-a.js','content/python-fundamentos-b.js','content/python-fundamentos-c.js','content/python-poo-a.js','content/javascript-c01-a.js','content/java-c01-a.js','content/csharp-c01-a.js','content/cpp-c01-a.js','content/python-poo-b.js','content/javascript-c01-b.js','content/java-c01-b.js','content/csharp-c01-b.js','content/cpp-c01-b.js','content/python-estruturas-a.js','content/javascript-c02-a.js','content/java-c02-a.js','content/csharp-c02-a.js','content/cpp-c02-a.js','content/python-estruturas-b.js','content/javascript-c02-b.js','content/java-c02-b.js','content/csharp-c02-b.js','content/cpp-c02-b.js','content/python-arquivos.js','content/python-qualidade.js','content/javascript-c03.js','content/javascript-c04.js','content/java-c03.js','content/java-c04.js','content/csharp-c03.js','content/csharp-c04.js','content/cpp-c03.js','content/cpp-c04.js','content/extra-javascript.js','content/extra-java.js','content/extra-csharp.js','content/extra-cpp.js','content/extra-python-1.js','content/extra-python-2.js','content/python-dados.js','content/python-numpy.js','content/javascript-c05.js','content/javascript-c06.js','content/java-c05.js','content/java-c06.js','content/csharp-c05.js','content/csharp-c06.js','content/cpp-c05.js','content/cpp-c06.js','content/python-pandas.js','content/python-statsmodels.js','content/javascript-c07.js','content/javascript-c08.js','content/java-c07.js','content/java-c08.js','content/csharp-c07.js','content/csharp-c08.js','content/cpp-c07.js','content/cpp-c08.js','content/python-mlops.js','content/javascript-c09.js','content/javascript-c10.js','content/java-c09.js','content/java-c10.js','content/csharp-c09.js','content/csharp-c10.js','content/cpp-c09.js','content/cpp-c10.js','content/javascript-c11.js','docs/CURRICULO.md','docs/VALIDACAO.md','portfolio/README.md','portfolio/train.py','portfolio/predict.py','portfolio/monitor.py','portfolio/requirements.txt']);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.md':'text/plain; charset=utf-8','.py':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
export function createHandler({env=process.env,client}={}){
 const production=env.NODE_ENV==='production',vercel=env.VERCEL==='1';
 const origin=vercel&&env.VERCEL_ENV==='preview'&&env.VERCEL_URL?'https://'+env.VERCEL_URL:env.APP_ORIGIN;
 if(origin&&(!['http:','https:'].includes(new URL(origin).protocol)||new URL(origin).origin!==origin||production&&!origin.startsWith('https://')))throw Error('APP_ORIGIN inválida. Produção exige HTTPS.');
 const supabase=client===undefined?createSupabase({url:env.SUPABASE_URL,key:env.SUPABASE_PUBLISHABLE_KEY||env.SUPABASE_ANON_KEY,rateKey:env.SUPABASE_RATE_LIMIT_KEY,testing:env.NODE_ENV==='test'}):client;
 if(supabase&&!env.LINCODE_SESSION_SECRET)throw Error('Configure LINCODE_SESSION_SECRET fora do código.');
 const security=createSecurity({secret:env.LINCODE_SESSION_SECRET,origin,sharedLimit:supabase?.sharedLimit,production});const api=createAccountApi(supabase,security);
 return async(req,res)=>{
  req.isHttps=!!req.socket.encrypted||(vercel&&req.headers['x-forwarded-proto']==='https');
  // Vercel overwrites x-vercel-forwarded-for; never trust arbitrary X-Forwarded-For outside that runtime.
  req.clientIp=vercel?String(req.headers['x-vercel-forwarded-for']||'missing-vercel-ip').split(',')[0].trim():req.socket.remoteAddress;
  headers(req,res);
  try{
   if(origin?req.headers.host!==new URL(origin).host:! /^(127\.0\.0\.1|localhost):\d+$/.test(req.headers.host||'')){res.writeHead(403);res.end('Host não permitido.');return;}
   if(production&&!req.isHttps){res.writeHead(426);res.end('HTTPS obrigatório.');return;}
   const url=new URL(req.url,origin||`http://${req.headers.host}`);
   if(vercel&&url.pathname==='/api/index'&&url.searchParams.has('path'))url.pathname='/api/'+url.searchParams.get('path');
   if(url.pathname.startsWith('/api/')){req.url=url.pathname;await security.guard(req,url);await api(req,res,url);return;}
   if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
   const file=decodeURIComponent(url.pathname)==='/'?'index.html':decodeURIComponent(url.pathname).slice(1);
   if(!publicFiles.has(file)){res.writeHead(404);res.end('Arquivo não encontrado.');return;}
   const target=path.resolve(root,file),canonical=await realpath(target);
   if(canonical!==target||(await lstat(target)).isSymbolicLink()){res.writeHead(404);res.end();return;}
   const data=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'text/plain; charset=utf-8','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:data);
  }catch(e){if(!res.headersSent){if(e.retryAfter)res.setHeader('Retry-After',String(e.retryAfter));res.writeHead(e.status|| (e.code==='ENOENT'?404:500),{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});}res.end(JSON.stringify({error:e.status?e.message:'Não foi possível abrir este recurso.',...(e.status&&e.code?{code:e.code}:{})}));}
 };
}
export const publicPaths=[...publicFiles];
