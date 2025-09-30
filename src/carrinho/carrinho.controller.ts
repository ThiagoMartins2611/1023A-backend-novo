
import { Request, Response } from "express"
import db from "../database/banco-mongo.js"
import itemCarrinho from "./itemCarrinho.js";
import ProdutoEntity from "../produtos/produto.entity.js";
import ItemCarrinho from "./itemCarrinho.js";


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

        const {produtoId, usuarioId, quantidadeItem} = req.body as {produtoId:number, usuarioId:Number, quantidadeItem:number};

        const resultado = await db.collection('carrinhos').find({usuarioId: usuarioId}).toArray();
        const item:ProdutoEntity|null = await db.collection<ProdutoEntity>('produtos').findOne({_id: produtoId});

        if(!item){
            return res.status(400).json({mensagem: "Item não encontrado"})
        }

        const itemCarrinho = new ItemCarrinho(item._id, item.nome, item.preco, item.urlfoto, item.descricao);
        itemCarrinho.setQuantidade(quantidadeItem)
        
        
        if(resultado.length === 0){
            
            const carrinho = {
                usuarioId:usuarioId,
                itens: [item],
                dataAtulizacao: new Date(),
                total: 1
            }

            const re = await db.collection('carrinhos').insertOne(carrinho)
            return res.status(201).json({mensagem: "Carrinho criado com sucesso"})
        }else{

             const resultadoAtualizacao = await db.collection<Carrinho>('carrinhos').updateOne(
                {usuarioId: usuarioId}, 
                {

                    $push: {itens: itemCarrinho},
                    $set: {dataAtualizacao: new Date()},
                    $inc: {total: 1}
                }
            
            )

            res.status(201).json({...item, _id: resultado, mensagem: "Item adcionado com sucesso"})  
        }
        

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