
import { Request, Response } from "express"
import db from "../database/banco-mongo.js"
import itemCarrinho from "./itemCarrinho.js";
import ProdutoEntity from "../produtos/produto.entity.js";
import ItemCarrinho from "./itemCarrinho.js";
import { ObjectId } from "bson";


interface Carrinho {
    usuarioId: string;
    itens: itemCarrinho[];
    dataAtualizacao: Date;
    total:number;
}

interface ProdutoDTO {
    _id: ObjectId,
    nome:string,
    preco: string,
    urlfoto:string,
    descricao: string
}

class CarrinhoController{
    //adicionar Item
    //remover item
    //atualizar quantidade
    //listar
    //apagar

    async adicionarItem(req:Request, res:Response){

        const {produtoId, usuarioId, quantidadeItem} = req.body as {produtoId:string, usuarioId:Number, quantidadeItem:number};

        const resultado = await db.collection('carrinhos').find({usuarioId: usuarioId}).toArray();

        const produto:ProdutoDTO | null = await db.collection<ProdutoDTO>('produtos').findOne({_id:ObjectId.createFromHexString(produtoId)});

        if(!produto){
            return res.status(400).json({mensagem: "Item não encontrado"})
        }

        const itemCarrinho = new ItemCarrinho(produto._id.toString(), produto.nome, produto.preco, produto.urlfoto, produto.descricao);
        itemCarrinho.setQuantidade(quantidadeItem)
        
        
        if(resultado.length === 0){
            
            const carrinho = {
                usuarioId:usuarioId,
                itens: [itemCarrinho],
                dataAtulizacao: new Date(),
                total: Number(itemCarrinho.preco)*quantidadeItem
            }

            const re = await db.collection('carrinhos').insertOne(carrinho)
            return res.status(201).json({mensagem: "Carrinho criado com sucesso"})
        }else{

            //verificar se o item já está no carrinho
             const resultadoAtualizacao = await db.collection<Carrinho>('carrinhos').updateOne(
                {usuarioId: usuarioId}, 
                {

                    $push: {itens: itemCarrinho},
                    $set: {dataAtualizacao: new Date()},
                    $inc: {total: 1}
                }
            
            )

            res.status(201).json({...produto, _id: resultado, mensagem: "Item adcionado com sucesso"})  
        }
        

    }



    async listarItem(req:Request, res:Response){

        const {usuarioId} = req.body as {usuarioId:string}
        
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({usuarioId: usuarioId});
        

        res.status(200).json(carrinho?.itens);
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