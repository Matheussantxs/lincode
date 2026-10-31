-- Execute on a disposable development Supabase project after the migration.
-- Uses two synthetic users and rolls back every change. A successful run ends in ROLLBACK.
begin;
insert into auth.users(id,email) values
 ('0d45a453-8a12-4cbf-91a2-b1dd0151b901','rls-a@example.invalid'),
 ('0d45a453-8a12-4cbf-91a2-b1dd0151b902','rls-b@example.invalid');
insert into public.profiles(user_id,display_name) values
 ('0d45a453-8a12-4cbf-91a2-b1dd0151b901','Teste A'),
 ('0d45a453-8a12-4cbf-91a2-b1dd0151b902','Teste B');
insert into public.learning_progress(user_id,data) values('0d45a453-8a12-4cbf-91a2-b1dd0151b902','{"language":"java"}');
set local role authenticated;
select set_config('request.jwt.claim.sub','0d45a453-8a12-4cbf-91a2-b1dd0151b901',true);
select set_config('request.jwt.claims','{"sub":"0d45a453-8a12-4cbf-91a2-b1dd0151b901","role":"authenticated"}',true);
do $$
declare n integer;
begin
 select count(*) into n from public.profiles;if n<>1 then raise exception 'RLS FAIL: foreign profile readable';end if;
 update public.profiles set display_name='Ataque' where user_id='0d45a453-8a12-4cbf-91a2-b1dd0151b902';get diagnostics n=row_count;if n<>0 then raise exception 'RLS FAIL: foreign profile writable';end if;
 begin insert into public.learning_progress(user_id,data) values('0d45a453-8a12-4cbf-91a2-b1dd0151b902','{}');raise exception 'RLS FAIL: foreign insert allowed';exception when insufficient_privilege then null;end;
 begin update public.profiles set user_id='0d45a453-8a12-4cbf-91a2-b1dd0151b902' where user_id=auth.uid();raise exception 'RLS FAIL: owner reassignment allowed';exception when insufficient_privilege then null;end;
 begin perform public.check_codeowl_rate_limit('[]');raise exception 'RLS FAIL: authenticated can invoke internal limiter';exception when insufficient_privilege then null;end;
 perform public.save_codeowl_progress('{"completed":["python:introducao"],"studySeconds":{"2026-10-31":20}}');
 perform public.save_codeowl_progress('{"completed":[],"studySeconds":{"2026-10-31":5}}');
 if (select data->'completed' from public.learning_progress where user_id=auth.uid())<>'["python:introducao"]'::jsonb then raise exception 'MERGE FAIL: completion lost';end if;
 if (select data->'studySeconds'->>'2026-10-31' from public.learning_progress where user_id=auth.uid())<>'20' then raise exception 'MERGE FAIL: time decreased';end if;
end;$$;
select set_config('request.jwt.claim.sub','0d45a453-8a12-4cbf-91a2-b1dd0151b902',true);
select set_config('request.jwt.claims','{"sub":"0d45a453-8a12-4cbf-91a2-b1dd0151b902","role":"authenticated"}',true);
do $$begin
 if (select data from public.learning_progress where user_id=auth.uid())<>'{"language":"java"}'::jsonb then raise exception 'RLS FAIL: user B changed';end if;
 if (select count(*) from public.learning_progress)<>1 then raise exception 'RLS FAIL: B sees A';end if;
end;$$;
set local role anon;
do $$begin
 begin perform 1 from public.profiles;raise exception 'RLS FAIL: anonymous profile access';exception when insufficient_privilege then null;end;
 begin perform public.save_codeowl_progress('{}');raise exception 'RLS FAIL: anonymous progress write';exception when insufficient_privilege then null;end;
 begin perform public.check_codeowl_rate_limit('[]');raise exception 'RLS FAIL: anonymous limiter access';exception when insufficient_privilege then null;end;
end;$$;
rollback;
