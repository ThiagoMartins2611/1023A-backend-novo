import { Request, Response } from "express"
import db from "../database/banco-mongo.js"
import UsuarioEntity from "./usuario.entity.js";
import bcrypt from "bcrypt"
import { Collection } from "mongodb";

function gerarNumeroAleatorio(min:number, max:number) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class UsuarioController{

    async adicionar(req:Request, res:Response){

        const {nome, idade, email, senha} = req.body as {nome:string, idade:number, email:string, senha:string};
        
        if(!(nome || senha || idade || email)){
            return res.status(400).json({mensagem: "dados incompletos"})
        }

        const salts = gerarNumeroAleatorio(1,20)
        
        const senhaCriptografada = await bcrypt.hash(senha, salts);

        const usuario = new UsuarioEntity(nome, idade, email, senhaCriptografada, salts)

        const resultado = await db.collection('usuarios').insertOne(usuario)
        res.status(201).json({...usuario, _id: resultado.insertedId})
    }



    async listar(req:Request, res:Response){
        const usuarios = await db.collection('usuarios').find().toArray();
        res.status(200).json(usuarios);
    }



    async login(req:Request, res:Response){
        const {email, senha} = req.body as {email:string, senha:string}
        if(!(email || senha)) return res.status(400).send({mensagem: "Email e senha são obrigatorios"})

        const usuario = await db.collection("usurios").findOne({email})

        if(!usuario){
            return res.status(400).json({mensagem: "Usario ou senha errados"});
        }

    }

}

export default new UsuarioController()