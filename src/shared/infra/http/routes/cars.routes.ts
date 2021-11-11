import { CreateCarController } from '@modules/cars/useCases/CreateCars/CreateCarController'
import {Router} from 'express'

const carRoutes = Router()

const createCarController = new CreateCarController()

carRoutes.post("/", createCarController.handle)

export {carRoutes}