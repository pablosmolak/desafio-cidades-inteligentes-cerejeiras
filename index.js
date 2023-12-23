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

export function novoUsuario(nome, email, senha, permissoes, ativo){
    try{
        const erros = []
    
        if(!nome || !email || !senha || !permissoes || ativo === undefined){
            return console.log("Todos os dados são obrigatórios")
        }

        if(nome.length < 3){
            erros.push("O nome precisa ter no mínimo 3 caracteres!")
        }
        
        if(!Array.isArray(permissoes)){ //verifica se as permissoes informadas são as esperadas pelo sistema
            erros.push("A permissão deve ser uma lista!")
        }else if(!permissoes.some((permissao) => permissao === "ESCRITA") && !permissoes.some((permissao) => permissao === "EDICAO") &&
                 !permissoes.some((permissao) => permissao === "EXCLUSAO") && !permissoes.some((permissao) => permissao === "VISUALIZACAO")){
            erros.push("A permissão deve receber: ESCRITA, EDICAO, EXCLUSAO ou VISUALIZACAO!")
        }

        validarEmail(email,erros) //verifica se o e-mail é valido
        
        senha = validarSenha(senha, erros) //verifica se a senha é valida e retorna o hash

        if(typeof ativo !== "boolean"){
            erros.push("O campo ativo deve ser do tipo booleano!")
        }
        
        if(erros.length > 0){
            return console.log(erros)
        }
        
        let user = new Usuario(newId(),nome,email,senha, permissoes, new Date(), null, ativo)
        
        bd.push(user)

        return console.log(`Usuário ${user.nome} criado com sucesso!`)

    }catch(err){
        return console.log(err.message)
    }
}

export function alterarUsuario(id,nome, email, senha, permissoes, ativo){
    try{

        if(!verificaPermissao("EDICAO")){
            return console.log("Usuário sem permissão para editar um cadastro!")
        }

        if(!nome && !email && !senha && !permissoes && ativo === undefined){ //verifica se algum dado foi passado
            return console.log("Você deve informar algum dado para que seja alterado!")
        }

        const erros = []

        let user = buscarUsuarioId(id)
        
        if(!user){
            return console.log("Usuário não encontrado!") //verifica se usuário informado existe
        }

        if(nome && nome.length < 3){
            erros.push("O nome precisa ter no mínimo 3 caracteres!")
        }
        
        if(email && email !== user.email){
            validarEmail(email,erros) //verifica se o e-mail é valido
        }
        
        if(senha){
            senha = validarSenha(senha, erros) //verifica se a senha é valida e retorna o hash
        }
        
        
        if(permissoes && !Array.isArray(permissoes)){ //verifica se as permissoes informadas são as esperadas pelo sistema
            erros.push("A permissão deve ser uma lista!")
        }else if(permissoes && !permissoes.some((permissao) => permissao === "ESCRITA") && !permissoes.some((permissao) => permissao === "EDICAO") &&
                    !permissoes.some((permissao) => permissao === "EXCLUSAO") && !permissoes.some((permissao) => permissao === "VISUALIZACAO")){  
            erros.push("A permissão deve receber: ESCRITA, EDICAO, EXCLUSAO ou VISUALIZACAO!")
        }
      
        
        if(ativo !== undefined && typeof ativo !== "boolean"){
            erros.push("O campo ativo deve ser do tipo booleano!")
        }
        
        if(erros.length > 0) return console.log(erros)
        
        if (nome) user.nome = nome
        if (email) user.email = email
        if (senha) user.senha = senha
        if (permissoes) user.permicoes = permissoes
        if (typeof ativo === "boolean") user.ativo = ativo

        return console.log(`Usuário ${user.nome} atualizado com sucesso!`)
          
    }catch(err){
        console.log(err.message)
    }  
}

export function deletarUsuario(id){
    try{
        if(!verificaPermissao("EXCLUSAO")){ //verifica se usuario tem permissao para excluir
            return console.log("Usuário sem permissão para excluir um cadastro!")
        }
        
        const user = buscarUsuarioId(id) //busca o usuario que vai ser deletado
        
        if(!user){ //verifica se o usuário a ser deletado existe
            return console.log("Usuário não encontrado!")
        }
       
        bd.splice(bd.indexOf(user),1) //deleta o usuário
        
        return console.log(`Usuário ${user.nome} deletado com sucesso!`)

    }catch(err){
        return console.log(err.message)
    }
}

