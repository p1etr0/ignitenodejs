import { CreateCarController } from '@modules/cars/useCases/CreateCars/CreateCarController'
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import {Router} from 'express'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carRoutes.get("/available", listAvailableCarsController.handle)

export {carRoutes}