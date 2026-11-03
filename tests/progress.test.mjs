import test from 'node:test';
import assert from 'node:assert/strict';
import '../progress.js';
const C=globalThis.LincodeCore;
test('stable completions, independent languages and idempotent rewards',()=>{
 const s=C.clean({completed:['python:old-lesson','python:old-lesson']});
 assert.deepEqual(s.completed,['python:old-lesson']);
 assert.equal(C.finish(s,'python','first','2026-10-30'),20);
 assert.equal(C.finish(s,'python','first','2026-10-31'),0);
 assert.equal(C.finish(s,'java','first','2026-10-30'),20);
 assert.equal(s.activity['2026-10-30'],40);assert.equal(s.activity['2026-10-31'],undefined);
 assert.equal(s.studySeconds['2026-10-30'],undefined,'XP must not create study time');
});
test('guest migration and cache reconciliation do not duplicate progress',()=>{
 const guest=C.clean({completed:['python:a'],studySeconds:{'2026-10-30':90},activity:{'2026-10-30':20},resumes:{python:{id:'b',index:3}}});
 const account=C.clean({completed:['java:a'],studySeconds:{'2026-10-30':30}});
 const merged=C.merge(account,guest);assert.equal(merged.completed.length,2);assert.equal(merged.studySeconds['2026-10-30'],90);assert.equal(merged.resumes.python.index,3);
 assert.deepEqual(C.merge(merged,merged),merged);
});
test('grading covers text, gaps, ordering, pairs and choices',()=>{
 assert.equal(C.correct({type:'text',accepted:['print']},' print '),true);
 assert.equal(C.correct({type:'text',accepted:['print']},'Print'),false);
 assert.equal(C.correct({type:'gap',accepted:['Python'],caseSensitive:false},'PYTHON'),true);
 assert.equal(C.correct({type:'choice',answer:0},null),false);
 assert.equal(C.correct({type:'order',answer:[2,0,1]},[2,0,1]),true);
 assert.equal(C.correct({type:'order',answer:[2,0,1]},[2,0]),false);
 assert.equal(C.correct({type:'pairs',pairs:[['a','A'],['b','B']]},[0,1]),true);
 assert.equal(C.correct({type:'pairs',pairs:[['a','A'],['b','B']]},[0,0]),false);
});
test('an older server response cannot replace an unsynced lesson answer',()=>{
 const local=C.clean({updatedAt:20,resumes:{python:{id:'a',index:2,answer:'rascunho'}}});
 const remote=C.clean({updatedAt:10,resumes:{python:{id:'a',index:1,answer:null}}});
 assert.equal(C.merge(local,remote).resumes.python.answer,'rascunho');
 const finished=C.clean({updatedAt:30,resumes:{},completed:['python:a']});
 assert.deepEqual(C.merge(local,finished).resumes,{});
});
test('energy state cleans safely, clamps lives between 0 and 10 and merges latest updatedAt',()=>{
 const c=C.clean({energy:{lives:7,updatedAt:50}});
 assert.equal(c.energy.lives,7);
 assert.equal(c.energy.updatedAt,50);
 const invalid=C.clean({energy:{lives:99,updatedAt:-1}});
 assert.equal(invalid.energy.lives,10);
 const newer=C.clean({updatedAt:100,energy:{lives:4,updatedAt:100}});
 const older=C.clean({updatedAt:50,energy:{lives:8,updatedAt:50}});
 assert.equal(C.merge(newer,older).energy.lives,4);
 assert.equal(C.merge(older,newer).energy.lives,4);
});
