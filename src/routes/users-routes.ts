import { Router } from "express"

import { UsersController } from "@/controllers/users-controller"
import { productsRoutes } from "./products-routes"

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
productsRoutes.post("/", usersController.create)

export { usersRoutes }