export function listarUsuario(){
    try{
        if(!verificaPermissao("VISUALIZACAO")){ //verifica se usuario tem permissao para visualizar
            return console.log("Usuário sem permissão para visualizar cadastros!")
        }
        return console.log(bd)

    }catch(err){
        return console.log(err.message)
    }
}

export function login(email, senha){
    try{
        if(usuariologado !== null){
            return console.log("Já existe um usuário Logado!") //verifica se existe um usuário logado
        }
        
        if(!email || !senha){ //verifica se foi passado todos os valores para efetuar login
            return console.log("Você precisa informar e-mail e senha para logar no sistema!")
        }

        const user = bd.find(user => user.email === email)
    
        if(!user || !bcrypt.compare(senha,user.senha)){ //verifica se email e senha são validos
            return console.log("Usuário ou senha incorretos!")
        }
        
        if(!user.ativo){ //verifica se o usuário não está inativo
            return console.log("Usuário inativo!")
        }
        
        user.ultimoLogin = new Date()
        usuariologado = user
        return console.log(`Usuário ${usuariologado.nome} logado com sucesso!`) 

    }catch(err){
        return console.log(err.message)
    }
}

export function logout(){
    try{
        if(!usuariologado){
            return console.log("Nenhum usuário Logado!") //verifica se existe um usuario logado
        }
        const nome = usuariologado.nome
        usuariologado = null
        return console.log(`Usuário ${nome} deslogado com sucesso!`)
        
    }catch(err){
        return console.log(err.message)
    }
}

export function buscarUsuarioId(id){ 
    try{
        return bd.find(user => user.id === id) //verifica se existe usuário com o id informado

    }catch(err){
        return console.log(err.message)
    }
}

function newId(){ // cria um novo ID
    try{
        if(bd.length === 0){ //verifica se é o primeiro registro do sistema
            return 1
        }
    
        return bd[bd.length -1].id +1

    }catch(err){
        return console.log(err.message)
    }
}

function verificaPermissao(permissao){ //verifica as permissões do usuário
    try{
        if(!usuariologado){
            return false
        }
    
        if(!usuariologado.permicoes.some((resp) => resp === permissao)){
            return false
        }
    
        return true
        
    }catch(err){
        return console.log(err.message)
    }
}
function validarEmail(email, erros){ //valida o email
    try{
        const valida = email.split('@') // separa o email em 2
    
        if(valida.length < 2 || valida.length > 2) { // se não tiver @ ou mais de 1 @ da erro
            return erros.push(`O E-mail "${email}" é inválido!`)
        }

        if(valida[0].includes(" ") || valida[1].includes(" ")){  // verifica se não tem espaços em brancos
            return erros.push(`O E-mail "${email}" é inválido!`)
        }
        
        if(!valida[1].includes('.') || valida[1].includes("..")){  // verifica regras de pontos na segunda parte do email
            return erros.push(`O E-mail "${email}" é inválido!`)
        }

        if(valida[0][0] === '.' || valida[0][valida[0].length -1] === '.' ||
            valida[1][0] === '.' || valida[1][valida[1].length -1] === '.'){ // verifica regras de pontos no email
            
            return erros.push(`O E-mail "${email}" é inválido!`)
        }

        if(bd.some((user) => user.email === email)){ //verifica se o email ja existe no sistema
            return erros.push(`O E-mail "${email}" já é cadastrado no sistema!`)
        }

    }catch(err){
        return console.log(err.message)
    }
}

function validarSenha(senha, erros){ //valida a senha
    try{
        const maisculas = /[A-Z]/
        const minusculas = /[a-z]/
        const numeros = /[0-9]/
        const especial = /[!|@|#|$|%|^&|*|(|)|_|-|=|+|:|;]/
    
        senha = String(senha)
    
        if(senha.length < 8){ 
            erros.push("A senha deve conter no mínimo 8 caracteres!")
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
        return console.log(err.message)
    }
}