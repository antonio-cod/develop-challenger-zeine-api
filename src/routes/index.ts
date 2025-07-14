import { Router } from "express"
import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { productsRoutes } from "./products-routes"
import { categoriesRoutes } from "./categories-routes"
import { uploadsRoutes } from "./uploads-routes"



const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/products", productsRoutes)
routes.use("/categories", categoriesRoutes)
routes.use("/uploads", uploadsRoutes)
routes.use("/sessions", sessionsRoutes)

export { routes }
