import { Request, Response } from "express"
import db from "../database/banco-mongo.js"
import ProdutoEntity from "./produto.entity.js";
import {ObjectId} from "bson";

//id
//nome
//preco
//urlfoto
//descricao

class ProdutoController{
    
    async adicionar(req:Request, res:Response){

        const {_id, nome, preco, urlfoto, descricao} = req.body as {_id:string, nome:string, preco:string, urlfoto:string, descricao:string};

        const produto = new ProdutoEntity(_id, nome, preco, urlfoto, descricao)

        const produtoDTO = {_id:ObjectId.createFromHexString(produto._id),nome:produto.nome,preco:produto.preco,urlfoto:produto.urlfoto,descricao:produto.descricao}
        
        const resultado = await db.collection('produtos').insertOne(produtoDTO)

        res.status(201).json({...produto, _id: resultado.insertedId})  
    }

    async listar(req:Request, res:Response){

        const produtos = await db.collection('produtos').find().toArray();
        res.status(200).json(produtos);
    }

}

export default new ProdutoController()