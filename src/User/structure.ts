import { Request, Response } from "express";

interface ICreateUser {
    id?: string
    name: string
    email: string,
    passwordHash: string
}


export interface IUserController{
    register(req:Request,res:Response):Promise<void>
}

export interface iUserService{

}

export interface IUserRepository{

}