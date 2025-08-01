import { Router } from "express"

import { ProductsController } from "@/controllers/products-controller"

const productsRoutes = Router()
const productsController = new ProductsController()

productsRoutes.post("/", productsController.create)
productsRoutes.get("/search", productsController.index)

export { productsRoutes }
