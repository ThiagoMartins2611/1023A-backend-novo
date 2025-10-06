import ProdutoEntity from "../produtos/produto.entity.js";

class ItemCarrinho extends ProdutoEntity{

    public quantidade: number;

    constructor(_id:string, nome:string, preco:string, urlfoto:string, descricao:string){

        super(_id, nome, preco, urlfoto, descricao)
        this.quantidade = 0;

    }

}

export default ItemCarrinho