import {createHandler} from '../http-handler.mjs';
let handler;
export default async function(req,res){try{handler??=createHandler();await handler(req,res);}catch{res.writeHead(503,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({error:'Configuração de produção incompleta.'}));}}
