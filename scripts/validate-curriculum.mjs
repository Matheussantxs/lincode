import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url),context=vm.createContext({window:{}});
for(const f of ['curriculum.js','python-chapters.js','intro.js','content/javascript.js','content/java.js','content/csharp.js','content/cpp.js','content/python-fluxos.js','content/python-logica-a.js','content/python-logica-b.js','content/python-logica-extra.js','content/python-fundamentos-a.js','content/python-fundamentos-b.js','content/python-fundamentos-c.js','content/python-poo-a.js','content/javascript-c01-a.js','content/java-c01-a.js','content/csharp-c01-a.js','content/cpp-c01-a.js','content/python-poo-b.js','content/javascript-c01-b.js','content/java-c01-b.js','content/csharp-c01-b.js','content/cpp-c01-b.js','content/extra-javascript.js','content/extra-java.js','content/extra-csharp.js','content/extra-cpp.js','content/extra-python-1.js','content/extra-python-2.js','catalog.js'])vm.runInContext(await fs.readFile(new URL(f,root),'utf8'),context,{filename:f});
const courses=JSON.parse(vm.runInContext('JSON.stringify(LANGUAGES.map(l=>({id:l.id,chapters:courseChapters(l)})))',context));
let chapters=0,lessons=0,activities=0;const missing=[],ids=new Set(),activityIds=new Set();
for(const course of courses){assert.equal(course.chapters.length,course.id==='python'?11:16);for(const [i,ch]of course.chapters.entries()){
 chapters++;assert.equal(ch.units.length,8);assert.equal(ch.targetLessonCount,40);
 assert.deepEqual(ch.prerequisites,i?[course.chapters[i-1].id]:[]);
 for(const u of ch.units){assert.ok(u.lessons.length<=5,`${u.id}: more than five lessons`);for(const l of u.lessons){
   lessons++;const id=`${course.id}:${l.id}`;assert.ok(!ids.has(id),'Duplicate '+id);ids.add(id);assert.ok(l.theory&&l.title);
   if(l.questions.length!==8)missing.push(`${id}: ${l.questions.length}/8 activities`);
   for(const q of l.questions){activities++;assert.ok(q.id&&q.prompt&&q.explanation);assert.ok(!activityIds.has(q.id),'Duplicate activity '+q.id);activityIds.add(q.id);assert.ok(['text','gap','order','pairs','choice'].includes(q.type));
    if(q.type==='choice')assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length,q.id);
    if(q.type==='order')assert.deepEqual([...q.answer].sort((a,b)=>a-b),q.options.map((_,j)=>j),q.id);
    if(q.type==='pairs')assert.ok(q.pairs.length>=2&&q.pairs.every(p=>p.length===2&&p.every(Boolean)),q.id);
    if(['gap','text'].includes(q.type))assert.ok(q.accepted.length&&q.accepted.every(x=>typeof x==='string'),q.id);
   }
 }}
 if(ch.lessons.length!==40)missing.push(`${course.id}/${ch.id}: ${ch.lessons.length}/40 lessons`);
}}
assert.equal(chapters,75);
const report={chapters,lessons,activities,target:{chapters:75,lessons:3000,activities:24000},structuralValidation:'pass',complete:missing.length===0,reviewStatus:'pending',missing};
await fs.writeFile(new URL('docs/curriculum-status.json',root),JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,missing:missing.length},null,2));
if(process.argv.includes('--complete')&&!report.complete)process.exitCode=1;
