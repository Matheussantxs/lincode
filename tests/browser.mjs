import { chromium } from '../tools/9router/node_modules/playwright-core/index.mjs';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {tmpdir} from 'node:os';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('..',import.meta.url)), out=path.join(root,'docs/qa');await fs.mkdir(out,{recursive:true});
const data=await fs.mkdtemp(path.join(tmpdir(),'lincode-qa-'));
const server=spawn(process.execPath,[path.join(root,'tests/browser-server.mjs')],{env:{...process.env,PORT:'0',LINCODE_DATA_DIR:data},windowsHide:true,stdio:['ignore','pipe','pipe']});
const base=await new Promise((resolve,reject)=>{let log='';const timer=setTimeout(()=>reject(Error('Startup timeout '+log)),20000);server.stdout.on('data',b=>{log+=b;const m=log.match(/http:\/\/127\.0\.0\.1:\d+/);if(m){clearTimeout(timer);resolve(m[0]);}});server.on('error',reject);server.stderr.on('data',b=>log+=b);});
let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});const errors=[],skipped=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.getByRole('heading',{name:'Qual é o seu ritmo?'}).waitFor();
 await page.locator('input[name=dailyMinutes][value="5"]').check();await page.getByRole('button',{name:'Começar como visitante'}).click();
 await page.getByRole('heading',{name:'Um pouco de código, todos os dias.'}).waitFor();
 assert.equal(await page.evaluate(()=>state.dailyMinutes),5);
 await page.screenshot({path:path.join(out,'desktop-trilha.png')});
 await page.getByRole('link',{name:/Ver capítulos/}).click();assert.equal(await page.locator('.chapter-card').count(),11);
 await page.locator('[data-chapter]').first().click();
 await page.locator('.lesson-node.current').click();await page.getByRole('button',{name:/Vamos praticar/}).click();
 await page.locator('[data-answer="1"]').click();await page.getByRole('button',{name:'Verificar',exact:true}).click();await page.getByText('Vamos tentar de novo.',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Tentar de novo',exact:true}).click();await page.locator('[data-answer="0"]').click();await page.getByRole('button',{name:'Verificar',exact:true}).click();await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.locator('#written-answer').fill('Py');await page.reload();await page.locator('#written-answer').waitFor();assert.equal(await page.locator('#written-answer').inputValue(),'Py');
 await page.locator('#written-answer').fill('python');await page.screenshot({path:path.join(out,'desktop-aula.png')});
 await page.locator('#written-answer').press('Enter');await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.getByRole('heading',{name:'Lição concluída!',exact:true}).waitFor();
 assert.equal(await page.evaluate(()=>state.completed.length),1);assert.equal(await page.evaluate(()=>state.activity[dateKey()]),20);
 await page.getByRole('button',{name:'Voltar à trilha'}).click();
 await page.locator('.lesson-node.done').first().click();await page.getByRole('button',{name:/Vamos praticar/}).click();
 await page.locator('[data-answer="0"]').click();await page.getByRole('button',{name:'Verificar',exact:true}).click();await page.getByRole('button',{name:'Continuar',exact:true}).click();await page.locator('#written-answer').fill('Python');await page.locator('#written-answer').press('Enter');await page.getByRole('button',{name:'Continuar',exact:true}).click();
 assert.equal(await page.evaluate(()=>state.activity[dateKey()]),20);await page.getByRole('button',{name:'Voltar à trilha'}).click();
 await page.getByRole('button',{name:'Criar conta',exact:true}).click();
 await page.locator('#account-form [name=name]').fill('Pessoa QA');await page.locator('#account-form [name=email]').fill('qa@example.test');await page.locator('#account-form [name=password]').fill('local-test-password');await page.getByRole('button',{name:'Criar conta e salvar progresso',exact:true}).click();await page.waitForFunction(()=>user?.email==='qa@example.test'&&!document.querySelector('#account-dialog').open);
 assert.equal(await page.evaluate(()=>state.completed.length),1);await page.reload();await page.waitForFunction(()=>ready);assert.equal(await page.evaluate(()=>state.completed.length),1);
 await page.locator('[data-nav=perfil]').click();await page.locator('[name=dailyMinutes][value="20"]').check();await page.locator('[name=commitment]').selectOption('7');await page.getByRole('button',{name:'Salvar preferências'}).click();await page.getByText('Preferências atualizadas.',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Sair da conta'}).click();await page.waitForFunction(()=>user===null);assert.equal(await page.evaluate(()=>state.completed.length),0);
 await page.getByRole('button',{name:'Entrar',exact:true}).click();await page.locator('#account-form [name=email]').fill('qa@example.test');await page.locator('#account-form [name=password]').fill('local-test-password');await page.locator('#account-form [type=submit]').click();await page.waitForFunction(()=>user?.email==='qa@example.test'&&!document.querySelector('#account-dialog').open);assert.equal(await page.evaluate(()=>state.dailyMinutes),20);assert.equal(await page.evaluate(()=>state.commitment),7);
 await page.locator('#course-switch').click();await page.locator('[data-language=csharp]').click();await page.getByRole('link',{name:/Ver capítulos/}).click();assert.equal(await page.locator('.chapter-card').count(),16);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'mobile-capitulos.png')});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.locator('[data-chapter]').first().click();await page.locator('.lesson-node.current').click();await page.getByRole('button',{name:/Vamos praticar/}).click();
 for(let step=0;step<8;step++){
  const q=await page.evaluate(()=>session.lesson.questions[session.index]);
  if(q.type==='choice')await page.locator(`[data-answer="${q.answer}"]`).click();
  else if(q.type==='text'||q.type==='gap')await page.locator('#written-answer').fill(q.accepted[0]);
  else if(q.type==='order')for(const i of q.answer)await page.locator(`[data-block="${i}"]`).click();
  else if(q.type==='pairs'){for(let i=0;i<q.pairs.length;i++)await page.locator(`[data-pair="${i}"]`).selectOption(String(i));await page.screenshot({path:path.join(out,'mobile-pares.png')});}
  await page.getByRole('button',{name:'Verificar',exact:true}).click();await page.getByText('Isso mesmo!',{exact:true}).waitFor();await page.getByRole('button',{name:'Continuar',exact:true}).click();
 }
 await page.getByRole('heading',{name:'Lição concluída!',exact:true}).waitFor();assert.equal(await page.evaluate(()=>state.completed.filter(x=>x.startsWith('csharp:')).length),1);
 await page.getByRole('button',{name:'Voltar à trilha'}).click();await page.screenshot({path:path.join(out,'mobile-trilha.png')});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle!=='none'));

 // Rendered content-state checks in a separate visitor context.
 const context2=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 const guest=await context2.newPage();let release;const gate=new Promise(r=>release=r);
 await guest.route('**/api/me',async route=>{await gate;await route.continue();});
 await guest.goto(base,{waitUntil:'domcontentloaded'});
 await guest.getByText('Carregando seu espaço de estudo…',{exact:true}).waitFor();
 await guest.screenshot({path:path.join(out,'desktop-loading.png')});release();
 await guest.getByRole('button',{name:'Começar como visitante'}).click();
 await guest.locator('[data-nav=praticar]').click();await guest.getByRole('heading',{name:'Sua primeira revisão começa com uma aula.'}).waitFor();
 await guest.screenshot({path:path.join(out,'desktop-empty.png')});
 await guest.locator('[data-nav=perfil]').click();await guest.getByRole('button',{name:'Entrar',exact:true}).click();
 await guest.locator('#account-form [name=email]').fill('missing@example.test');await guest.locator('#account-form [name=password]').fill('wrong-test-password');await guest.locator('#account-form [type=submit]').click();
 await guest.getByText('E-mail ou senha incorretos, ou e-mail ainda não confirmado.',{exact:true}).waitFor();
 await guest.screenshot({path:path.join(out,'desktop-auth-error.png')});
 await guest.locator('#account-content [data-close-account]').first().click();
 await guest.screenshot({path:path.join(out,'desktop-visitor.png')});
 // Load a later lesson using a completed-prerequisite fixture, then inspect its actual diagram and keyboard controls.
 await guest.evaluate(()=>{state.completed=chapters()[0].lessons.slice(0,9).map(l=>'python:'+l.id);state.onboarded=true;save();location.hash='aula/python/py-fluxo-estoque';});
 await guest.getByRole('button',{name:/Vamos praticar/}).click();await guest.getByText('estoque ≥ pedido?',{exact:true}).waitFor();
 await guest.setViewportSize({width:390,height:844});await guest.screenshot({path:path.join(out,'mobile-fluxograma.png')});
 assert.ok(await guest.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const before=await guest.evaluate(()=>state.studySeconds[dateKey()]||0);await guest.bringToFront();await guest.locator('.lesson-body h1').click();await guest.waitForTimeout(5500);
 const after=await guest.evaluate(()=>state.studySeconds[dateKey()]||0);assert.ok(after>before&&after-before<=10,'active study records seconds');
 const hidden=await context2.newPage();await hidden.goto('about:blank');await hidden.bringToFront();
 const blurred=await guest.waitForFunction(()=>!document.hasFocus(),null,{timeout:2000}).then(()=>true,()=>false);
 if(blurred){const pauseStart=await guest.evaluate(()=>state.studySeconds[dateKey()]||0);await hidden.waitForTimeout(5500);const paused=await guest.evaluate(()=>state.studySeconds[dateKey()]||0);assert.ok(paused-pauseStart<0.1,'unfocused lessons do not continuously record time');}
 else skipped.push('Headless Chrome did not transfer document focus; background time pause requires manual verification.');
 await hidden.close();await guest.bringToFront();
 assert.equal(await guest.locator('#main .button.primary').evaluate(el=>getComputedStyle(el).transitionDuration),'0s');
 await context2.close();
 assert.deepEqual(errors,[]);
 await fs.writeFile(path.join(out,'browser-results.json'),JSON.stringify({status:'pass',checkedAt:new Date().toISOString(),provider:'simulated',viewports:['1440x900','390x844'],checks:['onboarding','chapter counts','wrong answer retry','typed response','reload resume','no duplicate XP','guest transfer','logout isolation','login restore','preferences','language isolation','eight activities','pairs','order','responsive overflow','keyboard focus','reduced motion','loading state','empty state','login error','visitor boundary','custom flowchart','active time'],skipped,errors},null,2));
 console.log('Browser QA passed:',out);
}catch(error){await fs.writeFile(path.join(out,'browser-results.json'),JSON.stringify({status:'fail',checkedAt:new Date().toISOString(),error:error.message},null,2));throw error;}finally{await browser?.close();server.kill();}

