import { User } from "@prisma/client";
import { IUserService } from "./structure";
import { UserRepositoryMock } from "./UserRepositoryMock";
import bcrypt from 'bcrypt'
import  jwt  from "jsonwebtoken";

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}

export class UserService implements IUserService{

    constructor(private userRepositoryMock:UserRepositoryMock){}

    async register(data: ICreateUser): Promise<User | any> {
        const verifiedEmail = await this.userRepositoryMock.getByUser(data.email,'email')

        if(verifiedEmail){
            return {message:'Email already exist!'}
        }else{
            const user = await this.userRepositoryMock.register(data)
            return user
        }
    }

    async login(email: string, password: string): Promise<object | Error> {
        
        const getUser = await this.userRepositoryMock.getByUser(email,'email')

        if(!getUser){
            return{message:'Email inválido!'}
        }

        const checkPassword = await bcrypt.compare(password,getUser.passwordHash)

        if(!checkPassword){
            return{message:'Senha inválida!'}
        }else{
            const secret = 'secret'
            const token = jwt.sign({
                id:getUser.id,
                name:getUser.name
            },
            secret
            )
            return {token:token}
        }
    }

}