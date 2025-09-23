import ProdutoEntity from "../produtos/produto.entity.js";

class ItemCarrinho extends ProdutoEntity{

    readonly quantidade: number;

    constructor(id:number, nome:string, preco:string, urlfoto:string, descricao:string, quantidade:number){

        super(id, nome, preco, urlfoto, descricao)
        this.quantidade = quantidade

    }
}

export default ItemCarrinho