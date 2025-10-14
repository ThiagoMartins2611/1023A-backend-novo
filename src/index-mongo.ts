import 'dotenv/config'
import express, { Response, Request } from 'express';
import rotas from './rotas/rotasAutenticadas.js';
import Auth from './middlewares/auth.js';
import rotasNaoAutenticadas from './rotas/rotasNaoAutenticadas.js';
import rotasAutenticadas from './rotas/rotasAutenticadas.js';

const app = express();
app.use(express.json());

app.use(rotasNaoAutenticadas);
app.use(Auth.userAuth);
app.use(rotasAutenticadas);



app.listen(8000,()=>{
    console.log("SERVER RUNNING IN THE PORT 8000");
})
