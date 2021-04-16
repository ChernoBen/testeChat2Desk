const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const User = require("./User");


class PasswordToken{

    async create(email){
        
        let user = await knex.select(["id","name","email"]).from("users").where({email:email})   

        if(user[0]!= undefined){

            let token = Date.now()
            await knex.insert({
                user_id:user[0].id,
                used:0,
                token:token
            }).table("passwordToken")

            return {status:true,token:token}

        }else{

            return {status:false,err:"email não existe!"}
        }
    }

    async validate(token){

        let result = await knex.select().where({token:token}).table("passwordToken").catch(error=>{
            return false
        })

        if(result.length>0){

            let tk = result[0]
            if(tk.used){

                return false

            }else{
                return {status:true,token:tk}
            }

        }else{

            return false
        }

    }

    async setUsed(token){
        await knex.update({used:1}).where({token:token}).table("passwordToken")
    }
}

module.exports = new PasswordToken();