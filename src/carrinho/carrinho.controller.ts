
import { Request, Response } from "express"
import db from "../database/banco-mongo.js"
import itemCarrinho from "./itemCarrinho.js";
import ProdutoEntity from "../produtos/produto.entity.js";
import ItemCarrinho from "./itemCarrinho.js";
import { ObjectId } from "bson";
import UsuarioEntity from "../usuarios/usuario.entity.js";


interface Carrinho {
    usuarioId: string;
    itens: itemCarrinho[];
    dataAtualizacao: Date;
    total:number;
}

interface ProdutoDTO {
    _id: ObjectId,
    nome:string,
    preco: number,
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
            return res.status(400).json({mensagem: "Produto não encontrado"})
        }

        const itemCarrinho = new ItemCarrinho(produto._id.toString(), produto.nome, produto.preco, produto.urlfoto, produto.descricao);
        itemCarrinho.quantidade = quantidadeItem;
        
        
        if(resultado.length === 0){
            
            const carrinho = {
                usuarioId:usuarioId,
                itens: [itemCarrinho],
                dataAtulizacao: new Date(),
                total: itemCarrinho.preco*quantidadeItem
            }

            const re = await db.collection('carrinhos').insertOne(carrinho)
            return res.status(201).json({mensagem: "Carrinho criado com sucesso"})
        } 
        
        else{

            //verificar se o item já está no carrinho
            let CarrinhoJáContemoProduto = false;

            (resultado[0]!.itens).forEach((element:ProdutoDTO) => {
                if(element._id.toString() == itemCarrinho._id){
                    CarrinhoJáContemoProduto = true;
                }
            }); 

            if (CarrinhoJáContemoProduto) return res.status(201).json({mensagem: "Este item já está no carrinho"});

            

             const resultadoAtualizacao = await db.collection<Carrinho>('carrinhos').updateOne(
                {usuarioId: usuarioId}, 
                {

                    $push: {itens: itemCarrinho},
                    $set: {dataAtualizacao: new Date()},
                    $inc: {total: (itemCarrinho.preco*quantidadeItem)}
                }
            
            )

            return res.status(201).json({...produto, _id: resultado[0]?._id, mensagem: "Item adcionado com sucesso"})  
        }
    }


    async listarItem(req:Request, res:Response){
        const {usuarioId} = req.body as {usuarioId:string}
        const carrinho = await db.collection<Carrinho>('carrinhos').findOne({usuarioId: usuarioId});
        

        res.status(200).json(carrinho?.itens);
    }


    async removerItem(req:Request, res:Response){

        const {produtoId, usuarioId} = req.body as {produtoId: string, usuarioId: string};

        const carrinhoA = await db.collection<Carrinho>('carrinhos').findOne({usuarioId:usuarioId});
        
        const itemCarrinho = carrinhoA?.itens.find(item => item._id === produtoId) as itemCarrinho;

        const carrinho = await db.collection<Carrinho>('carrinhos').updateOne(
            {usuarioId: usuarioId},
            {
                $pull: {
                    itens: {_id: produtoId}
                },

                $set: {
                    dataAtualizacao: new Date()
                },

                $inc: {
                    total: -itemCarrinho.preco*itemCarrinho.quantidade
                }
                
            }
        );

        if(carrinho.modifiedCount){
            return res.status(200).json({mensagem: "Item excluido do carrinho com sucesso"});
        }else{
            return res.status(401).json({mensagem: "Item ou carrinho não encontrado"})
        }
 
    }

    async atualizarQuantidade(req:Request, res:Response){
        
        const {produtoId, usuarioId, quantidade} = req.body as {produtoId: string, usuarioId: string, quantidade: number};
        
        const carrinhoA = await db.collection<Carrinho>('carrinhos').findOne({usuarioId:usuarioId});
        if(!carrinhoA){
            return res.status(401).send({mensagem: "Carrinho não foi encontrado"})
        }
        
        const itemCarrinho = carrinhoA?.itens.find(item => item._id === produtoId) as itemCarrinho;
        if(!itemCarrinho) return res.status(201).send({mensagem: "Item dentro do carrinho não encontrado"})
        
        const quantidadeAntiga = itemCarrinho.quantidade

        if(itemCarrinho.quantidade + quantidade < 0){
            return res.status(401).send({mensagem: "Não pode haver quantidade negativa"})
        }

    

  
        const valorIncTotal = itemCarrinho.preco * quantidade
        const ObjectIdProduto = ObjectId.createFromHexString(produtoId)


        
        const carrinho = await db.collection<Carrinho>('carrinhos').updateOne(
            {usuarioId: usuarioId, "itens._id": produtoId},
            {
                
                $set: {
                    dataAtualizacao: new Date(),
                    "itens.$.quantidade": quantidade
                },

                $inc: {
                    total: (-quantidadeAntiga*itemCarrinho.preco)+valorIncTotal 
                },
            }
        );

        if(carrinho.modifiedCount){
            return res.status(200).json({mensagem: "Quantidade Atualizada"});
        }else{
            return res.status(401).json({mensagem: "Item ou carrinho não encontrado", erro: carrinho.modifiedCount})
        }
 

    }


    async apagarCarrinho(req:Request, res:Response){
        const {usuarioId} = req.body as {usuarioId: string}

        const resul = await db.collection("carrinhos").deleteOne({usuarioId: usuarioId});

        if(!resul.acknowledged){
            return res.status(401).send({mensagem: "Carrinho falhou em ser apagado"})
        }

        return res.status(200).send({mensagem: "carrinho apagado com sucesso!"})
    }



}

export default new CarrinhoController()