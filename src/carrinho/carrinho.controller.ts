
import { Request, Response } from "express"
import db from "../database/banco-mongo.js"
import itemCarrinho from "./itemCarrinho.js";


interface Carrinho {
    usuarioId: string;
    itens: itemCarrinho[];
    dataAtualizacao: Date;
    total:number;
}

class CarrinhoController{
    //adicionar Item
    //remover item
    //atualizar quantidade
    //listar
    //apagar

    async adicionarItem(req:Request, res:Response){

        const {produtoId, usuarioId} = req.body;

        const resultado = await db.collection('carrinhos').find({usuarioId: usuarioId}).toArray();

        if(resultado.length == 0){

            const item = await db.collection('produtos').find({produtoId});
            
            

            const carrinho = {
                usuarioId:usuarioId,
                itens: [item],
                dataAtulizacao: Date.now(),
                total: 1
            }

            const res = await db.collection('carrinhos').insertOne(carrinho)
        }else{

        }
        

        //const resultado = await db.collection('carrinho').insertOne(item)
        //res.status(201).json({...item, _id: resultado.insertedId})  
    }

    async listarItem(req:Request, res:Response){
        
        const item = await db.collection('carrinhos').find().toArray();
        res.status(200).json(item);
    }


    async removerItem(req:Request, res:Response){

        const item = req.body;

        const resultado = await db.collection('carrinhos').insertOne(item)
 
    }

    async atualizarQuantidade(req:Request, res:Response){

    }


    async apagarCarrinho(req:Request, res:Response){

    }



}

export default new CarrinhoController()