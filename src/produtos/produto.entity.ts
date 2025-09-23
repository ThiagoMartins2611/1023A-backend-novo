//id
//nome
//preco
//urlfoto
//descricao

class ProdutoEntity{

    readonly id:number
    readonly nome:string
    readonly preco:string
    readonly urlfoto:string
    readonly descricao:string

    constructor(id:number, nome:string, preco:string, urlfoto:string,descricao:string){
        this.id = id
        this.nome = nome
        this.preco = preco
        this.urlfoto = urlfoto
        this.descricao = descricao
    }

}

export default ProdutoEntity