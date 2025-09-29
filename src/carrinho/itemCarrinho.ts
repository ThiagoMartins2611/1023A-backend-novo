import ProdutoEntity from "../produtos/produto.entity.js";

class ItemCarrinho extends ProdutoEntity{

    readonly quantidade: number;

    constructor(_id:number, nome:string, preco:string, urlfoto:string, descricao:string, quantidade:number){

        super(_id, nome, preco, urlfoto, descricao)
        this.quantidade = quantidade

    }
}

export default ItemCarrinho