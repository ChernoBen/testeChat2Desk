
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv/config');
const secret = process.env.SECRET_API;

class UserController{

    async Create(req,res){
        
        let{name,email,password,birth} = req.body
        let result = await User.createUser(name,email,password,birth)
        .catch(error=>{

            console.log("falha na entrada do banco")
            return res.status(400).json({error:"Falha ao cadastrar Usuario"})

        })
        if (result.status == 0){

            return res.status(400).json({response:"Falha no cadastro",status:0})
        }
        return res.json({response:"Usuario cadastrado com sucesso",status:1})
        
    }

    async login(req,res){
       
        let {email,password} = req.body
        let user = await User.findByEmail(email)
        .catch(error=>{

            console.log("falha ao obter email")
            return res.status(400).json({message:"Email não encontrado"})
        })

        if (user != undefined){

            let result = await bcrypt.compare(password,user.password)

            if(result){

                let token = jwt.sign({email:user.email},secret)
                return res.json({token:token})

            }else{

                return res.status(406).json({error:"Senha incorreta"})
            }

        }else{

            return res.status(400).json({error:"Usuario não encontrado"})
        }
    }

    async list(req,res){

        let users = await User.findAll()
        .catch(error=>{

            console.log(error)
            return res.status(400).json({error:"Falha na listagem de usuários"})
        })

        return res.json({response:users})
    }

    async updateUser(req,res){

        let {id} = req.body
        let result = await User.update(id)
        .catch(error=>{

            console.log(error)
            return res.status(400).json({error:"Falha na alteração do email"})
        })

        if (result != undefined){

            return res.json({response:"Email altualizado com sucesso!"})

        }else{
            
            return res.status(400).json({error:"Falha na alteração do email"})
        }
    }

    async deleteUser(req,res){

        let {id} = req.body
        let result = await User.delete(id)
        .catch(error=>{
            console.log(error)
            return res.status(400).json({error:error})
        })

        return res.json({message:"Usuario deletado com sucesso!",response:result})
    }

    async recoverPassword(req,res){

        let email = req.body.email
        let result = await PasswordToken.create(email)
        if(result.status){

            console.log(result.token)
            return res.json({response:result.token})
            
        }else{
            return res.status(406).json({error:result.err})
        }
    }

    async alterPassword(req,res){

        let {token,password} = req.body
        let isValid = await PasswordToken.validate(token)
        
        if(isValid.status){
            await User.changePass(password,isValid.token.user_id,isValid.token.token)
            return res.json({message:"senha alterada com sucesso"})
        }else{
            return res.status(406).json({message:"Token invalido"})
        }
    }

}
module.exports = new UserController();
