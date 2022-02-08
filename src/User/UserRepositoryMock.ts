import { User } from "@prisma/client";
import { IUserRepository } from "./structure";

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}

export class UserRepositoryMock implements IUserRepository{

    async register(data: ICreateUser): Promise<User | Error> {
        return{
            id: "123456",
            name: "Adriano",
            email: "adriano@adriano",
            passwordHash:'123456'
        }
    }

    async getByUser(value: string, key?: string): Promise<User | boolean> {
        
        const listUserMock = [{
            id: "123456",
            name: "Adriano",
            email: "adriano@adriano",
            passwordHash:'123456'
        }]

        const verifiedEmail = listUserMock.find(listUserMock => listUserMock.email === value)

        if(verifiedEmail){
            return{
                id: "123456",
                name: "Adriano",
                email: "adriano@adriano",
                passwordHash:'123456'
            }
        }else{
            return false
        }

    }

}