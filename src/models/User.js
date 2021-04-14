const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {

    async createUser(name,email,password,birth){
        console.log("#################################")
        let hash = await bcrypt.hash(password,10)
        .catch(error=>{
            console.log("Falha em gerar hash")
        });
        console.log("-------->",hash)

        let result = await knex.insert({name:name,email:email,password:hash,birth:birth})
        .table("users")
        .catch(error=>{
            console.log("falha ao criar novo usuario")
            return {status:0}
        })
        console.log(`SAIDA DO BANCO: ${result}`,result)
        return {status:1}

    }

    async findByEmail(email){
        let result = await knex.select(["id","email","password","name"])
        .from("users")
        .where({email:email})
        .catch(error=>{
            console.log("Falha em obter dados a partir do email")
            return undefined
        })
        
        if(result.length > 0 ){
            console.log(result)
            return result[0]
        }else{
            return undefined
        }
    }
}
module.exports = new User();