import { CategoryController } from "@/controllers/categories-controller"
import { Router } from "express"



const categoriesRoutes = Router()
const categoryController = new CategoryController()

categoriesRoutes.post("/", categoryController.create)

export { categoriesRoutes}
