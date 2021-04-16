
const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const validator = require('cpf-cnpj-validator');
const Email = require('email-validator');
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");
require('dotenv/config');
const secret = process.env.SECRET_API;

class UserController{


    async validate(req,res){
        
        return res.json({status:true})
    }

    async Create(req,res){
        
        let{name,email,password,birth,documento} = req.body
        console.log(name,email,password,birth,documento)

        if (!email || !documento || !password || !name) return res.status(400).json({ message: "Informe dados para cadastro" })
        if (!name) return res.status(400).json({ message: "Informe o Nome para cadastrar usuario" });
        if (email && !Email.validate(email)) return res.status(400).json({ message: "Informe um e-mail válido!" })
        if (birth) birth = birth.split('/').reverse().join('-');
        if(password.length < 6) return res.status(400).json({message:" Senha possui menos que seis caracteres!"})
        
        if ((!documento.length == 11 || !validator.cpf.isValid(documento)) && (!documento.length == 14 || !validator.cnpj.isValid(documento))) {
            if (documento.length == 11) {
                return res.status(400).json({ message: "CPF inválido" })
            } else {
                return res.status(400).json({ message: "CNPJ inválido" })
            }
        }

        let result = await User.createUser(name,email,password,birth,documento)
        .catch(error=>{
            return res.status(400).json({message:"Verifique os dados no formulário"})
        })

        if(result==true){
            return res.json({message:"Usuario cadastrado com sucesso"})
        }else{
            return res.status(400).json({message:"Verifique os dados no formulário"})
        }
        
    }

    async login(req,res){
       
        let {email,password} = req.body
        let user = await User.findByEmail(email).catch(error=>{
            return res.status(400).json({message:"Email não encontrado"})
        })

        if (user != undefined){

            let result = await bcrypt.compare(password,user.password)

            if(result){

                let token = jwt.sign({email:user.email},secret)
                return res.json({token:token})

            }else{

                return res.status(406).json({message:"Senha incorreta"})
            }

        }else{

            return res.status(400).json({message:"Usuario não encontrado"})
        }
    }

   

    async recoverPassword(req,res){

        let {email} = req.body
        if (email && !Email.validate(email)) return res.status(400).json({ error: "Informe um e-mail válido!" })
        
        let result = await PasswordToken.create(email)

        if(result.status){

            console.log(result.token)

            let config = {
                host:"smtp.umbler.com",
                port:587,
                user:"benjamim@benfrancis.dev.br",
                pass:"Cadeira@10"
            }
            const transporter = nodemailer.createTransport({
                host:config.host,
                port:config.port,
                auth:{
                    user:config.user,
                    pass:config.pass
                },
    
            })
          
            await transporter.sendMail({
                text:`Token de recuperação de senha: ${result.token}`,
                subject:"Token de recuperação de senha",
                from:"benjamim@benfrancis.dev.br <benjamim@benfrancis.dev.br>",
                to:email
            }).then(response=>{
                console.log(response)
            }).catch(error=>{
                console.log(error)
            })
              
            
            return res.json({response:result.token})
            
        }else{

            return res.status(406).json({error:result.err})
        }
    }

    async alterPassword(req,res){

        let token = req.body.token
        let password = req.body.password
        console.log("A SENHA ----->",password)

        if(password.length < 6) return res.status(400).json({message:"* Senha possui menos que seis caracteres!"})
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
