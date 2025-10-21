//id
//nome
//preco
//urlfoto
//descricao

import { ObjectId } from "bson"


class ProdutoEntity{

    readonly _id:string
    readonly nome:string
    readonly preco:number
    readonly urlfoto:string
    readonly descricao:string

    constructor(nome:string, preco:number, urlfoto:string,descricao:string, _id?:string){
        if(!_id){
            _id = new ObjectId().toString()
        }
        this._id = _id
        this.nome = nome
        this.preco = preco
        this.urlfoto = urlfoto
        this.descricao = descricao
    }

}

export default ProdutoEntity