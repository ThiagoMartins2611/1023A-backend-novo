import 'dotenv/config'
import express, { Response, Request } from 'express';
import Auth from './middlewares/auth.js';
import rotasNaoAutenticadas from './rotas/rotasNaoAutenticadas.js';
import rotasAutenticadas from './rotas/rotasAutenticadas.js';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());


app.use(rotasNaoAutenticadas);
app.use(Auth.userAuth);
app.use(rotasAutenticadas);




app.listen(8000,()=>{
    console.log("SERVER RUNNING IN THE PORT 8000");
})
