import 'dotenv/config'
import express, { Response, Request } from 'express';
import rotas from './rotas';

const app = express();
app.use(express.json())
app.use(rotas)


app.listen(8000,()=>{
    console.log("SERVER RUNNING IN THE PORT 8000");
})
