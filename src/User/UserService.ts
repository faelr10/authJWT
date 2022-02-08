import { User } from "@prisma/client";
import { IUserService } from "./structure";
import { UserRepositoryMock } from "./UserRepositoryMock";

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

}