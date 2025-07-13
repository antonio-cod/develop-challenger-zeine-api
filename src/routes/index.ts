import { Router } from "express"
import { usersRoutes } from "./users-routes"
import { sessionsRoutes } from "./sessions-routes"
import { productsRoutes } from "./products-routes"



const routes = Router()

routes.use("/users", usersRoutes)
routes.use("/products", productsRoutes)
routes.use("/sessions", sessionsRoutes)

export { routes }
