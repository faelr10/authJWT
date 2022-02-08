import { User } from "@prisma/client";
import { IUserRepository } from "../../structure";

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
            name: "Teste",
            email: "teste@teste.com",
            passwordHash:'123456'
        }
    }

    async getByUser(value: string, key?: string): Promise<object | any> {
        
        const listUserMock = [{
            id: "123456",
            name: "Teste",
            email: "teste@teste.com",
            passwordHash:'$2a$12$MIq0iJ5MceieC7LAtJ3AzOnpvL03XXllNFIBztWTFwypBxXnzp.1q'
        }]

        const verifiedEmail = listUserMock.find(listUserMock => listUserMock.email === value)

        if(verifiedEmail){
            return{
                id: "123456",
                name: "Adriano",
                email: "rafael@rafael.com",
                passwordHash:'$2a$12$MIq0iJ5MceieC7LAtJ3AzOnpvL03XXllNFIBztWTFwypBxXnzp.1q'
            }
        }else{
            return false
        }

    }

}