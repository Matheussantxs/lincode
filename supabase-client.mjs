import {fail} from './security.mjs';
export function createSupabase({url=process.env.SUPABASE_URL,key=process.env.SUPABASE_PUBLISHABLE_KEY||process.env.SUPABASE_ANON_KEY,rateKey=process.env.SUPABASE_RATE_LIMIT_KEY,fetcher=fetch,testing=process.env.NODE_ENV==='test'}={}){
 if(!url||!key)return null;const origin=new URL(url);if(origin.username||origin.password||origin.search||origin.hash||origin.pathname!=='/'||origin.protocol!=='https:'&&!(testing&&['localhost','127.0.0.1'].includes(origin.hostname)))throw Error('SUPABASE_URL inválida. Use HTTPS.');
 if(rateKey&&!rateKey.startsWith('sb_secret_'))throw Error('O limitador exige uma chave secreta Supabase moderna (sb_secret_), somente no servidor.');
 let role;try{role=JSON.parse(Buffer.from(key.split('.')[1]||'','base64url')).role;}catch{}
 if(key.startsWith('sb_secret_')||role==='service_role')throw Error('A chave de dados deve ser publishable/anon, nunca service_role.');
 async function call(route,{method='GET',token,data,headers={},internalRate=false}={}){
  const apiKey=internalRate?rateKey:key;if(!apiKey)throw fail(503,'Rate limit compartilhado não configurado.');
  let response;try{response=await fetcher(origin.origin+route,{method,headers:{apikey:apiKey,...(token?{Authorization:'Bearer '+token}:{}),...(data!==undefined?{'Content-Type':'application/json'}:{}),...headers},body:data!==undefined?JSON.stringify(data):undefined,signal:AbortSignal.timeout(10000),redirect:'error'});}catch{throw fail(503,'Serviço temporariamente indisponível. Tente novamente.');}
  let value;try{const text=await response.text();value=text?JSON.parse(text):null;}catch{throw fail(502,'Resposta inválida do serviço.');}
  if(!response.ok){const e=fail(response.status===429?429:response.status>=500?503:400,'Não foi possível concluir a operação.');e.upstreamStatus=response.status;e.upstreamCode=value?.error_code||value?.code;if(response.status===429)e.retryAfter=Number(response.headers.get('retry-after'))||60;throw e;}return value;
 }
 const profileSelect='user_id,display_name,daily_minutes,language';
 return {
 signup:(credentials,fields)=>call('/auth/v1/signup',{method:'POST',data:{...credentials,data:fields}}),
 login:credentials=>call('/auth/v1/token?grant_type=password',{method:'POST',data:credentials}),
 refresh:token=>call('/auth/v1/token?grant_type=refresh_token',{method:'POST',data:{refresh_token:token}}),
 user:token=>call('/auth/v1/user',{token}),logout:token=>call('/auth/v1/logout?scope=local',{method:'POST',token}),
 getProfile:async(id,token)=>(await call('/rest/v1/profiles?select='+profileSelect+'&user_id=eq.'+encodeURIComponent(id),{token}))?.[0],
 createProfile:async(id,fields,token)=>(await call('/rest/v1/profiles?select='+profileSelect,{method:'POST',token,data:{user_id:id,...fields},headers:{Prefer:'return=representation'}}))?.[0],
 patchProfile:async(id,fields,token)=>(await call('/rest/v1/profiles?user_id=eq.'+encodeURIComponent(id)+'&select='+profileSelect,{method:'PATCH',token,data:fields,headers:{Prefer:'return=representation'}}))?.[0],
 getProgress:async(id,token)=>(await call('/rest/v1/learning_progress?select=data&user_id=eq.'+encodeURIComponent(id),{token}))?.[0]?.data||null,
 saveProgress:(data,token)=>call('/rest/v1/rpc/save_codeowl_progress',{method:'POST',token,data:{p_data:data}}),
 sharedLimit:rateKey?rules=>call('/rest/v1/rpc/check_codeowl_rate_limit',{method:'POST',data:{p_rules:rules},internalRate:true}):null
 };
}
