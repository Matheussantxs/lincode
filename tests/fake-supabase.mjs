import {randomUUID,randomBytes} from 'node:crypto';
export function fakeSupabase(){
 const users=new Map(),tokens=new Map(),profiles=new Map(),saved=new Map();
 const denied=()=>{throw Object.assign(new Error('Unauthorized'),{status:400,upstreamStatus:401});};
 const who=t=>tokens.get(t)||denied();
 const issue=u=>{const access_token=randomBytes(16).toString('hex');tokens.set(access_token,u);return {access_token,refresh_token:access_token,expires_in:3600,user:u};};
 return {users,profiles,saved,
 signup:async(c,m)=>{if([...users.values()].some(u=>u.email===c.email))throw Object.assign(Error('duplicate'),{status:400});const u={id:randomUUID(),email:c.email,password:c.password,user_metadata:m};users.set(u.id,u);return c.email.startsWith('confirm')?{user:u}:issue(u);},
 login:async c=>{const u=[...users.values()].find(u=>u.email===c.email&&u.password===c.password);if(!u)return denied();return issue(u);},
 user:async t=>{const u=who(t);return {id:u.id,email:u.email,user_metadata:u.user_metadata};},refresh:async t=>issue(who(t)),logout:async t=>{tokens.delete(t);},
 getProfile:async(id,t)=>who(t).id===id?profiles.get(id):undefined,
 createProfile:async(id,p,t)=>{if(who(t).id!==id)return denied();const value={user_id:id,...p};profiles.set(id,value);return value;},
 patchProfile:async(id,p,t)=>{if(who(t).id!==id)return denied();const value={...profiles.get(id),...p};profiles.set(id,value);return value;},
 getProgress:async(id,t)=>who(t).id===id?saved.get(id)||null:null,
 saveProgress:async(p,t)=>{const id=who(t).id,old=saved.get(id)||{};saved.set(id,{...p,completed:[...new Set([...(old.completed||[]),...(p.completed||[])])]});},sharedLimit:null
 };
}
