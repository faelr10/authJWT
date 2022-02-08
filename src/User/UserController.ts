import { Request, Response } from "express";
import { IUserController } from "./structure";
import bcrypt from 'bcrypt'
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { UserService } from "./UserService";
import { UserRepositoryMock } from "./UserRepositoryMock";

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

    async login(req: Request, res: Response): Promise<void> {
        const {email,password} = req.body
        

        const userRepositoryMock = new UserRepositoryMock()
        const userService = new UserService(userRepositoryMock)

        const result = await userService.login(email,password)

        res.json(result)

    }

}