import { Router } from "express";
import { userRoutes } from "./User";

const routes = Router()

routes.use('/',userRoutes)


export default routes ;