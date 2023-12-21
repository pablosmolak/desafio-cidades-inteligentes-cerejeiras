import bcrypt from "bcryptjs"

const bd = []

class Usuario {
    id
    nome
    email
    senha
    permicoes
    dataCriacao
    ultimoLogin
    ativo

    constructor(id, nome, email, senha, permicoes, dataCriacao, ultimoLogin, ativo){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        this.permicoes = permicoes
        this.dataCriacao = dataCriacao
        this.ultimoLogin = ultimoLogin
        this.ativo = ativo
    }

}

function newId(){
    
    if(bd.length === 0){
        return 1
    }

    return bd[bd.length -1].id +1
}

function novoUsuario(nome, email, senha, permicoes, ativo){
    const erros = []

    if(!nome || !email || !senha || !permicoes || !ativo){
        erros.push("Todos os dados são obrigatórios")
    }

   
    validarEmail(email,erros)

    senha = validarSenha(senha, erros)

    if(erros.length > 0){
        return console.log(erros)
    }

    let user = new Usuario(newId(),nome,email,senha, permicoes, new Date(), null, ativo)

    bd.push(user)
}

function validarEmail(email, erros){

    const valida = email.split('@')
    
    if(valida.length < 2 || valida.length > 2) return erros.push(`O E-mail "${email}" é invalido!`)
    
    if(!valida[1].includes('.') || valida[1].includes("..")){ 
        return erros.push(`O E-mail "${email}" é invalido!`)
    }

    if(valida[0][0] === '.' || valida[0][valida[0].length -1] === '.' ||
       valida[1][0] === '.' || valida[1][valida[1].length -1] === '.'){
        
        erros.push(`O E-mail "${email}" é invalido!`)
    }



    if(bd.some((user) => user.email === email)){
        return erros.push(`O e-mail ${email} já cadastrado no sistema!`)
    }
}
function validarSenha(senha, erros){
    const maisculas = /[A-Z]/
    const minusculas = /[a-z]/
    const numeros = /[0-9]/
    const especial = /[!|@|#|$|%|^&|*|(|)|_|-|=|+|:|;]/

    senha = String(senha)

    if(senha.length < 8){
        erros.push("a senha deve conter no minimo 8 caracteres")
    }

    if(!maisculas.test(senha)){
        erros.push("A senha precisa conter ao menos 1 letra maiúscula!")
    }

    if(!minusculas.test(senha)) {
        erros.push("A senha precisa conter ao menos 1 letra minúscula!")
    }

    if(!numeros.test(senha)){
        erros.push("A senha precisa conter ao menos 1 número!")
    }

    if(!especial.test(senha)){
        erros.push("A senha deve conter ao menos 1 caractere especial!")
    }

    if (erros.length === 0) return bcrypt.hashSync(senha,8)

}

function alterarUsuario(id,nome, email, senha, permicoes, ativo){
    const erros = []
    let alteraUsuario = []
    let user = bd.find(user => user.id === id)
   
    if(nome){
       user.nome = nome
    }

    if(email && email !== user.email){
        validarEmail(email,erros)
        user.email = email
    }

    if(senha){
        alteraUsuario.senha = validarSenha(senha, erros)
    }

    if(permicoes){
        alteraUsuario.permicoes = permicoes
    }

    if(ativo){
        alteraUsuario.ativo = ativo
    }

    if(erros.length > 0) return console.log(erros)


}

function deletarUsuario(id){

    for (let i = 0; i < bd.length; i++) {
        
        if(bd[i].id == id){
            bd.splice(i,1)
            break
        }
        
    }

}

function login(email, senha){
    let user = bd.find(user => user.email === email)
    console.log(user)
    if(!user || !bcrypt.compare(senha,user.senha)){
        return console.log("Usuario ou senha incorretos")
    }

    if(!user.ativo){
       return console.log("ususario inativo chapa")
    }

    console.log(`${user.nome} super logado`)
                
}


function listarUsuario(){
    console.log(bd)
}


novoUsuario("livia", "pablosmolak3@gmail.com", "Aa@147852", "cleito", true)
novoUsuario("pablo", "pablosmolak1@gmail.com", "Aa@147852", "cleito", false)

login("pablosmolak3@gmail.com", "Aa@147852")
login("pablosmolak1@gmail.com", "Aa@1478d52")
alterarUsuario(1, "livia", "", "", "","")
