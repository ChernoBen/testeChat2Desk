const PasswordToken = require("./PasswordToken");
const knex = require("../database/connection");
const bcrypt = require("bcrypt");

class User {

    async createUser(name, email, password, birth) {
        
        let hash = await bcrypt.hash(password, 10)
            .catch(error => {

                console.log("Falha em gerar hash")
            });

        console.log("-------->", hash)

        let result = await knex.insert({ name: name, email: email, password: hash, birth: birth })
            .table("users")
            .catch(error => {

                console.log("falha ao criar novo usuario")
                return { status: 0 }
            })
        console.log(`SAIDA DO BANCO: ${result}`, result)
        return { status: 1 }

    }

    async findByEmail(email) {
        console.log("-------->",email)
        let result = await knex.select()
            .from("users")
            .where({ email: email })
            
        if (result.length > 0) {

            console.log(result)
            return result[0]

        } else {

            return undefined
        }
    }

    async findAll() {

        let result = await knex.select(["id", "name", "email"])
            .from("users")
            .catch(error => {

                console.log(erro)
            })

        return result

    }

    async update(id) {

        let result = await knex.update({ email: email })
            .where({ id: id })
            .table("users")
            .catch(error => {

                console.log(error)
                return undefined
            })

        return result
    }

    async delete(id){

        let result = await knex.delete()
        .from("users")
        .where({id:id})
        .catch(error=>{

            console.log(error)
            return undefined
        })

        return {status:1,response:result}
    }

    async changePass(pass,id,token){

        let hash = await bcrypt.hash(pass,10)
        await knex.update({password:hash})
        .where({id:id})
        .table("users")
        await PasswordToken.setUsed(token)
    }
}
module.exports = new User();