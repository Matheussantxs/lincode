begin;
create schema if not exists codeowl_private;
revoke all on schema codeowl_private from public, anon, authenticated;

create table public.profiles (
 user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
 display_name text not null check (char_length(btrim(display_name)) between 2 and 80),
 daily_minutes integer not null default 10 check (daily_minutes in (5,10,15,20)),
 language text not null default 'python' check (language in ('python','javascript','java','csharp','cpp'))
);
create table public.learning_progress (
 user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
 data jsonb not null default '{}'::jsonb check (jsonb_typeof(data)='object' and octet_length(data::text)<=1048576),
 updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.profiles force row level security;
alter table public.learning_progress enable row level security;
alter table public.learning_progress force row level security;
revoke all on public.profiles,public.learning_progress from public,anon,authenticated;
grant select,insert on public.profiles to authenticated;
grant update(display_name,daily_minutes,language) on public.profiles to authenticated;
grant select,insert on public.learning_progress to authenticated;
grant update(data,updated_at) on public.learning_progress to authenticated;
create policy profiles_read_self on public.profiles for select to authenticated using ((select auth.uid())=user_id);
create policy profiles_insert_self on public.profiles for insert to authenticated with check ((select auth.uid())=user_id);
create policy profiles_update_self on public.profiles for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy progress_read_self on public.learning_progress for select to authenticated using ((select auth.uid())=user_id);
create policy progress_insert_self on public.learning_progress for insert to authenticated with check ((select auth.uid())=user_id);
create policy progress_update_self on public.learning_progress for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);

