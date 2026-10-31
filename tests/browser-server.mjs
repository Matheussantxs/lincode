import http from 'node:http';
import {randomBytes} from 'node:crypto';
import {createHandler} from '../http-handler.mjs';
import {fakeSupabase} from './fake-supabase.mjs';
const server=http.createServer(createHandler({client:fakeSupabase(),env:{NODE_ENV:'test',LINCODE_SESSION_SECRET:randomBytes(32).toString('base64')}}));server.listen(0,'127.0.0.1',()=>console.log('Lincode: http://127.0.0.1:'+server.address().port));
