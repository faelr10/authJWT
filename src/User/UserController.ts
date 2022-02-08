import { Request, Response } from "express";
import { IUserController } from "./structure";
import bcrypt from 'bcrypt'

export class UserController implements IUserController{

    async register(req:Request,res:Response):Promise<void>{
        
        const{name,email,password,confirmPassword} = req.body

        if(name===undefined || name.length <= 2){
            res.json({message:'Field name not null!'})
        }
        else if(!email.includes("@")){
            res.json({message:'Email inválido!'})
        }
        else if(password!==confirmPassword){
            res.json({message:'As senhas não conferem!'})
        }
        else{
             const passwordHash = await bcrypt.hash(password,8)


            
            res.json({message:'ok'})
        }

    }

}