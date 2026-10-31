import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
const files=[...new Set(execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{encoding:'utf8'}).split('\0').filter(Boolean))];
const patterns=[/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/sb_secret_[A-Za-z0-9_-]{24,}/,/sk-(?:or-v1-)?[A-Za-z0-9_-]{32,}/,/(?:ghp_|github_pat_)[A-Za-z0-9_]{30,}/,/postgres(?:ql)?:\/\/[^\s:]+:[^\s@]+@/];
const bad=[];
for(const file of files){if(/(?:^|\/)(?:\.data|\.local|node_modules)(?:\/|$)/.test(file)||/(?:^|\/)\.env(?:$|\.)/.test(file)&&!file.endsWith('.env.example'))bad.push(file);if(/\.(png|jpg|woff2?)$/.test(file))continue;const text=readFileSync(file,'utf8');if(patterns.some(p=>p.test(text)))bad.push(file);}
if(bad.length){console.error('Revisar possíveis segredos (valores omitidos):', [...new Set(bad)]);process.exitCode=1;}else console.log(`Verificados ${files.length} arquivos: nenhum padrão conhecido de segredo encontrado. Isso não substitui revisão ou scanner especializado.`);
