const prompt = require("prompt-sync")
const prom = prompt()

const bd = []
let id_inicial = 0

function novoUsuario(){
    id_inicial++
    let id = id_inicial
    let nome = prom("Nome: ")
    let email = prom("E-mail: ")
    let senha = prom("Senha: ")
    let dataCriacao = "2023"
    let ativo = true
    
    dados = {
        id,
        nome,
        email,
        senha,
        dataCriacao,
        ativo
    }

    bd.push(dados)

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


novoUsuario()
novoUsuario()
listarUsuario()
deletarUsuario()
listarUsuario()