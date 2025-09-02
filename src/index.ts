import 'dotenv/config'
import mysql from 'mysql2/promise'

import express, { Response, Request } from 'express';
const app = express();


app.get('/', async (req:Request, res:Response)=>{
    try {

        const connection = await mysql.createConnection({
            host: process.env.DBHOST?process.env.DBHOST:'error localhost',
            user: process.env.DBUSER?process.env.DBUSER:'error user',
            password: process.env.DBPASSWORD?process.env.DBPASSWORD:'',
            database: process.env.DBNAME?process.env.DBNAME:"error name",
            port: Number(process.env.DBPORT?process.env.DBPORT:"3306")
        })
        res.send("Conectado ao banco de dados com sucesso");

        await connection.end();
        
    } catch (error) {
        res.status(500).send("Erro ao conectar ao banco de dados: "+ error);
    }

});

app.get('/produtos', async (req:Request, res:Response)=>{

});

app.listen(8000,()=>{
    console.log("SERVER RUNNING IN THE PORT 8000, http://localhost:8000");
})

//CRIAR UMA ROTA GET PARA PRODUTOS QUE RETORNE A LISTA DE PRODUTOS DO BANCO DE DADOS
//O produto deve ter id, nome, preco, urlfoto, descricao
//deve se criar uma tabela no banco de dados AIVEN para armazenar os produtos
//A respsota deve ser uma array de produtos no formato JSON