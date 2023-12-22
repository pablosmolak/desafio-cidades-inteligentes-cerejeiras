import { novoUsuario } from "./index.js"
import { listarUsuario } from "./index.js"
import { deletarUsuario } from "./index.js"
import { alterarUsuario } from "./index.js"
import { login } from "./index.js"
import { logout } from "./index.js"



novoUsuario("Pablo","pablo@gmail.com", "Aa@123456", "muitas", true)
novoUsuario("Livia","pablo1@gmail.com", "Aa@123456", "muitas", true)
novoUsuario("Livia","pablo2@gmail.com", "Aa@123456", "muitas", false)



console.log("-----------criando os usuarios--------------")
listarUsuario()
console.log("-----------alterando o  usuario pelo id 2--------------")
alterarUsuario(2, "cleitin do grau")
listarUsuario()
login("pablo1@gmail.com", "Aa@123456")
logout()
login("pablo2@gmail.com", "Aa@123456")
logout()
console.log("-----------deletando o  usuario pelo id 2--------------")
deletarUsuario(2)
novoUsuario("Livia","pablo22@gmail.com", "Aa@123456", "muitas", false)
listarUsuario()
