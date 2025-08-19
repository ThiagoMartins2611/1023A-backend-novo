import 'dotenv/config'

import express, { type Response } from 'express';
const app = express();


app.get('/', (req:string, res:any)=>{
    res.send(process.env.DBUSER)
});

app.listen(8000,()=>{
    console.log("SERVER RUNNING IN THE PORT 8000, http://localhost:8000");
})


