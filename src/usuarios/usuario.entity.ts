
class UsuarioEntity{

    readonly nome:string
    readonly idade:number
    readonly email: string
    readonly senha: string
    readonly salts: number
 

    constructor(nome:string, idade:number, email:string, senha:string, salts:number){
        this.nome = nome
        this.idade = idade
        this.email = email
        this.senha = senha
        this.salts = salts
    }

}

export default UsuarioEntity