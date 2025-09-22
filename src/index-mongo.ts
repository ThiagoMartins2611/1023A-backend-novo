import 'dotenv/config'
import express, { Response, Request } from 'express';

const app = express();
app.use(express.json())



app.listen(8000,()=>{
    console.log("SERVER RUNNING IN THE PORT 8000");
})
