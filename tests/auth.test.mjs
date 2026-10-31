import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {randomBytes} from 'node:crypto';
import {createHandler} from '../http-handler.mjs';
import {fakeSupabase} from './fake-supabase.mjs';
async function setup(t){const backend=fakeSupabase(),server=http.createServer(createHandler({client:backend,env:{NODE_ENV:'test',LINCODE_SESSION_SECRET:randomBytes(32).toString('base64')}}));await new Promise(r=>server.listen(0,'127.0.0.1',r));t.after(()=>new Promise(r=>{server.closeAllConnections();server.close(r);}));const base='http://127.0.0.1:'+server.address().port;
 function client(){const jar=new Map();async function call(route,{method='GET',data,headers={},csrf=true}={}){let token;if(method!=='GET'&&csrf)token=(await call('/api/csrf')).data.token;const response=await fetch(base+route,{method,headers:{Cookie:[...jar].map(([k,v])=>k+'='+v).join('; '),Origin:base,...(data!==undefined?{'Content-Type':'application/json'}:{}),...(token?{'X-CSRF-Token':token}:{}),...headers},body:data!==undefined?JSON.stringify(data):undefined});for(const c of response.headers.getSetCookie()){const [k,...v]=c.split(';')[0].split('=');jar.set(k,v.join('='));}const text=await response.text();let value;try{value=JSON.parse(text);}catch{value=text;}return {status:response.status,data:value,headers:response.headers};}return {call,jar};}return {client,backend,base};}
const account=n=>({name:'Pessoa '+n,email:`person${n}@example.test`,password:'test-password-long',dailyMinutes:10,language:'python'});
test('server-side auth, minimal responses, per-user isolation and mass assignment rejection',async t=>{
 const s=await setup(t),a=s.client(),b=s.client();const one=await a.call('/api/register',{method:'POST',data:account(1)}),two=await b.call('/api/register',{method:'POST',data:account(2)});assert.equal(one.status,201);assert.equal(two.status,201);
 assert.deepEqual(Object.keys(one.data.user).sort(),['dailyMinutes','email','id','language','name']);assert.ok(!JSON.stringify(one.data).includes('access_token'));assert.match(one.headers.get('set-cookie'),/HttpOnly; SameSite=Strict/);
 assert.equal((await a.call('/api/progress',{method:'PUT',data:{progress:{completed:['python:introducao']}}})).status,200);
 assert.deepEqual((await b.call('/api/progress')).data,{progress:null});
 assert.equal((await b.call('/api/profile',{method:'PATCH',data:{name:'Alterado',user_id:one.data.user.id}})).status,400);
 assert.equal((await a.call('/api/me')).data.user.name,'Pessoa 1');
 assert.equal((await a.call('/api/progress',{method:'PUT',data:{user_id:two.data.user.id,progress:{}}})).status,400);
 assert.equal((await a.call('/api/progress',{method:'PUT',data:{progress:{role:'admin'}}})).status,400);
 assert.equal((await a.call('/api/logout',{method:'POST'})).status,200);assert.equal((await a.call('/api/progress')).status,401);
 assert.equal((await a.call('/api/login',{method:'POST',data:{email:account(1).email,password:account(1).password}})).status,200);
 assert.deepEqual((await a.call('/api/progress')).data.progress.completed,['python:introducao']);
});
test('CSRF token is mandatory, origin checked, token bound to encrypted login cookie',async t=>{
 const s=await setup(t),a=s.client();assert.equal((await a.call('/api/register',{method:'POST',data:account(1),csrf:false})).status,403);
 const before=(await a.call('/api/csrf')).data.token;assert.equal((await a.call('/api/register',{method:'POST',data:account(1)})).status,201);
 assert.equal((await a.call('/api/profile',{method:'PATCH',data:{name:'Novo Nome'},csrf:false,headers:{'X-CSRF-Token':before}})).status,403);
 assert.equal((await a.call('/api/profile',{method:'PATCH',data:{name:'Novo Nome'},headers:{Origin:'https://evil.example'}})).status,403);
 assert.equal((await a.call('/api/profile',{method:'PATCH',data:{name:'Novo Nome'},headers:{'Sec-Fetch-Site':'cross-site'}})).status,403);
 const old=a.jar.get('lincode_session');a.jar.set('lincode_session',old.slice(0,-8)+'tampered');assert.equal((await a.call('/api/progress')).status,401);
});
test('credential rate limit survives changing spoofed forwarding headers',async t=>{
 const s=await setup(t),a=s.client();for(let i=0;i<8;i++)assert.equal((await a.call('/api/login',{method:'POST',data:{email:'target@example.test',password:'wrong-password'},headers:{'X-Forwarded-For':'10.0.0.'+i}})).status,401);
 const blocked=await a.call('/api/login',{method:'POST',data:{email:'target@example.test',password:'wrong-password'}});assert.equal(blocked.status,429);assert.ok(Number(blocked.headers.get('retry-after'))>0);
});
test('headers, private files, upload rejection, invalid inputs and confirmation flow',async t=>{
 const s=await setup(t),a=s.client();const home=await a.call('/');assert.equal(home.status,200);assert.match(home.headers.get('content-security-policy'),/frame-ancestors 'none'/);assert.equal(home.headers.get('x-content-type-options'),'nosniff');
 for(const url of ['/.env.local','/.data/accounts.json','/server.mjs','/auth-server.mjs','/chat.md','/security.mjs','/supabase/migrations/202610310001_lincode.sql','/tools/9router/.env.local'])assert.equal((await a.call(url)).status,404,url);
 assert.equal((await a.call('/upload',{method:'POST',data:{},csrf:false})).status,405);
 assert.equal((await a.call('/api/register',{method:'POST',data:{...account(3),website:'bot.example'}})).status,400);
 assert.equal((await a.call('/api/register',{method:'POST',data:{...account(3),password:'x'.repeat(10000)}})).status,413);
 const confirmation=await a.call('/api/register',{method:'POST',data:{...account(4),email:'confirm@example.test'}});assert.equal(confirmation.status,202);assert.equal(confirmation.data.confirmationRequired,true);assert.equal((await a.call('/api/me')).data.user,null);
});
