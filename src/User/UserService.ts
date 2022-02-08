import { User } from "@prisma/client";
import { IUserService } from "./structure";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { UserRepository } from "./UserRepository";

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}

export class UserService implements IUserService {

    constructor(private userRepository: UserRepository) { }

    async register(data: ICreateUser): Promise<User | any> {
        const verifiedEmail = await this.userRepository.getByUser(data.email, 'email')
        if (verifiedEmail) {
            return { message: 'Email already exist!' }
        }
        const user = await this.userRepository.register(data)
        return user
    }

    async login(email: string, password: string): Promise<object | Error> {

        const getUser = await this.userRepository.getByUser(email, 'email')
        if (!getUser) {
            return { message: 'Email inválido!' }
        }
        const checkPassword = await bcrypt.compare(password, getUser.passwordHash)
        if (!checkPassword) {
            return { message: 'Senha inválida!' }
        }
        const secret = 'secret'
        const token = jwt.sign({
            id: getUser.id,
            name: getUser.name
        },
            secret
        )
        return { token: token }
    }
}