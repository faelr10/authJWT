import { User } from '@prisma/client';
import prisma from '../database/client';
import { IUserRepository } from "./structure";

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}

export class UserRepository implements IUserRepository {

    async register(data: ICreateUser): Promise<User | Error> {
        const user = await prisma.user.create({ data })
        return user
    }

    async getByUser(value: string, key?: string): Promise<object|any> {
        const result = await prisma.user.findUnique({where:{email:value}})
        return result
    }
}