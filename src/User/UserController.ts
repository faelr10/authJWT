import { Request, Response } from "express";
import { IUserController } from "./structure";
import bcrypt from 'bcrypt'
import { UserService } from "./UserService";

export class UserController implements IUserController {

    constructor(private userService: UserService) { }

    async register(req: Request, res: Response): Promise<void> {
        const { name, email, password, confirmPassword } = req.body
        if (name === undefined || name.length <= 2) {
            res.json({ message: 'Field name not null!' })
            return
        }
        else if (!email.includes("@")) {
            res.json({ message: 'Email inválido!' })
            return
        }
        else if (password !== confirmPassword) {
            res.json({ message: 'As senhas não conferem!' })
            return
        }
        const passwordHash = await bcrypt.hash(password, 8)
        const user = await this.userService.register({ name, email, passwordHash })
        res.json({ message: user })
    }

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body
        const result = await this.userService.login(email, password)
        res.json(result)
    }
}