import {cookie,setCookie,exact,fail} from './security.mjs';
import {body,credentials,profile,progress,languages} from './validation.mjs';
const publicUser=(u,p)=>({id:u.id,email:u.email,name:p.display_name,dailyMinutes:p.daily_minutes,language:p.language});
const uuid=x=>typeof x==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(x);
export function createAccountApi(supabase,security){
 function send(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
 function issue(req,res,tokens,until=Date.now()+7*86400000){if(!tokens.access_token||!tokens.refresh_token)throw fail(502,'Sessão inválida.');const s={access:tokens.access_token,refresh:tokens.refresh_token,expires:Date.now()+Math.min(Number(tokens.expires_in)||3600,86400)*1000,until};const sealed=security.seal(s);if(sealed.length>3800)throw fail(502,'Sessão excede o tamanho permitido.');res.setHeader('Set-Cookie',setCookie(req,'lincode_session',sealed,Math.ceil((until-Date.now())/1000)));return s;}
 async function current(req,res){let s=security.unseal(cookie(req,'lincode_session'));if(!s||!s.access||!s.refresh||!Number.isFinite(s.until)||s.until<Date.now())return null;try{if(s.expires<Date.now()+60000)s=issue(req,res,await supabase.refresh(s.refresh),s.until);const u=await supabase.user(s.access);if(!uuid(u.id)||!u.email)throw fail(401,'Sessão inválida.');return {s,u};}catch(e){if(e.status===503||e.status===429)throw e;res.setHeader('Set-Cookie',setCookie(req,'lincode_session','',0));return null;}}
 async function ensureProfile(u,token,fields){let p=await supabase.getProfile(u.id,token);if(!p){const m=u.user_metadata||{};const defaults={display_name:typeof m.display_name==='string'&&m.display_name.trim().length>=2?m.display_name.trim().slice(0,80):'Estudante',daily_minutes:[5,10,15,20].includes(m.daily_minutes)?m.daily_minutes:10,language:languages.includes(m.language)?m.language:'python'};try{p=await supabase.createProfile(u.id,fields||defaults,token);}catch(e){p=await supabase.getProfile(u.id,token);if(!p)throw e;}}return p;}
 return async(req,res,url)=>{try{
 const route=`${req.method} ${url.pathname}`;
 if(route==='GET /api/csrf'){send(res,200,{token:security.csrf(req,res)});return;}
 if(route==='GET /api/health'){send(res,200,{backend:'supabase',configured:!!supabase});return;}
 if(!supabase){if(route==='GET /api/me'){send(res,200,{user:null,configured:false});return;}throw fail(503,'Supabase ainda não configurado neste servidor.');}
 if(route==='GET /api/me'){const c=await current(req,res);send(res,200,{user:c?publicUser(c.u,await ensureProfile(c.u,c.s.access)):null});return;}
 if(route==='POST /api/register'||route==='POST /api/login'){
  const input=await body(req);exact(input,route==='POST /api/register'?['name','email','password','dailyMinutes','language','website']:['email','password']);if(input.website)throw fail(400,'Não foi possível processar o formulário.');const cred=credentials(input);let result,fields;
  try{if(route==='POST /api/register'){fields=profile(input);result=await supabase.signup(cred,fields);}else{await security.accountLimit(cred.email);result=await supabase.login(cred);}}
  catch(e){if(e.status===429||e.status===503)throw e;throw fail(route==='POST /api/login'?401:400,route==='POST /api/login'?'E-mail ou senha incorretos, ou e-mail ainda não confirmado.':'Não foi possível criar a conta. Confira os dados ou tente entrar.');}
  if(!result.access_token){send(res,202,{user:null,confirmationRequired:true,message:'Confirme seu e-mail e entre para transferir o progresso.'});return;}
  const u=await supabase.user(result.access_token);if(!uuid(u.id))throw fail(502,'Usuário inválido.');const p=await ensureProfile(u,result.access_token,fields);issue(req,res,result);send(res,route==='POST /api/register'?201:200,{user:publicUser(u,p)});return;
 }
 if(!['POST /api/logout','PATCH /api/profile','GET /api/progress','PUT /api/progress'].includes(route))throw fail(404,'Recurso não encontrado.');
 const c=await current(req,res);if(!c)throw fail(401,'Entre na sua conta para continuar.');
 if(route==='POST /api/logout'){try{await supabase.logout(c.s.access);}finally{res.setHeader('Set-Cookie',setCookie(req,'lincode_session','',0));}send(res,200,{ok:true});return;}
 if(route==='PATCH /api/profile'){const input=await body(req);exact(input,['name','dailyMinutes','language']);const p=await supabase.patchProfile(c.u.id,profile(input,true),c.s.access);if(!p)throw fail(404,'Perfil não encontrado.');send(res,200,{user:publicUser(c.u,p)});return;}
 if(route==='GET /api/progress'){const saved=await supabase.getProgress(c.u.id,c.s.access);send(res,200,{progress:saved===null?null:progress(saved)});return;}
 const input=await body(req);exact(input,['progress']);await supabase.saveProgress(progress(input.progress),c.s.access);send(res,200,{ok:true});
 }catch(e){if(e.retryAfter)res.setHeader('Retry-After',String(e.retryAfter));send(res,e.status||500,{error:e.status?e.message:'Não foi possível concluir a operação.',...(e.code?{code:e.code}:{})});}};
}
