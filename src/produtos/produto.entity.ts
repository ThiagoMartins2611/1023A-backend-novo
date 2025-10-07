//id
//nome
//preco
//urlfoto
//descricao


class ProdutoEntity{

    readonly _id:string
    readonly nome:string
    readonly preco:number
    readonly urlfoto:string
    readonly descricao:string

    constructor(_id:string, nome:string, preco:number, urlfoto:string,descricao:string){
        this._id = _id
        this.nome = nome
        this.preco = preco
        this.urlfoto = urlfoto
        this.descricao = descricao
    }

}

export default ProdutoEntity