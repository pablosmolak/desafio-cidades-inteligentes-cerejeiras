import bcrypt from "bcryptjs"

const bd = []
let usuariologado = null

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

export function novoUsuario(nome, email, senha, permicoes, ativo){
    const erros = []
    
    if(!nome || !email || !senha || !permicoes || ativo === undefined || typeof ativo !== "boolean"){
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

export function alterarUsuario(id,nome, email, senha, permicoes, ativo){
    try{
        const erros = []
        const alteraUsuario = []
        let user = buscarUsuarioId(id)
        
        if(!user){
            return console.log("Usuário não encontrado!")
        }

        if(nome){
            alteraUsuario.nome = nome
        }
        
        if(email && email !== user.email){
            validarEmail(email,erros)
            alteraUsuario.email = email
        }
        
        if(senha){
            alteraUsuario.senha = validarSenha(senha, erros)
        }
        
        if(permicoes){
            alteraUsuario.permicoes = permicoes
        }
        
        if(ativo !== undefined || typeof ativo === "boolean"){
            alteraUsuario.ativo = ativo
        }
        
        if(erros.length > 0) return console.log(erros)
        
        if (alteraUsuario.nome) user.nome = alteraUsuario.nome
        if (alteraUsuario.email){user.email = alteraUsuario.email}
        if (alteraUsuario.senha){user.senha = alteraUsuario.senha}
        if (alteraUsuario.permicoes){user.permicoes = alteraUsuario.permicoes}
        if (alteraUsuario.ativo){user.ativo = alteraUsuario.ativo}
          
    }catch(err){
        console.log(err.message)
    }  
}

export function deletarUsuario(id){
    const user = buscarUsuarioId(id)

    if(!user){
        return console.log("Usuário não encontrado!")
    }
   
    bd.splice(bd.indexOf(user),1)
    
    return console.log(`Usuário ${user.nome} deletado com sucesso!`)
}

export function login(email, senha){
    let user = bd.find(user => user.email === email)

    if(!user || !bcrypt.compare(senha,user.senha)){
        return console.log("Usuario ou senha incorretos")
    }
    
    if(!user.ativo){
        return console.log("Usuário inativo!")
    }
    
    user.ultimoLogin = new Date()
    usuariologado = user
    console.log(`Usuário ${usuariologado.nome} logado com sucesso!`)        
}

export function logout(){
    if(!usuariologado){
        return console.log("Nenhum usuário Logado!")
    }
    console.log(`Usuário ${usuariologado.nome} deslogado com sucesso!`)
    usuariologado = null
}

export function listarUsuario(){
    console.log(bd)
}

function buscarUsuarioId(id){
    return bd.find(user => user.id === id)
}

function newId(){ // cria um novo ID
    try{
        if(bd.length === 0){
            return 1
        }
    
        return bd[bd.length -1].id +1

    }catch(err){
        console.log(err.message)
    }
}

function validarEmail(email, erros){
    try{
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

    }catch(err){
        console.log(err.message)
    }
}

function validarSenha(senha, erros){
    try{
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

    }catch(err){
        console.log(err.message)
    }
}