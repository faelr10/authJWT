import { User } from "@prisma/client";
import { Request, Response } from "express";

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}

export interface IUserController{
    register(req:Request,res:Response):Promise<void>
    login(req:Request,res:Response):Promise<void>
}

export interface IUserService{
    register(data:ICreateUser):Promise<User|Error>
    login(email:string,passwordHash:string):Promise<object|Error>
}

export interface IUserRepository{
    register(data:ICreateUser):Promise<User|Error>
    getByUser(value:string,key?:string):Promise<object|any>
}