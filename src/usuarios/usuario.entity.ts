
class UsuarioEntity{

    readonly nome:string
    readonly idade:number
    readonly email: string
    readonly senha: string

 

    constructor(nome:string, idade:number, email:string, senha:string){
        this.nome = nome
        this.idade = idade
        this.email = email
        this.senha = senha
    }

}

export default UsuarioEntity