create function public.valid_codeowl_progress(p jsonb) returns boolean language plpgsql immutable set search_path='' as $$
declare k text; v jsonb; item jsonb; n numeric;
begin
 if p is null or jsonb_typeof(p)<>'object' or octet_length(p::text)>1048576 then return false; end if;
 for k in select jsonb_object_keys(p) loop
  if not k=any(array['version','updatedAt','language','completed','activity','studySeconds','studyDays','dailyMinutes','commitment','resumes','chapters','onboarded']) then return false; end if;
 end loop;
 if exists(select 1 from jsonb_each(p) e where e.value='null'::jsonb) then return false; end if;
 if p ? 'language' and not (p->>'language')=any(array['python','javascript','java','csharp','cpp']) then return false; end if;
 if p ? 'dailyMinutes' and (jsonb_typeof(p->'dailyMinutes')<>'number' or not (p->>'dailyMinutes')=any(array['5','10','15','20'])) then return false; end if;
 if p ? 'commitment' and (jsonb_typeof(p->'commitment')<>'number' or not (p->>'commitment')=any(array['0','7','14','30','50'])) then return false; end if;
 if p ? 'version' and (jsonb_typeof(p->'version')<>'number' or not (p->>'version')=any(array['1','2'])) then return false; end if;
 if p ? 'updatedAt' and (jsonb_typeof(p->'updatedAt')<>'number' or (p->>'updatedAt')::numeric<0) then return false; end if;
 if p ? 'onboarded' and jsonb_typeof(p->'onboarded')<>'boolean' then return false; end if;
 if p ? 'completed' then
  if jsonb_typeof(p->'completed')<>'array' or jsonb_array_length(p->'completed')>5000 then return false; end if;
  for item in select jsonb_array_elements(p->'completed') loop
   if jsonb_typeof(item)<>'string' or (item#>>'{}') !~ '^(python|javascript|java|csharp|cpp):[a-zA-Z0-9:_-]{1,90}$' then return false; end if;
  end loop;
 end if;
 foreach k in array array['activity','studySeconds'] loop
  if p ? k then
   if jsonb_typeof(p->k)<>'object' or (select count(*) from jsonb_object_keys(p->k))>2000 then return false; end if;
   for v in select value from jsonb_each(p->k) loop if jsonb_typeof(v)<>'number' or v::text::numeric<0 or v::text::numeric>(case when k='studySeconds' then 86400 else 100000 end) then return false; end if; end loop;
   if exists(select 1 from jsonb_object_keys(p->k) d where d !~ '^\d{4}-\d{2}-\d{2}$') then return false; end if;
  end if;
 end loop;
 if p ? 'studyDays' then
  if jsonb_typeof(p->'studyDays')<>'array' or jsonb_array_length(p->'studyDays')>2000 then return false; end if;
  for item in select jsonb_array_elements(p->'studyDays') loop if jsonb_typeof(item)<>'string' or (item#>>'{}') !~ '^\d{4}-\d{2}-\d{2}$' then return false; end if; end loop;
 end if;
 foreach k in array array['chapters','resumes'] loop
  if p ? k then
   if jsonb_typeof(p->k)<>'object' then return false; end if;
   if exists(select 1 from jsonb_object_keys(p->k) l where not l=any(array['python','javascript','java','csharp','cpp'])) then return false; end if;
  end if;
 end loop;
 if p ? 'chapters' then
  for v in select value from jsonb_each(p->'chapters') loop
   if jsonb_typeof(v)<>'string' or (v#>>'{}') !~ '^[a-zA-Z0-9_-]{1,100}$' then return false; end if;
  end loop;
 end if;
 if p ? 'resumes' then
  for v in select value from jsonb_each(p->'resumes') loop
   if jsonb_typeof(v)<>'object' or not v ?& array['id','index','answer','checked','errors'] then return false; end if;
   if exists(select 1 from jsonb_object_keys(v) f where not f=any(array['id','index','answer','checked','errors'])) then return false; end if;
   if jsonb_typeof(v->'id')<>'string' or (v->>'id') !~ '^[a-zA-Z0-9_-]{1,100}$' or jsonb_typeof(v->'checked')<>'boolean' then return false; end if;
   foreach k in array array['index','errors'] loop
    if jsonb_typeof(v->k)<>'number' then return false; end if;
    n=(v->>k)::numeric;
    if n<>trunc(n) or n<(case when k='index' then -1 else 0 end) or n>(case when k='index' then 7 else 100000 end) then return false; end if;
   end loop;
   if jsonb_typeof(v->'answer')='array' and jsonb_array_length(v->'answer')>20 then return false; end if;
   for item in select value from jsonb_array_elements(case when jsonb_typeof(v->'answer')='array' then v->'answer' else jsonb_build_array(v->'answer') end) loop
    if not (item='null'::jsonb or jsonb_typeof(item)='string' and char_length(item#>>'{}')<=1000 or jsonb_typeof(item)='number' and (item::text)::numeric between 0 and 100 and (item::text)::numeric=trunc((item::text)::numeric)) then return false; end if;
   end loop;
  end loop;
 end if;
 return true;
exception when others then return false;
end; $$;
revoke all on function public.valid_codeowl_progress(jsonb) from public,anon;
grant execute on function public.valid_codeowl_progress(jsonb) to authenticated;
alter table public.learning_progress add constraint valid_progress check(public.valid_codeowl_progress(data));

-- Invoker privileges preserve RLS. No user_id is accepted from the caller.
create function public.save_codeowl_progress(p_data jsonb) returns void language plpgsql security invoker set search_path='' as $$
declare owner_id uuid := auth.uid(); previous jsonb; merged jsonb := p_data; field text; combined jsonb;
begin
 if owner_id is null then raise exception 'authentication required' using errcode='42501'; end if;
 if not public.valid_codeowl_progress(p_data) then raise exception 'invalid progress' using errcode='22023'; end if;
 insert into public.learning_progress(user_id,data) values(owner_id,'{}') on conflict(user_id) do nothing;
 select data into previous from public.learning_progress where user_id=owner_id for update;
 foreach field in array array['completed','studyDays'] loop
  select coalesce(jsonb_agg(v order by v),'[]'::jsonb) into combined from (select distinct value v from jsonb_array_elements(coalesce(previous->field,'[]')||coalesce(p_data->field,'[]'))) entries;
  merged=jsonb_set(merged,array[field],combined);
 end loop;
 foreach field in array array['activity','studySeconds'] loop
  select coalesce(jsonb_object_agg(k,v),'{}'::jsonb) into combined from (select key k,max(value::text::numeric) v from (select * from jsonb_each(coalesce(previous->field,'{}')) union all select * from jsonb_each(coalesce(p_data->field,'{}'))) x group by key) y;
  merged=jsonb_set(merged,array[field],combined);
 end loop;
 if coalesce((previous->>'updatedAt')::numeric,0)>coalesce((p_data->>'updatedAt')::numeric,0) then
  foreach field in array array['updatedAt','language','dailyMinutes','commitment','resumes','chapters','onboarded'] loop if previous ? field then merged=jsonb_set(merged,array[field],previous->field); end if; end loop;
 end if;
 update public.learning_progress set data=merged,updated_at=now() where user_id=owner_id;
end; $$;
revoke all on function public.save_codeowl_progress(jsonb) from public,anon;
grant execute on function public.save_codeowl_progress(jsonb) to authenticated;

-- Shared limiter for serverless instances. Its administrative key is NEVER used for user data.
create table codeowl_private.rate_limits(key text primary key, hits integer not null, expires_at timestamptz not null);
create index rate_limits_expiration on codeowl_private.rate_limits(expires_at);
alter table codeowl_private.rate_limits enable row level security;
alter table codeowl_private.rate_limits force row level security;
revoke all on codeowl_private.rate_limits from public,anon,authenticated;
create function public.check_codeowl_rate_limit(p_rules jsonb) returns jsonb language plpgsql security definer set search_path='' as $$
declare rule jsonb; k text; maximum integer; seconds integer; count_now integer; expiry timestamptz;
begin
 if jsonb_typeof(p_rules)<>'array' or jsonb_array_length(p_rules) not between 1 and 4 then raise exception 'invalid limits'; end if;
 delete from codeowl_private.rate_limits where expires_at<=now();
 if (select count(*) from codeowl_private.rate_limits)>50000 then return jsonb_build_object('allowed',false,'retry_after',60); end if;
 for rule in select jsonb_array_elements(p_rules) loop
  k=rule->>'key';maximum=(rule->>'limit')::integer;seconds=(rule->>'seconds')::integer;
  if k !~ '^[0-9a-f]{64}$' or maximum not between 1 and 1000 or seconds not between 1 and 86400 then raise exception 'invalid limits'; end if;
  insert into codeowl_private.rate_limits(key,hits,expires_at) values(k,1,now()+make_interval(secs=>seconds)) on conflict(key) do update set hits=codeowl_private.rate_limits.hits+1 returning hits,expires_at into count_now,expiry;
  if count_now>maximum then return jsonb_build_object('allowed',false,'retry_after',greatest(1,ceil(extract(epoch from expiry-now())))); end if;
 end loop;
 return jsonb_build_object('allowed',true,'retry_after',0);
end; $$;
revoke all on function public.check_codeowl_rate_limit(jsonb) from public,anon,authenticated;
grant execute on function public.check_codeowl_rate_limit(jsonb) to service_role;
commit;

