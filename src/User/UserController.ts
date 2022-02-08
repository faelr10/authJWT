import { Request, Response } from "express";

export class UserController{

    async register(req:Request,res:Response):Promise<void>{
        
        const{name,email,password,confirmPassword} = req.body
        
        if(!email.includes("@")){
            res.json({message:'Email inválido!'})
        }else if(password!==confirmPassword){
            res.json({message:'As senhas não conferem!'})
        }else{
            res.json({message:'ok'})
        }

        



    }

}