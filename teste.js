import { novoUsuario } from "./index.js"
import { listarUsuario } from "./index.js"
import { deletarUsuario } from "./index.js"
import { alterarUsuario } from "./index.js"
import { login } from "./index.js"
import { logout } from "./index.js"
import { buscarUsuarioId } from "./index.js"


console.log("----------------------INICIANDO OS TESTES CENARIO DE SUCESSO---------------------\n")

console.log("------------------------DEVE CRIAR UM USUÁRIOS COM SUCESSO-----------------------\n")
novoUsuario("Pablo","pablo@gmail.com", "Aa@123456", ["ESCRITA", "EDICAO", "EXCLUSAO" ,"VISUALIZACAO"], true)
novoUsuario("Livia","livia@gmail.com", "Aa@123456", ["VISUALIZACAO"], true)
console.log("\n---------------------------------------------------------------------------------\n")

console.log("----------------------DEVE LOGAR EM UMA CONTA COM SUCESSO------------------------\n")
login("pablo@gmail.com", "Aa@123456")
console.log("\n---------------------------------------------------------------------------------\n")

console.log("----------------------DEVE LISTAR TODOS OS USUÁRIOS COM SUCESSO------------------\n")
listarUsuario()
console.log("\n---------------------------------------------------------------------------------\n")

console.log("-----------------------DEVE ALTERAR UM USUÁRIO COM SUCESSO-----------------------\n")
alterarUsuario(2, "Livia Alves")
console.log(buscarUsuarioId(2))
console.log("\n---------------------------------------------------------------------------------\n")

console.log("------------------------DEVE EXCLUIR UM USUÁRIO COM SUCESSO----------------------\n")
deletarUsuario(2)
console.log("\nlistando todos os usuários:")
listarUsuario()
console.log("\n---------------------------------------------------------------------------------\n")

console.log("---------------------DEVE DESLOGAR EM UMA CONTA COM SUCESSO----------------------\n")
logout()
console.log("\n---------------------------------------------------------------------------------\n")


console.log("-----------------------INICIANDO OS TESTES CENARIO DE ERRO-----------------------\n")

novoUsuario("Livia","livia@gmail.com", "Aa@123456", ["VISUALIZACAO"], true)
novoUsuario("Cleiton","cleiton@gmail.com", "Aa@123456", ["EDICAO"], true)
novoUsuario("Pedrin","pedrin@gmail.com", "Aa@123456", ["EDICAO"], false)

console.log("\n------------------DEVE RETORNAR ERROS AO TENTAR CRIAR UM USUÁRIO-----------------\n")
novoUsuario()
novoUsuario("Pablo", "teste", "{", "tudo", "false")
novoUsuario("Pablo", "livia@gmail.com", "Aa@12345", ["tudo"], false)
console.log("\n---------------------------------------------------------------------------------\n")

login("livia@gmail.com", "Aa@12345")

console.log("\n----------DEVE RETORNAR ERROS AO TENTAR EDITAR UM USUÁRIO SEM PERMISSÃO----------\n")
alterarUsuario(1,"","pablimgameplay@gmail.com")
console.log("\n---------------------------------------------------------------------------------\n")

logout()
login("pablo@gmail.com", "Aa@123456")

console.log("\n------------------DEVE RETORNAR ERROS AO TENTAR EDITAR UM USUÁRIO----------------\n")
alterarUsuario()    
alterarUsuario(42,"Pedro")
alterarUsuario(3,"Pedro", "teste")
alterarUsuario(3,"Pedro", "teste@gmail.com", "{")
alterarUsuario(3,"Pedro", "teste@gmail.com", "Aa@12345","teste")
alterarUsuario(3,"Pedro", "teste@gmail.com", "Aa@12345",["teste"])
alterarUsuario(3,"Pedro", "teste@gmail.com", "Aa@12345",["EXCLUSAO"], "true")
console.log("\n---------------------------------------------------------------------------------\n")

logout()
login("livia@gmail.com", "Aa@12345")

console.log("\n----------DEVE RETORNAR ERROS AO TENTAR EXCLUIR UM USUÁRIO SEM PERMISSÃO---------\n")
deletarUsuario(1)
console.log("\n---------------------------------------------------------------------------------\n")

logout()
login("pablo@gmail.com", "Aa@123456")

console.log("\n-----------------DEVE RETORNAR ERROS AO TENTAR EXCLUIR UM USUÁRIO----------------\n")
deletarUsuario()
console.log("\n---------------------------------------------------------------------------------\n")

logout()
login("cleiton@gmail.com", "Aa@12345")

console.log("\n----------DEVE RETORNAR ERROS AO TENTAR LISTAR UM USUÁRIO SEM PERMISSÃO----------\n")
listarUsuario()
console.log("\n---------------------------------------------------------------------------------\n")

logout()

console.log("\n------------------DEVE RETORNAR ERROS AO TENTAR LOGAR NO SISTEMA-----------------\n")
login()
login("pedrein@gmail.com", "Aa@12345")
login("pedrin@gmail.com", "Aa@12345")
console.log("\n---------------------------------------------------------------------------------\n")

login("cleiton@gmail.com", "Aa@12345")

console.log("\n----DEVE RETORNAR ERRO AO TENTAR LOGAR NO SISTEMA JA EXISTINDO ALGUEM LOGADO-----\n")
login("livia@gmail.com", "Aa@12345")
console.log("\n---------------------------------------------------------------------------------\n")

logout()

console.log("\n----------------DEVE RETORNAR ERROS AO TENTAR DESLOGAR DO SISTEMA----------------\n")
logout()
console.log("\n---------------------------------------------------------------------------------\n")
