import ProdutoEntity from "../produtos/produto.entity.js";

class ItemCarrinho extends ProdutoEntity{

    private quantidade: number;

    constructor(_id:string, nome:string, preco:string, urlfoto:string, descricao:string){

        super(_id, nome, preco, urlfoto, descricao)
        this.quantidade = 0;

    }

    setQuantidade(quant:number){
        this.quantidade = quant;
    }
}

export default ItemCarrinho