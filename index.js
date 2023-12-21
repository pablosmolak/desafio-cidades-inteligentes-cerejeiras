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

function novoUsuario(nome, email, senha, permicoes, ativo){
    const erros = []

    if(!nome || !email || !senha || !permicoes || !ativo){
        erros.push("Todos os dados são obrigatórios")
    }

    validarSenha(senha, erros)

    if(erros.length > 0){
        return console.log(erros)
    }

    let user = new Usuario(1,nome,email,senha, permicoes, new Date(), null, ativo)

    bd.push(user)
}

function validarSenha(senha, erros){
    
    senha = String(senha)

    if(senha.length < 8){
        erros.push("a senha deve conter no minimo 8 caracteres")
    }
}

function alterarUsuario(){
    let id_busca = prom("Informe o ID do Usuario que deseja atualizar: ")

    for (let i = 0; i < bd.length; i++) {
        
        if(bd[i].id == id_busca){
            console.log('cleito')
            
            let nome = prom("Nome: ")
            
            if(nome){

                bd[i].nome = nome
            }
            
            break
        } 
    }
}

function deletarUsuario(){
    let id_busca = prom("Informe o ID do Usuario que deseja deletar: ")

    for (let i = 0; i < bd.length; i++) {
        
        if(bd[i].id == id_busca){
            bd.splice(i,1)
            break
        }
        
    }

}

function login(){
    let email = prom('Email: ')
    
    for (let i = 0; i < bd.length; i++) {
        
        if(bd[i].id == id_busca){
            console.log('cleito')
            
            let nome = prom("Nome: ")
            
            if(nome){
                bd[i].nome = nome
            }
            
            break
        }
        
        
    }
}

function listarUsuario(){
    console.log(bd)
}


novoUsuario("pablo","wwwww","wwwwww", "www", true)
listarUsuario()
