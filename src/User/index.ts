import { Router } from "express";
import { UserController } from "./UserController";

export const userRoutes = Router()

const userController = new UserController()

userRoutes.post('/register',(req,res)=>userController.register(req,res))



