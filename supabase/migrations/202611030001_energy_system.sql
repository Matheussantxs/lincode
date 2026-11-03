-- Migration: 202611030001_energy_system.sql
-- Description: Suporte a persistencia e sincronizacao de energia (vidas/baterias) no Supabase.

begin;

-- 1. Atualizar a função de validação de progresso para aceitar o campo 'energy'
create or replace function public.valid_codeowl_progress(p jsonb) returns boolean language plpgsql immutable set search_path='' as $$
declare k text; v jsonb; item jsonb; n numeric;
begin
 if p is null or jsonb_typeof(p)<>'object' or octet_length(p::text)>1048576 then return false; end if;
 for k in select jsonb_object_keys(p) loop
  if not k=any(array['version','updatedAt','language','completed','activity','studySeconds','studyDays','dailyMinutes','commitment','resumes','chapters','onboarded','energy']) then return false; end if;
 end loop;
 if exists(select 1 from jsonb_each(p) e where e.value='null'::jsonb) then return false; end if;
 if p ? 'language' and not (p->>'language')=any(array['python','javascript','java','csharp','cpp']) then return false; end if;
 if p ? 'dailyMinutes' and (jsonb_typeof(p->'dailyMinutes')<>'number' or not (p->>'dailyMinutes')=any(array['5','10','15','20'])) then return false; end if;
 if p ? 'commitment' and (jsonb_typeof(p->'commitment')<>'number' or not (p->>'commitment')=any(array['0','7','14','30','50'])) then return false; end if;
 if p ? 'version' and (jsonb_typeof(p->'version')<>'number' or not (p->>'version')=any(array['1','2'])) then return false; end if;
 if p ? 'updatedAt' and (jsonb_typeof(p->'updatedAt')<>'number' or (p->>'updatedAt')::numeric<0) then return false; end if;
 if p ? 'onboarded' and jsonb_typeof(p->'onboarded')<>'boolean' then return false; end if;

 -- Validação estrita do campo de energia: { lives: 0..10, updatedAt: >= 0 }
 if p ? 'energy' then
  if jsonb_typeof(p->'energy')<>'object' then return false; end if;
  for k in select jsonb_object_keys(p->'energy') loop
   if not k=any(array['lives','updatedAt']) then return false; end if;
  end loop;
  if jsonb_typeof(p->'energy'->'lives')<>'number' or (p->'energy'->>'lives')::numeric not between 0 and 10 then return false; end if;
  if jsonb_typeof(p->'energy'->'updatedAt')<>'number' or (p->'energy'->>'updatedAt')::numeric < 0 then return false; end if;
 end if;

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
  for item in select jsonb_array_elements(p->'studyDays') loop
   if jsonb_typeof(item)<>'string' or (item#>>'{}') !~ '^\d{4}-\d{2}-\d{2}$' then return false; end if;
  end loop;
 end if;
 if p ? 'chapters' then
  if jsonb_typeof(p->'chapters')<>'object' then return false; end if;
  for k in select jsonb_object_keys(p->'chapters') loop
   if not k=any(array['python','javascript','java','csharp','cpp']) then return false; end if;
   if jsonb_typeof(p->'chapters'->k)<>'string' or (p->'chapters'->>k) !~ '^[a-zA-Z0-9_-]{1,100}$' then return false; end if;
  end loop;
 end if;
 if p ? 'resumes' then
  if jsonb_typeof(p->'resumes')<>'object' then return false; end if;
  for k in select jsonb_object_keys(p->'resumes') loop
   if not k=any(array['python','javascript','java','csharp','cpp']) then return false; end if;
   v := p->'resumes'->k;
   if jsonb_typeof(v)<>'object' then return false; end if;
   for item in select jsonb_object_keys(v) loop
    if not item=any(array['id','index','answer','checked','errors']) then return false; end if;
   end loop;
   if jsonb_typeof(v->'id')<>'string' or (v->>'id') !~ '^[a-zA-Z0-9_-]{1,100}$' then return false; end if;
   if jsonb_typeof(v->'index')<>'number' or (v->>'index')::numeric not between -1 and 7 then return false; end if;
   if jsonb_typeof(v->'checked')<>'boolean' then return false; end if;
   if jsonb_typeof(v->'errors')<>'number' or (v->>'errors')::numeric<0 or (v->>'errors')::numeric>100000 then return false; end if;
  end loop;
 end if;
 return true;
exception when others then return false;
end; $$;

revoke all on function public.valid_codeowl_progress(jsonb) from public,anon;
grant execute on function public.valid_codeowl_progress(jsonb) to authenticated;

-- 2. Atualizar a função save_codeowl_progress para preservar o estado de 'energy' mais recente
create or replace function public.save_codeowl_progress(p_data jsonb) returns void language plpgsql security invoker set search_path='' as $$
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
  foreach field in array array['updatedAt','language','dailyMinutes','commitment','resumes','chapters','onboarded','energy'] loop if previous ? field then merged=jsonb_set(merged,array[field],previous->field); end if; end loop;
 end if;
 update public.learning_progress set data=merged,updated_at=now() where user_id=owner_id;
end; $$;

revoke all on function public.save_codeowl_progress(jsonb) from public,anon;
grant execute on function public.save_codeowl_progress(jsonb) to authenticated;

commit;
