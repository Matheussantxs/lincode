'use strict';
globalThis.LincodeCore = (() => {
  const languages = ['python','javascript','java','csharp','cpp'];
  const dayPattern = /^\d{4}-\d{2}-\d{2}$/;
  const dayMap = value => Object.fromEntries(Object.entries(value || {}).filter(([k,v]) => dayPattern.test(k) && Number.isFinite(v) && v >= 0));
  function clean(raw = {}) {
    const energy = (raw.energy && Number.isInteger(raw.energy.lives) && raw.energy.lives >= 0 && raw.energy.lives <= 10)
      ? { lives: raw.energy.lives, updatedAt: Number.isFinite(raw.energy.updatedAt) && raw.energy.updatedAt >= 0 ? raw.energy.updatedAt : 0 }
      : { lives: 10, updatedAt: 0 };
    return {version:2, updatedAt:Number.isFinite(raw.updatedAt)?raw.updatedAt:0, language:languages.includes(raw.language)?raw.language:'python',
      completed:[...new Set((Array.isArray(raw.completed)?raw.completed:[]).filter(x=>typeof x==='string' && x.length<=100))],
      activity:dayMap(raw.activity), studySeconds:dayMap(raw.studySeconds),
      studyDays:[...new Set((Array.isArray(raw.studyDays)?raw.studyDays:[]).filter(x=>dayPattern.test(x)))],
      dailyMinutes:[5,10,15,20].includes(raw.dailyMinutes)?raw.dailyMinutes:10,
      commitment:[0,7,14,30,50].includes(raw.commitment)?raw.commitment:0,
      resumes:raw.resumes && typeof raw.resumes==='object' && !Array.isArray(raw.resumes)?raw.resumes:{},
      chapters:raw.chapters && typeof raw.chapters==='object' && !Array.isArray(raw.chapters)?raw.chapters:{},
      onboarded:raw.onboarded===true,
      energy};
  }
  function merge(left, right) {
    const a=clean(left), b=clean(right), latest=a.updatedAt>b.updatedAt?a:b;
    const maxima=(x,y)=>Object.fromEntries([...new Set([...Object.keys(x),...Object.keys(y)])].map(k=>[k,Math.max(x[k]||0,y[k]||0)]));
    return clean({...latest,completed:[...a.completed,...b.completed],studyDays:[...a.studyDays,...b.studyDays],activity:maxima(a.activity,b.activity),studySeconds:maxima(a.studySeconds,b.studySeconds)});
  }
  function finish(progress, language, id, date) {
    const key=`${language}:${id}`;
    if(progress.completed.includes(key))return 0;
    progress.completed.push(key);progress.activity[date]=(progress.activity[date]||0)+20;
    if(!progress.studyDays.includes(date))progress.studyDays.push(date);
    return 20;
  }
  function correct(question, answer) {
    if(question.type==='choice')return Number.isInteger(answer) && answer===question.answer;
    if(question.type==='order')return Array.isArray(answer) && JSON.stringify(answer)===JSON.stringify(question.answer);
    if(question.type==='pairs')return Array.isArray(answer) && answer.length===question.pairs.length && answer.every((v,i)=>v===i);
    const normalize=v=>{const s=String(v??'').normalize('NFC').trim();return question.caseSensitive===false?s.toLocaleLowerCase('pt-BR'):s;};
    return (question.accepted||[]).some(v=>normalize(v)===normalize(answer));
  }
  return {clean,merge,finish,correct,languages};
})();
