const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const User = require("./User");
const { result } = require("lodash");

class PasswordToken{

    async create(email){
        let user = await User.findByEmail(email)
        console.log(user)
        if(user != undefined){

            let token = Date.now()
            await knex.insert({
                user_id:user.id,
                used:0,
                token:token
            }).table("passwordToken").catch(error=>{
                console.log(error)
                return {status:false,err:"email não existe!"}
            })

            return {status:true,token:token}

        }else{

            return {status:false,err:"email não existe!"}
        }
    }

    async validate(token){

        let result = await knex.select()
        .where({token:token})
        .table("passwordToken").catch(error=>{
            console.log(error)
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

    
}

module.exports = new PasswordToken();