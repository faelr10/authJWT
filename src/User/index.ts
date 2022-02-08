import { Router } from "express";
import { UserController } from "./UserController";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";

export const userRoutes = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoutes.post('/register',(req,res)=>userController.register(req,res))
userRoutes.post('/login',(req,res)=>userController.login(req,res))




